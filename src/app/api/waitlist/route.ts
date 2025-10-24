import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, attendance } = await request.json();

    // Validate input
    if (!fullName || !email || !attendance) {
      return NextResponse.json(
        { error: 'Full name, email, and attendance status are required' },
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

    // Validate attendance
    const validAttendanceOptions = ["Yes", "No", "Haven't, but I'm interested!"];
    if (!validAttendanceOptions.includes(attendance)) {
      return NextResponse.json(
        { error: 'Invalid attendance option' },
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
    const message = `🔔 New Waitlist Signup for Web3Ceylon 2026!\n\n👤 Name: ${fullName}\n📧 Email: ${email}\n🎯 Attended 2025 Edition: ${attendance}\n\nDate: ${new Date().toLocaleString()}`;

    // Send to Telegram
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
          parse_mode: 'HTML',
        }),
      }
    );

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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}