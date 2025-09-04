import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const items = body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Calculate totals
    const itemsTotal = items.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );

    const orderTotal = itemsTotal + Number(body.shippingPrice);

    // Store each item individually in the database
    for (const item of items) {
      const orderData = {
        order_id: item.order_id,
        email: item.email,
        status: item.status,
        firstName: item.firstName,
        lastName: item.lastName,
        address: item.address,
        city: item.city,
        postalCode: item.postalCode,
        country: item.country,
        phoneNo: item.phoneNo,
        shippingMethod: item.shippingMethod,
        shippingPrice: item.shippingPrice,
        paymentMethod: item.paymentMethod,
        productPrice: item.productPrice,
        totalToBePaid: item.totalToBePaid,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        size: item.size,
      };

      const { error: dbError } = await supabase
        .from("orders")
        .insert(orderData);
      if (dbError) throw dbError;
    }

    // Create Stripe line items for all products
    const stripeLineItems = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          images: item.image,
        },
        unit_amount: Math.round(item.productPrice * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a separate line item
    stripeLineItems.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(body.shippingPrice * 100),
      },
      quantity: 1,
    });

    // Create Stripe checkout session with multiple payment options
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "afterpay_clearpay"],
      mode: "payment",
      line_items: stripeLineItems,
      customer_email: body.email,
      metadata: {
        customer_email: body.email,
      },
      success_url: `${process.env.NEXTAUTH_URL}/status/cart-checkout-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/status/cart-checkout-declined`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}
