import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  const body = await req.json();

  try {
    const YOUR_DOMAIN =
      process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: body.stripeCustomerId, // Replace {{CUSTOMER_ID}} with the actual customer ID
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "brl",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "brl",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      metadata: {
        product_name: body.product_name,
        product_image_url: body.product_image_url,
        owner_id: body.stripeCustomerId,
        owner_name: body.name,
      },
    });

    return new Response(JSON.stringify({ text: session.url }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ text: null }));
  }
}

// This is your test secret API key.
