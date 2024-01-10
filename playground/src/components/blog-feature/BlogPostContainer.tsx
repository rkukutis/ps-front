import { useUserStore } from "../../stores/tokenStore";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import PostForm from "./PostForm";
import Button from "../Button";
import NoMorePosts from "./NoMorePosts";
import { PostProps } from "./BlogTypes";
import BlogPost from "./BlogPost";

export default function BlogPostContainer({ posts, isFetching }: { posts: PostProps[] | undefined; isFetching: boolean }) {
  const [postForm, setPostForm] = useState(false);
  const { token } = useUserStore();

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
            <div className="flex flex-col items-center">{posts?.map((post: PostProps) => <BlogPost post={post} key={post.uuid} />)}</div>
          )}
        </div>
      )}
    </div>
  );
}
