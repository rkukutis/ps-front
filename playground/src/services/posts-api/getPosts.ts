import { Post } from "../../components/blog-feature/BlogPost";
import { Pagination } from "../../pages/Blog";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

export interface GetPostsResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
}

export default async function getPosts({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortDesc = "true",
  contains
}: Pagination): Promise<GetPostsResponse | null> {
  const titleFilter = contains ? `&contains=${contains}` : "";
  const res = await fetch(`http://localhost:8080/posts?limit=${limit}&page=${page}&sortBy=${sortBy}&sortDesc=${sortDesc}${titleFilter}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromStorage()}`
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer"
  });
  if (res.status !== 200) {
    throw new Error("Could not fetch messages");
  }
  const data = await res.json();
  return data;
}
