export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-blue400 md:px-12 px-4 min-h-[calc(100vh-112px)] pb-20">
        <div className="flex flex-col">
          <ul className="flex w-fit self-center py-8 gap-8 font-medium text-black700">
            <li>Sort By</li>
            <li>Category</li>
            <li>Price</li>
          </ul>
          <div className=" bg-white rounded-md py-12">{children}</div>
        </div>{" "}
      </div>
    </section>
  );
}
