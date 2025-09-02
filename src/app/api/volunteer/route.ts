import { NextResponse } from "next/server";

// Simple in-memory rate limit (per process). For serverless, this resets on cold start.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10; // max submissions per IP per window
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getClientIp(req: Request) {
  // Best-effort IP extraction behind proxies
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xfClientIp = req.headers.get("x-client-ip");
  if (xfClientIp) return xfClientIp;
  // Node fetch doesn't expose remoteAddress; fall back to a stable key
  return "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

function sanitize(input: unknown, max = 1000): string {
  const s = typeof input === "string" ? input : "";
  return s.replace(/\u0000/g, "").slice(0, max).trim();
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }


  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Bot configuration missing" },
      { status: 500 }
    );
  }

  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests", retry_after: rl.retryAfter },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Extract and sanitize expected fields
  const program = sanitize(body.program, 120);
  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 160);
  const phone = sanitize(body.phone, 60);
  const company = sanitize(body.company, 160);
  const message = sanitize(body.message, 2000);
  const areas = Array.isArray(body.areas)
    ? body.areas.map((a: unknown) => sanitize(a, 80)).filter(Boolean)
    : [];
  const availability = Array.isArray(body.availability)
    ? body.availability.map((a: unknown) => sanitize(a, 80)).filter(Boolean)
    : [];

  // Basic validation aligned with client-side rules
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!phone) errors.phone = "Phone is required";
  if (!message) errors.message = "Message is required";
  if (areas.length === 0) errors.areas = "Select at least one area";
  if (availability.length === 0)
    errors.availability = "Select at least one availability";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
  }

  const textLines = [
    "📝 New Volunteer Submission",
    program ? `🎯 Program: ${program}` : undefined,
    "",
    `👤 Name: ${name}`,
    "",
    `📧 Email: ${email}`,
    "",
    `📞 Phone: ${phone}`,
    "",
    company ? `🏢 Company: ${company}` : undefined,
    company ? "" : undefined,
    areas.length ? `🧩 Areas: ${areas.join(", ")}` : undefined,
    areas.length ? "" : undefined,
    availability.length ? `🗓️ Availability: ${availability.join(", ")}` : undefined,
    availability.length ? "" : undefined,
    "💬 Message:",
    message,
  ].filter((v) => v !== undefined && v !== null) as string[];

  const payload = {
    chat_id: chatId,
    text: textLines.join("\n"),
    // parse_mode: "MarkdownV2", // keep plain text to avoid escaping hassles
    disable_web_page_preview: true,
  };

  try {
    const tg = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // No caching of sensitive requests
      cache: "no-store",
    });

    const data = await tg.json().catch(() => ({}));
    if (!tg.ok || !(data && data.ok)) {
      const description = (data && data.description) || `HTTP ${tg.status}`;
      return NextResponse.json(
        { success: false, message: "Failed to send message", error: description },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Error sending message" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // ensure this isn't statically optimized
