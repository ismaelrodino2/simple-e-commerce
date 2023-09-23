import Image from "next/image";
import { AddToCart } from "./AddToCart";
import { Cart2 } from "@/utils/types";
import Link from "next/link";

export const Card = ({ el }: { el: Cart2 }) => {
  console.log(el);
  return (
    <div className="block">
      <div className="flex  rounded-lg overflow-hidden bg-cream800 flex-col w-72 ">
        <div className="bg-blue800 text-white py-4 pr-8 pl-5 flex">
          <p className="text-sm leading-5">{el.name}</p>
        </div>
        <div className="bg-white">
          <Link href={`/product/${el.id}`}>
            <div className="w-full h-[200px] relative">
              <Image src={el.images[0]} alt="Your Image" fill={true} />
            </div>
          </Link>
          <div className="px-4">
            <h1 className="card-header pt-4">{el.name}</h1>
            <div className="py-4 flex flex-col gap-3">
              <p className=" font-bold">Green</p>
              <div>
                <span className="">
                  {el.default_price.currency.toUpperCase()}
                  {Number(el.default_price.unit_amount / 100).toFixed(2)}
                </span>
                <p className="text-[green] font-semibold">In Stock</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-cream800 py-2 px-8">
            <div className="">
              <p className="pb-1 text-black800">With your options</p>
              <span className="font-semibold">
                {el.default_price.currency.toUpperCase()}
                {Number(el.default_price.unit_amount / 100).toFixed(2)}
              </span>
            </div>
            <AddToCart el={el} />
          </div>
        </div>
      </div>
    </div>
  );
};
