import Link from "next/link";
import Stripe from "stripe";
import { Links } from "@/utils/helpers";
import { TopFooter } from "@/components/TopFooter";
import { Card } from "@/components/Card";
import { CardAdd } from "@/components/CardAdd";
import { BottomFooter } from "@/components/MidFooter";
import { BottomFooterDown } from "@/components/BottomFooter";
import { Button } from "@/components/Button";
import { Cart, Cart2, Product } from "@/utils/types";

async function getPostsData() {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
      apiVersion: "2022-11-15",
    });

    const products: any = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 5,
    });

    return products;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const revalidate = 60;

export default async function Home() {
  const postPromise = getPostsData();
  const products = await postPromise;

  return (
    <div className="bg-cream800">
      <div className=" container mx-auto px-4 flex flex-col xl:max-w-6xl">
        <hr className="border-black300 border-opacity-30 border" />
        {/* <Product products={products} /> */}
      </div>
      <ul className="nav-item text-sm py-2 flex mx-5 justify-center gap-6">
        {Links().map((el, i) => {
          return (
            <Link href={el.link} key={i + "-" + el.link}>
              <li className=" py-[11px]">{el.name}</li>
            </Link>
          );
        })}
      </ul>
      <div className="h-[700px] flex flex-col md:flex-row">
        <div className="order-1 md:order-2 h-full md:w-1/2 bg-[url('/images/home.png')] bg-cover bg-center"></div>
        <div className="h-full md:w-1/2 bg-gradient-to-b md:bg-gradient-to-r md:from-[#004374] md:via-[#19597e] md:to-[#3483bb] from-[#3483bb] via-[#19597e] to-[#004374] flex items-center order-2 md:order-1">
          <div className="md:px-28 px-4">
            <h1 className="get-started-header pb-10">
              Transforming the way that you choose your furniture and fall in
              love.
            </h1>

            <Button text={"Let's Get Started"} color={"cream"} />
          </div>
        </div>
      </div>
      <div className="bg-blue400">
        <div className="container ml-auto  pl-4">
          <div className=" py-20 flex overflow-x-auto  gap-8 overflow ">
            <CardAdd />
            {products?.data?.map((el: Cart2) => {
              //problema
              return (
                <div key={el.id}>
                  <Card el={el} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-blue400 w-full py-10"></div>

      <TopFooter />
      <BottomFooter />
      <BottomFooterDown />
    </div>
  );
}

export const metadata = {
  title: "Products of Furnish in",
  description: "Products of furnish ecommerce website",
};
