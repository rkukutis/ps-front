import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/userStore";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { BlogPost, Post } from "./BlogPost";
import PostForm from "./PostForm";
import Button from "../Button";
import getPosts from "../../services/getPosts";

export default function BlogPostContainer() {
  const [postForm, setPostForm] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortDesc: true
  });
  const { data, isFetching } = useQuery({
    queryKey: ["posts", pagination.page, pagination.limit, pagination.sortBy, pagination.sortDesc],
    queryFn: () => getPosts(pagination)
  });
  const { username } = useUserStore();
  const posts = data?.content;

  return (
    <div className="flex flex-col items-center">
      {isFetching ? (
        <ClipLoader size={150} cssOverride={{ margin: "30vh" }} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <div className="flex flex-col items-center w-screen">
          <div className="w-3/5">
            {username && (
              <div className="pt-3 flex flex-col space-y-3">
                <Button type={postForm ? "danger" : "normal"} onclick={() => setPostForm(!postForm)}>
                  {postForm ? "Cancel" : "Create a new Post"}
                </Button>
                {postForm && <PostForm closeForm={() => setPostForm(false)} />}
              </div>
            )}
            <div className="flex flex-col items-center">{posts?.map((post: Post) => <BlogPost post={post} key={post.uuid} />)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
