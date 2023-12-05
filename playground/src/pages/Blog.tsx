import { useState } from "react";
import BlogPostContainer from "../components/blog-feature/BlogPostContainer";
import PaginationSettings from "../components/blog-feature/PaginationSettings";

export interface Pagination {
  page: number;
  limit: number;
  sortBy: string;
  sortDesc: string;
  contains?: string;
}

export default function Blog() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortDesc: "true"
  });

  return (
    <div className="grid grid-cols-12">
      {/* <Testing /> */}
      {/* <PostForm /> */}
      <div className="col-span-3 flex justify-end">
        <PaginationSettings setPagination={setPagination} pagination={pagination} />
      </div>
      <div className="col-span-8">
        <BlogPostContainer pagination={pagination} />
      </div>
    </div>
  );
}
