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

    // Get session details
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product"], // expand product details
    });

    if (session.payment_status === "paid") {
      const email = session.customer_email;
      const customerName = session.customer_details?.name || "";

      // Update all orders for this email to "paid"
      await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("email", email);

      // Build purchased items table
      const itemsHtml =
        session.line_items?.data
          .map(
            (item) => `
            <tr>
              <td style="padding:8px; border:1px solid #eee;">${item.description}</td>
              <td style="padding:8px; border:1px solid #eee; text-align:center;">${item.quantity}</td>
              <td style="padding:8px; border:1px solid #eee; text-align:right;">£${(
                item.amount_total / 100
              ).toFixed(2)}</td>
            </tr>
          `
          )
          .join("") || "";

      // Customer Email HTML template
      const emailHtml = `
        <div style="font-family:Arial, sans-serif; background:#f9f9f9; padding:20px;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background:#ff6f00; padding:20px; text-align:center;">
              <h1 style="margin:0; color:#fff;">LolasÈlan</h1>
            </div>
            
            <!-- Body -->
            <div style="padding:20px;">
              <h2 style="color:#333;">Thank you for your order!</h2>
              <p>Your order has been confirmed and is now being processed.</p>
              
              <h3 style="margin-top:20px;">Order Summary</h3>
              <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                  <tr style="background:#f4f4f4;">
                    <th style="padding:8px; border:1px solid #eee; text-align:left;">Product</th>
                    <th style="padding:8px; border:1px solid #eee; text-align:center;">Qty</th>
                    <th style="padding:8px; border:1px solid #eee; text-align:right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <p style="margin-top:20px; font-size:16px;">
                <strong>Total Paid:</strong> £${(session.amount_total / 100).toFixed(2)}
              </p>
              
              <div style="text-align:center; margin-top:30px;">
                <a href="https://shoplolaselan.uk/user/profile" 
                   style="display:inline-block;background:#ff6f00;color:#fff;padding:12px 24px;text-decoration:none;font-size:16px;border-radius:6px;">
                   View My Orders
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#777;">
              <p style="margin:0;">&copy; ${new Date().getFullYear()} LolasÈlan. All rights reserved.</p>
            </div>
          </div>
        </div>
      `;

      // Send confirmation email to customer
      await resend.emails.send({
        from: "LolasÈlan <contact@shoplolaselan.uk>",
        to: email,
        subject: "Your LolasÈlan Order Confirmation",
        html: emailHtml,
      });

      // Admin Notification Email HTML template
      const adminEmailHtml = `
        <div style="font-family:Arial, sans-serif; background:#f9f9f9; padding:20px;">
          <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background:#4a5568; padding:20px; text-align:center;">
              <h1 style="margin:0; color:#fff;">New Order Received!</h1>
            </div>
            
            <!-- Body -->
            <div style="padding:20px;">
              <h2 style="color:#333;">Customer Information</h2>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${email}</p>
              
              <h3 style="margin-top:20px;">Order Summary</h3>
              <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                  <tr style="background:#f4f4f4;">
                    <th style="padding:8px; border:1px solid #eee; text-align:left;">Product</th>
                    <th style="padding:8px; border:1px solid #eee; text-align:center;">Qty</th>
                    <th style="padding:8px; border:1px solid #eee; text-align:right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <p style="margin-top:20px; font-size:16px;">
                <strong>Total Paid:</strong> £${(session.amount_total / 100).toFixed(2)}
              </p>
              
              <div style="text-align:center; margin-top:30px;">
                <a href="https://shoplolaselan.uk/admin/orders" 
                   style="display:inline-block;background:#4a5568;color:#fff;padding:12px 24px;text-decoration:none;font-size:16px;border-radius:6px;">
                   View All Orders
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#777;">
              <p style="margin:0;">&copy; ${new Date().getFullYear()} LolasÈlan. All rights reserved.</p>
            </div>
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