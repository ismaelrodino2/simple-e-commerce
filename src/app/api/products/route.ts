import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest, res: NextResponse) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const search: string = searchParams.get("search")!;
  const page: number = parseInt(searchParams.get("page")!);
  const pageSize: number = parseInt(searchParams.get("pageSize")!);

  try {
    let products;
    if (search === "" || search === null) {
      products = await stripe.products.list({
        expand: ["data.default_price"],
      });
    } else {
      products = await stripe.products.search({
        expand: ["data.default_price"],
        query: `name~"${search}"	`,
      });
    }
    const totalProducts = products.data.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.data.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        data: paginatedProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
      }),
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        data: null,
        totalPages: null,
        currentPage: null,
      }),
    );
  }
}

// This is your test secret API key.
