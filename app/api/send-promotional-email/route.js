import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { subject, message, recipients } = await req.json();

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients provided" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "ShopLolaselan <contact@shoplolaselan.uk>",
      to: recipients,
      subject,
      html: `<div style="font-family: sans-serif; line-height: 1.5">
              <h2>${subject}</h2>
              <p>${message}</p>
             </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
