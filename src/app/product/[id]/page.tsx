import { AddToCart } from "@/components/AddToCart";
import Stripe from "stripe";

export async function generateStaticParams() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return products?.data.map((product: { id: string }) => ({
      slug: product.id,
    }));
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function getProduct(stripeId: string) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  try {
    const product = await stripe.products.retrieve(stripeId, {
      expand: ["default_price"],
    });
    return product;
  } catch (err) {
    console.log(err);
    return;
  }
}

const Product = async ({ params }: { params: { id: string } }) => {
  const productPromise = getProduct(params.id);
  const products: any = await productPromise;

  return (
    <div className="container mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={products?.images[0]}
            alt="Product Image"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {products?.name}
          </div>
          <p className="mt-2 text-gray-500">{products?.description}</p>
          <p className="mt-2 text-gray-800">
            {Number(products?.default_price?.unit_amount / 100).toFixed(2)}
          </p>
          <div className="mt-4">
            <AddToCart el={products} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
