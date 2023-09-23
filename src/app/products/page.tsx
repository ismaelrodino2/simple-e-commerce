"use client";
import { Card } from "@/components/Card";
import { SearchContext } from "@/contexts/SearchContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loading from "./loading";
import { Cart2 } from "@/utils/types";

const MyPurchasing = () => {
  const { search } = useContext(SearchContext);
  const [data, setData] = useState<Array<Cart2> | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get("/api/products", {
        params: { page, pageSize: 5, search },
      });
      const { data, totalPages, currentPage } = response.data;
      setData(data);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchData(currentPage);
    setLoading(false);
  }, [search]);

  if (!data || loading) {
    return <Loading />;
  }

  const handlePageChange = (selectedPage: { selected: number }) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  return (
    <>
      <div className="flex justify-center md:justify-normal flex-wrap px-4 md:px-20 gap-4">
        {/* Render the fetched data */}
        {data?.map((product: Cart2) => (
          <div key={product.id}>
            <Card el={product} />
          </div>
        ))}
        {/* Render the pagination component */}
      </div>
      <div className="pt-8">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          containerClassName="flex justify-center gap-2"
          pageClassName="p-2 cursor-pointer border bg-gray-200 text-gray-600"
          activeClassName="bg-blue-500 text-white"
          previousClassName="p-2 cursor-pointer border bg-gray-200 text-gray-600"
          nextClassName="p-2 cursor-pointer border bg-gray-200 text-gray-600"
          breakClassName="p-2 cursor-pointer border bg-gray-200 text-gray-600"
          pageLinkClassName="text-[black]"
        />
      </div>
    </>
  );
};

export default MyPurchasing;
