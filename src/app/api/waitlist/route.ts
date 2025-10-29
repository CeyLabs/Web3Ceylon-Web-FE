import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_PROFESSION_LENGTH = 80;
const TELEGRAM_TIMEOUT_MS = 10_000;
const SHEET_TIMEOUT_MS = 5_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_CACHE = 1_000;
const RESPONSE_HEADERS = { 'Cache-Control': 'no-store, no-cache, must-revalidate' };

type RateLimitEntry = {
  hits: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const sanitizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') {
    return '';
  }
  const normalized = value.trim().normalize('NFC').replace(/[\r\n\t]+/g, ' ');
  return normalized.slice(0, maxLength);
};

const sanitizeEmail = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toLowerCase();
};

const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [ip] = forwardedFor.split(',');
    if (ip) {
      return ip.trim();
    }
  }

  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  if (vercelForwardedFor) {
    const [ip] = vercelForwardedFor.split(',');
    if (ip) {
      return ip.trim();
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  const nextIp = (request as unknown as { ip?: string }).ip;
  if (nextIp) {
    return nextIp;
  }

  return 'unknown';
};

const isRateLimited = (ip: string, now: number) => {
  if (!ip) {
    return false;
  }

  const existing = rateLimitStore.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { hits: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.hits >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.hits += 1;
  return false;
};

const pruneRateLimitStore = (now: number) => {
  if (rateLimitStore.size < RATE_LIMIT_MAX_CACHE) {
    return;
  }
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const fullName = sanitizeText(body.fullName, MAX_NAME_LENGTH);
    const profession = sanitizeText(body.profession, MAX_PROFESSION_LENGTH);
    const email = sanitizeEmail(body.email);
    const consentToShareWithThirdParties = body.consentToShareWithThirdParties === true;

    const now = Date.now();
    const clientIp = getClientIp(request);
    pruneRateLimitStore(now);
    if (isRateLimited(clientIp, now)) {
      return NextResponse.json(
        { error: 'Too many submissions, please try again later.' },
        { status: 429, headers: RESPONSE_HEADERS }
      );
    }

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400, headers: RESPONSE_HEADERS }
      );
    }

    if (!consentToShareWithThirdParties) {
      return NextResponse.json(
        { error: 'You must consent to data sharing to join the waitlist' },
        { status: 400, headers: RESPONSE_HEADERS }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: RESPONSE_HEADERS }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers: RESPONSE_HEADERS }
      );
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const spreadsheetUrl = process.env.SPREADSHEET_URL; // Add this for the button
    const safeProfession = profession || 'Not specified';
    const message = [
      '🔔 New Waitlist Signup for Web3Ceylon 2026!',
      '',
      `👤 Name: ${fullName}`,
      `📧 Email: ${email}`,
      `🏢 Profession: ${safeProfession}`,
      '',
      `📅 Date: ${new Date().toISOString()}`
    ].join('\n');

    // Create inline keyboard with spreadsheet link button
    const replyMarkup = spreadsheetUrl ? {
      inline_keyboard: [[
        {
          text: 'View in Google Sheet',
          url: spreadsheetUrl
        }
      ]]
    } : undefined;

    const telegramPromise = fetchWithTimeout(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          reply_markup: replyMarkup,
        }),
      },
      TELEGRAM_TIMEOUT_MS
    );

    const sheetPromise = googleScriptUrl
      ? fetchWithTimeout(
          googleScriptUrl,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName,
              email,
              profession: safeProfession,
            }),
          },
          SHEET_TIMEOUT_MS
        )
      : Promise.resolve<Response | null>(null);

    const [telegramOutcome, sheetOutcome] = await Promise.allSettled([
      telegramPromise,
      sheetPromise,
    ] as const);

    if (telegramOutcome.status !== 'fulfilled' || !telegramOutcome.value.ok) {
      console.error('Failed to send Telegram message', {
        status:
          telegramOutcome.status === 'fulfilled'
            ? telegramOutcome.value.status
            : 'rejected',
      });
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500, headers: RESPONSE_HEADERS }
      );
    }

    if (sheetOutcome.status === 'rejected') {
      console.error('Google Sheets update error', sheetOutcome.reason);
    } else if (sheetOutcome.value && !sheetOutcome.value.ok) {
      console.error('Failed to update Google Sheet', {
        status: sheetOutcome.value.status,
      });
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist!' },
      { status: 200, headers: RESPONSE_HEADERS }
    );
  } catch (error) {
    console.error('Waitlist API error', error);

    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out');
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 408, headers: RESPONSE_HEADERS }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: RESPONSE_HEADERS }
    );
  }
}
