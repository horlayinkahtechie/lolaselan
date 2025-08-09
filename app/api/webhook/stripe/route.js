// app/api/webhooks/stripe/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "@/app/lib/supabase";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Idempotency: try to insert a processing marker. If it already exists, skip.
  try {
    const { error: insertErr } = await supabase
      .from("stripe_events")
      .insert([{ id: event.id, type: event.type, status: "processing" }]);

    if (insertErr) {
      // If insert failed (likely duplicate key), check if event already processed
      const { data: existingEvent } = await supabase
        .from("stripe_events")
        .select("status")
        .eq("id", event.id)
        .single();

      if (existingEvent) {
        console.log("Event already exists with status:", existingEvent.status);
        // If it is processing or processed, return 200 so Stripe won't re-send
        return NextResponse.json({ received: true });
      }

      // if no existing record found but insertErr occurred, throw to retry
      console.error("Error inserting stripe_events record:", insertErr);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  } catch (err) {
    console.error("Unexpected error during idempotency insert:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Only handle checkout.session.completed for now
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Prefer customer_email else fallback to metadata.email
    const customerEmail =
      session.customer_email || session.metadata?.email || null;
    const orderId = session.metadata?.order_id || null;
    // Useful metadata like user id if you send it
    const userId = session.metadata?.user_id || null;

    try {
      // 1) Update orders status to 'paid' for all items with this order_id
      if (orderId) {
        const { error: updateError } = await supabase
          .from("orders")
          .update({ status: "paid" })
          .eq("order_id", orderId);

        if (updateError) throw updateError;
      } else {
        console.warn(
          "No order_id found in session metadata. Skipping order update."
        );
      }

      // 2) Clear user's cart - prefer customerEmail, fallback to metadata.email or metadata.user_id
      if (customerEmail) {
        const { error: cartDeleteErr } = await supabase
          .from("cart")
          .delete()
          .eq("email", customerEmail);

        if (cartDeleteErr) throw cartDeleteErr;
      } else if (userId) {
        const { error: cartDeleteErr } = await supabase
          .from("cart")
          .delete()
          .eq("user_id", userId);

        if (cartDeleteErr) throw cartDeleteErr;
      } else {
        console.warn("No customer email or user id available to clear cart.");
      }

      // 3) Fetch order items (multiple rows) to build the confirmation email
      let orderItems = [];
      if (orderId) {
        const { data: itemsData, error: itemsError } = await supabase
          .from("orders")
          .select("*")
          .eq("order_id", orderId);

        if (itemsError) throw itemsError;
        orderItems = itemsData || [];
      }

      // compute totals for email
      const total = orderItems.reduce((acc, it) => {
        // support different column names: product_price, price or totalToBePaid
        const price = Number(
          it.productPrice ?? it.price ?? it.totalToBePaid ?? 0
        );
        const qty = Number(it.quantity ?? 1);
        return acc + price * qty;
      }, 0);

      // 4) Send email if we have an address
      if (customerEmail) {
        const html = generateOrderEmailHtml({
          orderId,
          items: orderItems,
          total,
        });

        await resend.emails.send({
          from: "contact@lolaselan.com",
          to: customerEmail,
          subject: `Order Confirmation #${orderId ?? "(no-id)"}`,
          html,
        });
      } else {
        console.warn("No customer email — skipping confirmation email.");
      }

      // 5) Mark the stripe_events row as processed
      const { error: markErr } = await supabase
        .from("stripe_events")
        .update({ status: "processed", processed_at: new Date().toISOString() })
        .eq("id", event.id);

      if (markErr) {
        // log it but do not fail the webhook — we've done the side effects
        console.error("Failed to mark stripe_events as processed:", markErr);
      }

      console.log(
        `Successfully processed checkout.session.completed for order ${orderId}`
      );
      return NextResponse.json({ received: true });
    } catch (err) {
      console.error("Error processing checkout.session.completed:", err);
      // Optionally: revert the stripe_events insertion (set status to 'failed') so you can re-run it manually
      try {
        await supabase
          .from("stripe_events")
          .update({ status: "failed" })
          .eq("id", event.id);
      } catch (e) {
        console.error("Failed to mark stripe_events as failed:", e);
      }
      // return 500 so Stripe will retry the webhook (safe)
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      );
    }
  }

  // If you don't care about other events, mark as received
  return NextResponse.json({ received: true });
}

/**
 * Build an HTML email from order items array.
 * Expect `order.items` as array of rows from `orders` table.
 */
function generateOrderEmailHtml({ orderId, items = [], total = 0 }) {
  const itemsHtml = items
    .map((it) => {
      const name = it.name ?? it.product_name ?? "Item";
      const qty = it.quantity ?? 1;
      const price = Number(
        it.productPrice ?? it.price ?? it.totalToBePaid ?? 0
      ).toFixed(2);
      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">£${price}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <html>
      <body style="font-family:Arial,Helvetica,sans-serif;color:#111;">
        <h2>Thank you for your order!</h2>
        <p>Order <strong>#${escapeHtml(orderId ?? "N/A")}</strong></p>

        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Item</th>
              <th align="center" style="padding:8px;border-bottom:2px solid #ddd;">Qty</th>
              <th align="right" style="padding:8px;border-bottom:2px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml || `<tr><td colspan="3" style="padding:8px;">No items found.</td></tr>`}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:8px;text-align:right;font-weight:bold;border-top:2px solid #ddd;">Total</td>
              <td style="padding:8px;text-align:right;font-weight:bold;border-top:2px solid #ddd;">£${Number(total).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <p>If you have any questions reply to this email.</p>
      </body>
    </html>
  `;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
