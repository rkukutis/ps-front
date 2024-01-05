import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/tokenStore";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Pagination } from "../../pages/Blog";
import PostForm from "./PostForm";
import Button from "../Button";
import getPosts from "../../services/posts-api/getPosts";
import NoMorePosts from "./NoMorePosts";
import { PostProps } from "./BlogTypes";
import BlogPost from "./BlogPost";
import { BlogPostDetails } from "./BlogPostDetails";

export default function BlogPostContainer({ pagination }: { pagination: Pagination }) {
  const [postForm, setPostForm] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["posts", pagination.page, pagination.limit, pagination.sortBy, pagination.sortDesc, pagination.contains],
    queryFn: () => getPosts(pagination)
  });
  const { token } = useUserStore();
  const posts = data?.content;

  return (
    <div className="flex flex-col items-center w-full">
      {isFetching ? (
        <ClipLoader size={150} cssOverride={{ margin: "30vh" }} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <div className="w-full">
          {token && (
            <div className="">
              <Button extraStyle="w-full" type={postForm ? "danger" : "normal"} onclick={() => setPostForm(!postForm)}>
                {postForm ? "Cancel" : "Create a new Post"}
              </Button>
              {postForm && <PostForm closeForm={() => setPostForm(false)} />}
            </div>
          )}
          {posts?.length === 0 ? (
            <NoMorePosts />
          ) : (
            <div className="flex flex-col items-center">{posts?.map((post: PostProps) => <BlogPostDetails post={post} key={post.uuid} />)}</div>
          )}
        </div>
      )}
    </div>
  );
}
