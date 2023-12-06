import { useEffect, useState } from "react";
import BlogPostContainer from "../components/blog-feature/BlogPostContainer";
import PaginationSettings from "../components/blog-feature/PaginationSettings";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export interface Pagination {
  page: number;
  limit: number;
  sortBy: string;
  sortDesc: string;
  contains?: string;
}

const defaultPagination: Pagination = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortDesc: "true"
};

export default function Blog() {
  const [pagination, setPagination] = useState(defaultPagination);
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(
  //   function () {
  //     setSearchParams((params: URLSearchParams): URLSearchParamsInit => {
  //       params.set("page", `${pagination.page}`);
  //       params.set("limit", `${pagination.limit}`);
  //       params.set("sortBy", `${pagination.sortBy}`);
  //       params.set("sortDesc", `${pagination.sortDesc}`);
  //       if (pagination.contains !== undefined) {
  //         params.set("contains", `${pagination.contains}`);
  //       }
  //       return params;
  //     });
  //   },
  //   [pagination.page, pagination.limit, pagination.sortBy, pagination.sortDesc, pagination.contains, setSearchParams]
  // );

  const user = localStorage.getItem("user");
  if (!user) return;
  const { state } = JSON.parse(user);

  return (
    <>
      {state.password ? (
        <div className="grid grid-cols-12 min-h-[80vh]">
          <div className="col-span-3 flex justify-end">
            <PaginationSettings setPagination={setPagination} pagination={pagination} />
          </div>
          <div className="col-span-8">
            <BlogPostContainer pagination={pagination} />
          </div>
        </div>
      ) : (
        <h1 className="min-h-[80vh] bg-slate-50 flex flex-col justify-center items-center text-4xl">
          🛑 Only logged in users can currently access the blog. 🛑
        </h1>
      )}
    </>
  );
}
