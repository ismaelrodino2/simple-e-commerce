import Stripe from "stripe";
import { cookies } from "next/headers";
import { AiOutlineSetting, AiOutlineShopping } from "react-icons/ai";
import { ProfilePage } from "@/components/ProfilePage";
import Image from "next/image";
import { ButtonPayments } from "@/components/ButtonPayments";
import { CheckoutSessionData } from "@/utils/types";
export const revalidate = 0;

const profile = async () => {
  async function getProduct() {
    try {
      const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY || "", {
        apiVersion: "2022-11-15",
      });
      const nextCookies = cookies(); // Get cookies object
      const token = nextCookies.get("supabase-auth");
      const tokenstring: string = token?.value || "";
      let cookieData;
      if (typeof tokenstring === "string") {
        cookieData = JSON.parse(tokenstring);
      }
      const userId = cookieData.info.user.data.user.stripeId;

      const paymentIntents2: Stripe.ApiList<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.list({
          customer: userId,
        });
      return paymentIntents2;
    } catch (err) {
      console.log(err);
    }
  }

  const postProduct = await getProduct();

  const checkstatus = (payment_status: string, status: string) => {
    if (status === "expired") {
      return "bg-[#ff00007e]";
    } else {
      if (payment_status === "paid") {
        return "bg-[#378f593a]";
      } else {
        return "bg-[#ffff004b]";
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[slate-700]"></div>
      <div className="grid grid-cols-1 gap-4">
        {postProduct?.data.map((el: Stripe.Checkout.Session) => {
          if (el.metadata) {
            for (const [key, value] of Object.entries(el.metadata)) {
              let parsedObj;

              if (typeof value === "string") {
                parsedObj = JSON.parse(value);
              }

              return (
                <div
                  key={el.id}
                  className={`${checkstatus(
                    el.payment_status,
                    el.status!,
                  )}  flex justify-between md:flex-row flex-col rounded-lg shadow p-4`}
                >
                  <div className="flex flex-col break-all	">
                    <h1 className="text-xl font-bold mb-2">
                      {parsedObj?.product_name}
                    </h1>
                    {el.status !== "expired" && el.payment_status !== "paid" ? (
                      <ButtonPayments id={el.id} />
                    ) : null}
                    <h2 className="text-gray-600 mb-2">
                      {String(el.customer)}
                    </h2>

                    <h3 className="mb-2">Status: {el.payment_status}</h3>
                    <h3 className="text-green-600">
                      {el.currency?.toUpperCase()}
                      {el.amount_total &&
                        Number(el.amount_total / 100).toFixed(2)}
                    </h3>
                  </div>

                  <div className="relative h-24 w-24">
                    <Image
                      className="w-full mt-4"
                      src={parsedObj?.product_image_url}
                      alt=""
                      fill
                    />
                  </div>
                </div>
              );
            }
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default profile;
