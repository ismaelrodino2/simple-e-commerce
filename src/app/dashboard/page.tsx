import Stripe from "stripe";
async function getPostsData() {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
      apiVersion: "2022-11-15",
    });

    const paymentIntents = await stripe.paymentIntents.list({
      limit: 3,
    });

    return paymentIntents;
  } catch (err) {
    console.log(err);
    return [];
  }
}
const Dashboard = async () => {
  const postPromise = getPostsData();
  const products = await postPromise;

  return <div>{JSON.stringify(products)}</div>;
};
export default Dashboard;
