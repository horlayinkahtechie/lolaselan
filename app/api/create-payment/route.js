// app/api/create-payment/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: body.name,
              images: [body.image],
            },
            unit_amount: Math.round(Number(body.productPrice) * 100),
          },
          quantity: body.quantity,
        },
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Shipping",
            },
            unit_amount: Math.round(Number(body.shippingPrice) * 100), // e.g. 1999
          },
          quantity: 1, // Only once
        },
      ],
      metadata: {
        order_id: body.order_id,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        size: body.size,
        shippingMethod: body.shippingMethod,
        shippingPrice: body.shippingPrice,
        totalProductPrice: body.totalProductPrice,
        productPrice: body.productPrice,
        name: body.name,
        image: body.image,
        quantity: body.quantity,
        shippingMethod: body.shippingMethod,
      },
      success_url: `${process.env.NEXTAUTH_URL}/status/confirmed`,
      cancel_url: `${process.env.NEXTAUTH_URL}/status/declined`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
