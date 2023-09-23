import { NextRequest } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  type Metadata = {
    [key: string]: string | number;
  };
  const YOUR_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
    typescript: true,
  });
  const body = await req.json();

  const metadata: Metadata = {};
  for (const key in body.metadata) {
    metadata[key] = JSON.stringify(body.metadata[key]);
  }
  try {
    const session = await stripe.checkout.sessions.create({
      customer: body.user.stripeId,
      payment_method_types: ["card"],
      line_items: body.arr,
      mode: "subscription",
      metadata: metadata,
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
      to: body.email,
      subject: "Furnish In",
      html: `<p>Congratulations! Your payment has been confirmed. Your stuff will arrive in 3 days!....</p> <br />
      <p>Soon you will get an Email about your delivery stuff...</p>`,
    });

    return new Response(JSON.stringify({ text: session.url, id: session.id }));
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ text: `${YOUR_DOMAIN}/error` }));
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const id: string | null = searchParams.get("id");
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });

  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(id!); // Add type assertion !

    return new Response(JSON.stringify({ url: checkoutSession.url }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ url: null }));
  }
}
