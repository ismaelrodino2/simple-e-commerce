import { NextRequest } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  const body = await req.json();
  try {
    const checkoutSessionId = body.id;
    stripe.checkout.sessions.expire(checkoutSessionId);
    return new Response(JSON.stringify({ text: `success` }));
  } catch (err) {
    return new Response(JSON.stringify({ text: `error` }));
  }
}
