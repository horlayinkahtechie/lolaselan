import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    // ✅ Get session details
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    if (session.payment_status === "paid") {
      const email = session.customer_email;
      const customerName = session.customer_details?.name || "";

      // Update all orders for this email to "paid"
      await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("email", email);

      // Clear cart
      await supabase.from("cart").delete().eq("email", email);

      // Prepare order summary
      const items = session.line_items.data
        .map(
          (item) => `
            <tr style="border-bottom:1px solid #eee;">
              <td style="padding:10px 0;">${item.description}</td>
              <td style="padding:10px 0; text-align:center;">${item.quantity}</td>
              <td style="padding:10px 0; text-align:right;">£${(
                item.amount_total / 100
              ).toFixed(2)}</td>
            </tr>
          `
        )
        .join("");

      const emailHtml = `
        <div style="font-family:Arial, sans-serif; padding:20px; max-width:600px; margin:auto; background:#fff; border:1px solid #eee; border-radius:10px;">
          <h1 style="color:#ff6f00; text-align:center;">Thank you for your order!</h1>
          <p style="font-size:16px; text-align:center;">Hi ${customerName}, your order has been confirmed and is now being processed.</p>
          
          <h2 style="margin-top:30px;">Order Summary</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <thead>
              <tr style="background:#f9f9f9;">
                <th style="text-align:left; padding:10px 0;">Product</th>
                <th style="text-align:center; padding:10px 0;">Qty</th>
                <th style="text-align:right; padding:10px 0;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items}
              <tr>
                <td colspan="2" style="text-align:right; padding:10px 0; font-weight:bold;">Total Paid:</td>
                <td style="text-align:right; padding:10px 0; font-weight:bold;">£${(
                  session.amount_total / 100
                ).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style="text-align:center; margin-top:30px;">
            <a href="https://shoplolaselan.uk/user/profile"
              style="display:inline-block; background:#ff6f00; color:#fff; font-size:16px; font-weight:bold; padding:12px 24px; text-decoration:none; border-radius:5px;">
              View My Orders
            </a>
          </div>

          <p style="font-size:12px; color:#555; text-align:center; margin-top:30px;">
            If you have any questions, reply to this email or contact us at contact@shoplolaselan.uk.
          </p>
        </div>
      `;

      // Send confirmation email to customer
      await resend.emails.send({
        from: "LolasÈlan <contact@shoplolaselan.uk>",
        to: email,
        subject: "Your LolasÈlan Order Confirmation",
        html: emailHtml,
      });

      // Prepare and send admin notification email
      const adminEmailHtml = `
        <div style="font-family:Arial, sans-serif; padding:20px; max-width:600px; margin:auto; background:#fff; border:1px solid #eee; border-radius:10px;">
          <h1 style="color:#ff6f00; text-align:center;">New Order Received!</h1>
          <p style="font-size:16px; text-align:center;">A new order has been placed by ${customerName} (${email}).</p>
          
          <h2 style="margin-top:30px;">Order Summary</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <thead>
              <tr style="background:#f9f9f9;">
                <th style="text-align:left; padding:10px 0;">Product</th>
                <th style="text-align:center; padding:10px 0;">Qty</th>
                <th style="text-align:right; padding:10px 0;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items}
              <tr>
                <td colspan="2" style="text-align:right; padding:10px 0; font-weight:bold;">Total Paid:</td>
                <td style="text-align:right; padding:10px 0; font-weight:bold;">£${(
                  session.amount_total / 100
                ).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style="text-align:center; margin-top:30px;">
            <a href="https://shoplolaselan.uk/admin/orders"
              style="display:inline-block; background:#ff6f00; color:#fff; font-size:16px; font-weight:bold; padding:12px 24px; text-decoration:none; border-radius:5px;">
              View All Orders
            </a>
          </div>
        </div>
      `;

      // ✅ Send admin notification email
      await resend.emails.send({
        from: "LolasÈlan Orders <contact@shoplolaselan.uk>",
        to: "lolaselan@gmail.com",
        subject: `New Order from ${customerName}`,
        html: adminEmailHtml,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false });
  } catch (err) {
    console.error("Error confirming payment:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}