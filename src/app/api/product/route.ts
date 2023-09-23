import { revalidateTag } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  "use server";
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const userId: string = searchParams.get("id")!;
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });

  try {
    const paymentIntents2 = await stripe.checkout.sessions.list({
      customer: userId,
    });

    return new Response(JSON.stringify({ url: paymentIntents2 }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ url: null }));
  }
}
