import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["rudreshborle@gmail.com"],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #EAEAEA; padding: 40px; border-radius: 12px; border: 1px solid rgba(0,240,255,0.2);">
          <h2 style="color: #00F0FF; margin-bottom: 8px;">New Portfolio Message</h2>
          <p style="color: #888; margin-bottom: 32px; font-size: 14px;">Someone reached out through your portfolio contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 14px; width: 100px;">From</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 14px;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);"><a href="mailto:${email}" style="color: #00F0FF;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 14px;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">${subject || "No subject"}</td>
            </tr>
          </table>
          
          <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid #00F0FF;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</p>
            <p style="line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 32px; color: #555; font-size: 12px;">Sent from rudreshborle.dev portfolio</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
