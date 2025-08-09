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
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const email = session.customer_email;

      // ✅ Update all orders for this email to "paid"
      await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("email", email);

      // ✅ Send confirmation email
      await resend.emails.send({
        from: "Lola Selan <orders@yourdomain.com>",
        to: email,
        subject: "Your Lola Selan Order Confirmation",
        html: `
          <div style="font-family:Arial, sans-serif; padding:20px;">
            <h1 style="color:#ff6f00;">Thank you for your order!</h1>
            <p>Your order has been confirmed and is now being processed.</p>
            <p><strong>Total Paid:</strong> £${(session.amount_total / 100).toFixed(2)}</p>
            <a href="https://lolaselan.netlify.app/profile/orders" 
               style="display:inline-block;background:#ff6f00;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">
               View My Orders
            </a>
          </div>
        `,
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
