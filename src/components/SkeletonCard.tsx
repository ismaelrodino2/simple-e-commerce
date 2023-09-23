export const SkeletonCard = () => {
  return (
    <div className="block">
      <div className="flex rounded-lg overflow-hidden bg-gray-200 flex-col w-72">
        <div className="bg-gray-400 text-white py-4 pr-8 pl-5 flex animate-pulse"></div>
        <div className="bg-white">
          <div className="w-full h-[200px] bg-gray-300"></div>
          <div className="px-4">
            <h1 className="card-header mt-2 pt-4 bg-gray-300 h-6 w-3/4 animate-pulse"></h1>
            <div className="py-4 flex flex-col gap-3">
              <p className="font-bold bg-gray-300 h-4 w-1/2 animate-pulse"></p>
              <div>
                <span className="bg-gray-300 h-4 w-20 animate-pulse"></span>
                <p className="text-green-500 font-semibold">In Stock</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-gray-400 py-2 px-8">
            <div className="">
              <p className="pb-1 text-black800 bg-gray-300 h-4 w-1/2 animate-pulse"></p>
              <span className="font-semibold bg-gray-300 h-4 w-20 animate-pulse"></span>
            </div>
            {/* AddToCart skeleton */}
            <div className="w-16 h-8 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
