import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email via Resend
    await resend.emails.send({
      from: "Shop LolasÈlan <noreply@shoplolaselan.uk>",
      to: "contact@shoplolaselan.uk",
      subject: `New Contact Message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#9C3E2D;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f9f9f9;padding:10px;border-radius:5px;">
            ${message}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
