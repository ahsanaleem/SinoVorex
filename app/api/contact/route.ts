import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Tradevorex Website" <${process.env.GMAIL_USER}>`,
      to: "ahsanaleem244@gmail.com",
      replyTo: email,
      subject: `New Consultation Request — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0;">
          <div style="background: #0A0F1E; padding: 32px 40px; border-bottom: 3px solid #FF6B2B;">
            <h1 style="color: #FF6B2B; font-size: 22px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">TRADEVOREX</h1>
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 6px 0 0; letter-spacing: 1px; text-transform: uppercase;">New Consultation Request</p>
          </div>

          <div style="background: #ffffff; padding: 36px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; width: 140px;">
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #999;">Full Name</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <span style="font-size: 15px; color: #111; font-weight: 600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #999;">Email</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #FF6B2B; font-size: 15px; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #999;">Phone</span>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <span style="font-size: 15px; color: #111;">${phone || "—"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0 6px; vertical-align: top;">
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #999;">Message</span>
                </td>
                <td style="padding: 16px 0 6px;">
                  <p style="font-size: 15px; color: #333; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
                </td>
              </tr>
            </table>
          </div>

          <div style="background: #f5f5f5; padding: 20px 40px; text-align: center;">
            <p style="font-size: 12px; color: #aaa; margin: 0;">
              Sent from the Tradevorex website contact form &nbsp;·&nbsp;
              <a href="mailto:${email}" style="color: #FF6B2B; text-decoration: none;">Reply to ${name}</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
