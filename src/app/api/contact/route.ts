import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, website } = body;

    // Honeypot check — bots fill this hidden field
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, email, and message are required.' },
        { status: 400 },
      );
    }

    // ── Save to Supabase (if configured) ──
    const supabase = getSupabase();
    if (supabase) {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          first_name: firstName,
          last_name: lastName || '',
          email,
          phone: phone || '',
          subject: 'General Enquiry',
          message,
          status: 'new',
        });

      if (dbError) {
        console.error('Supabase contact save error:', dbError);
      }
    } else {
      console.error(
        'Supabase contact save skipped: missing environment variables',
      );
    }

    // ── Send email via Gmail (Nodemailer) ──
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        const fullName = [firstName, lastName].filter(Boolean).join(' ');

        await transporter.sendMail({
          from: `"TPH Website" <${gmailUser}>`,
          to: gmailUser,
          replyTo: email,
          subject: `[TPH Contact] New message from ${fullName}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fafafa; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
              <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 28px 32px;">
                <h2 style="margin: 0; color: #c7a760; font-size: 20px;">✉️ New Contact Message</h2>
                <p style="margin: 6px 0 0; color: #a0a0b8; font-size: 13px;">Trinity Prayer House Website</p>
              </div>
              <div style="padding: 28px 32px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 10px 0; color: #666; width: 100px; vertical-align: top;"><strong>Name</strong></td>
                    <td style="padding: 10px 0; color: #222;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; vertical-align: top;"><strong>Email</strong></td>
                    <td style="padding: 10px 0; color: #222;"><a href="mailto:${email}" style="color: #1a73e8;">${email}</a></td>
                  </tr>
                  ${phone ? `<tr>
                    <td style="padding: 10px 0; color: #666; vertical-align: top;"><strong>Phone</strong></td>
                    <td style="padding: 10px 0; color: #222;"><a href="tel:${phone}" style="color: #1a73e8;">${phone}</a></td>
                  </tr>` : ''}
                </table>
                <hr style="border: none; border-top: 1px solid #e8e8e8; margin: 20px 0;" />
                <div style="background: #fff; border-radius: 8px; padding: 18px; border: 1px solid #eee;">
                  <p style="margin: 0 0 6px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;"><strong>Message</strong></p>
                  <p style="margin: 0; color: #222; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="background: #f0f0f0; padding: 16px 32px; text-align: center;">
                <p style="margin: 0; color: #888; font-size: 12px;">Sent from trinityprayerhouse.com contact form</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Gmail send error:', emailErr);
      }
    } else {
      console.error('Gmail credentials not configured — skipping email send');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
