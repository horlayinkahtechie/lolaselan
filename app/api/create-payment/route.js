import { NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "@/app/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const orderData = {
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
      totalToBePaid: body.totalProductPrice,
      productPrice: body.productPrice,
      name: body.name,
      image: body.image[0],
      quantity: body.quantity,
      status: "pending",
      paymentMethod: "stripe",
      product_id: body.product_id,
    };

    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert(orderData);

    if (dbError) throw dbError;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal", "klarna", "afterpay_clearpay"],
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: body.name,
              images: [body.image[0]],
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
        customer_email: body.email,
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
        image: body.image[0],
        quantity: body.quantity,
      },
      success_url: `${process.env.NEXTAUTH_URL}/status/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/status/declined`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
