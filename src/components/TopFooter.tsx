import { Customers } from "@/utils/helpers";
import Image from "next/image";
import { Button } from "./Button";

export const TopFooter = () => {
  return (
    <div className="flex justify-center px-4 bg-white">
      <div className="flex pb-12 items-center flex-col md:w-2/3">
        <h1 className="pt-9 pb-14  text-[28px] font-lora">
          What do our customers say?
        </h1>
        <div className="flex gap-10 pb-12 flex-col md:flex-row">
          {Customers().map((el, i) => {
            return (
              <div
                key={i + "-" + el.link}
                className="flex flex-col items-center"
              >
                <div className="flex">
                  <div className="bg-gradient-to-b from-blue850 to-cream800 rounded-full p-[3px]">
                    <div className="rounded-full overflow-hidden w-[80px] h-[80px] relative ">
                      <Image src={el.link} alt={el.alt} fill={true} />
                    </div>
                  </div>
                </div>
                <p className="pt-5 flex text-center">{el.desc}</p>
              </div>
            );
          })}
        </div>
        <Button text={"Let's get started"} color="blue" />
      </div>
    </div>
  );
};
