import { Team } from "@/utils/helpers";
import Image from "next/image";
import { Button } from "./Button";

export const BottomFooter = () => {
  return (
    <div className="bg-blue400 flex flex-row">
      {/* block one */}

      <div className="bg-blue400  w-0 lg:flex hidden lg:w-[30%]">
        <img src="/images/left.png" alt="" />
      </div>

      {/* block two */}
      <div className="lg:w-[40%] flex w-full flex-col items-center pb-24">
        <h1 className="text-white font-lora pt-16 text-2xl pb-10 font-semibold  tracking-[0.205em] leading-10	">
          Our Team
        </h1>

        <div className="flex justify-between w-full flex-col lg:flex-row gap-6 pb-16">
          {Team().map((el, i) => {
            return (
              <div key={i + "-" + el.link} className="text-center items-center">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-b from-blue850 to-cream800 rounded-full p-[3px] w-fit">
                    <div className="rounded-full overflow-hidden w-[180px] h-[180px] relative">
                      <Image
                        src={el.link}
                        alt={el.alt}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <h2>{el.name}</h2>
                  <p className="pt-1">{el.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Button text={"Get in touch with us"} color={"cream"} />
      </div>

      {/* block three */}

      <div className="bg-blue400  w-0 lg:flex hidden lg:w-[30%]">
        <img src="/images/right.png" alt="" />
      </div>
    </div>
  );
};
