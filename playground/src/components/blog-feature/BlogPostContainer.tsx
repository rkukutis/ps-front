import { useQuery } from "@tanstack/react-query";
import getPosts from "../../services/getPosts";
import { BlogPost, Post } from "./BlogPost";

export default function BlogPostContainer() {
  const { data } = useQuery({ queryKey: ["fact"], queryFn: getPosts });
  const posts = data?.content;

  return (
    <div className="flex flex-col items-center">
      {posts?.map((post: Post) => <BlogPost post={post} key={post.uuid} />)}
    </div>
  );
}
