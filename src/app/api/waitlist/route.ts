import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim().normalize('NFC') : '';
    const emailRaw = typeof body.email === 'string' ? body.email.trim() : '';
    const email = emailRaw.toLowerCase();
    const profession = typeof body.profession === 'string' ? body.profession.trim().normalize('NFC') : '';
    const consentToShareWithThirdParties = Boolean(body.consentToShareWithThirdParties);

    // Validate input
    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      );
    }

    // Validate consent - REQUIRED before sharing PII with Telegram
    if (!consentToShareWithThirdParties) {
      return NextResponse.json(
        { error: 'You must consent to data sharing to join the waitlist' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }


    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

  // Prepare message for Telegram
  const message = `🔔 New Waitlist Signup for Web3Ceylon 2026!\n\n👤 Name: ${fullName}\n📧 Email: ${email}\n🏢 Profession: ${profession || 'Not specified'}\n\nDate: ${new Date().toLocaleString()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!telegramResponse.ok) {
      console.error('Failed to send Telegram message:', await telegramResponse.text());
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Telegram request timed out');
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}