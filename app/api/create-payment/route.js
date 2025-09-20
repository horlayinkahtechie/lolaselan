import { NextResponse } from "next/server";
import Stripe from "stripe";
import supabase from "@/app/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("PRICE CHECK:", {
  productPrice: body.productPrice,
  shippingPrice: body.shipping,
});

    // ✅ Ensure image is always an array for Supabase
    const imagesArray = Array.isArray(body.image) ? body.image : [body.image];

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
      shippingPrice: body.shipping,
      totalToBePaid: body.totalProductPrice,
      productPrice: body.productPrice,
      name: body.name,
      image: imagesArray,
      quantity: body.quantity,
      status: "pending",
      paymentMethod: "stripe",
      product_id: body.product_id,
      phoneNo: body.phoneNo,
    };

    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert(orderData);

    if (dbError) throw dbError;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "afterpay_clearpay"],
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: body.name,
              // ✅ Stripe only allows an array of strings (not nested arrays)
              images: [imagesArray[0]],
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
            unit_amount: Math.round(Number(body.shipping) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: String(body.order_id),
        customer_email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country,
        size: body.size,
        shippingMethod: body.shippingMethod,
        shippingPrice: String(body.shipping),
        totalProductPrice: String(body.totalProductPrice),
        productPrice: String(body.productPrice),
        name: body.name,
        image: imagesArray[0], // ✅ Stripe metadata only accepts strings
        quantity: String(body.quantity),
      },
      success_url: `${process.env.NEXTAUTH_URL}/status/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/status/declined`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
