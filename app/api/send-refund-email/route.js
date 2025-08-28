import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, order_id, delivery_status } = await request.json();

    let subject, htmlContent;

    if (delivery_status === "processing refund") {
      subject = `Your refund for order ${order_id} is being processed`;
      htmlContent = `
        <h1>Refund Processing</h1>
        <p>Hello,</p>
        <p>Your refund request for order <strong>${order_id}</strong> is now being processed.</p>
        <p>We will review your request and update you within 3-5 business days.</p>
        <p>Thank you for your patience.</p>
        <br>
        <p>Best regards,<br>LolasÈlan</p>
      `;
    } else if (delivery_status === "returned") {
      subject = `Your refund for order ${order_id} has been processed`;
      htmlContent = `
        <h1>Refund Completed</h1>
        <p>Hello,</p>
        <p>Your refund for order <strong>${order_id}</strong> has been processed successfully.</p>
        <p>The amount will be credited back to your original payment method within 5-10 business days.</p>
        <p>Thank you for shopping with us.</p>
        <br>
        <p>Best regards,<br>LolasÈlan</p>
      `;
    } else if (delivery_status === "declined refund") {
      subject = `Your refund request for order ${order_id} has been declined`;
      htmlContent = `
    <h1>Refund Request Declined</h1>
    <p>Hello,</p>
    <p>We have carefully reviewed your refund request for order <strong>${order_id}</strong>.</p>
    <p>Unfortunately, your request has been declined as it does not meet our refund policy requirements.</p>
    <p>If you believe this decision was made in error, please reach out to our support team for further assistance.</p>
    <br>
    <p>Thank you for your understanding.<br>LolasÈlan</p>
  `;
    }

    const { data, error } = await resend.emails.send({
      from: "LolasÈlan <noreply@shoplolaselan.uk>",
      to: email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
