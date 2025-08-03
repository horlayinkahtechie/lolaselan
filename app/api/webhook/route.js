import { buffer } from "micro";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import supabase from "@/app/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const rawBody = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract metadata
    const data = session.metadata;

    // Insert into Supabase
    const { error } = await supabase.from("orders").insert([
      {
        email: data.email,
        order_id: data.order_id,
        product_id: data.product_id,
        name: data.name,
        image: data.image,
        quantity: data.quantity,
        productPrice: data.productPrice,
        shippingPrice: data.shippingPrice,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        size: data.size,
        shippingMethod: data.shippingMethod,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    ]);

    if (error) console.error("Supabase error:", error.message);
  }

  return NextResponse.json({ received: true });
}
