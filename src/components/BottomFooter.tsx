import { BottomFooter } from "@/utils/helpers";

export const BottomFooterDown = () => {
  return (
    <div className="bg-cream800 py-14 md:px-16 px-4 flex justify-between md:flex-row flex-col md:items-start">
      <div className="flex md:items-start items-center md:order-1 order-2 flex-col ">
        <div className="md:flex md:gap-14 gap-4 flex-col hidden">
          <h1 className="text-[#043A61] md:block items-center ">
            <img
              className="w-30 ml-auto pr-8 h-fit"
              src="/images/logo.svg"
              alt="logo"
            />
            Furnish In
          </h1>
          <p className="text-black700">FAQ: All rights reserved.</p>
        </div>
      </div>

      <div className="pt-8 md:pt-0 flex justify-around md:w-[60%] text-black700 items-start md:order-2 order-1">
        <ul className="gap-8 flex flex-col">
          {BottomFooter()[0].map((el, i) => {
            return <li key={i + "-" + el}>{el}</li>;
          })}
        </ul>
        <ul className="gap-8 flex flex-col">
          {BottomFooter()[1].map((el, i) => {
            return <li key={i + "-" + el}>{el}</li>;
          })}
        </ul>
        <ul className="gap-8 flex flex-col lg:pr-32 md:pr-20 pr-0">
          {BottomFooter()[2].map((el, i) => {
            return <li key={i + "-" + el}>{el}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
