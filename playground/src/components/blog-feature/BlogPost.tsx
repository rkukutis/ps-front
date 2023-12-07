import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../stores/userStore";
import { deletePost } from "../../services/posts-api/deletePost";
import Button from "../Button";
import toast from "react-hot-toast";
import { useState } from "react";
import PostForm from "./PostForm";

export interface Post {
  uuid: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

export function BlogPost({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { username } = useUserStore();
  const mutation = useMutation({
    mutationFn: async (postId: string) => await deletePost(postId),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  return (
    <div className="bg-slate-100 rounded-md flex flex-col w-full p-2 my-2">
      <div className="col-span-10 px-2">
        <p>{post.uuid}</p>
        <p>{post.title}</p>
        {/* <p className="whitespace-pre-wrap">{post.body}</p> */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
          // TODO: this is very unsecure, change to a safer options
        />
        <p>{post.imageUrl}</p>
        <p>{post.createdAt}</p>
      </div>
      {username && (
        <>
          <div className="col-span-2 flex w-full justify-center space-x-2 pt-3">
            <Button extraStyle="w-full" onclick={() => mutation.mutate(post.uuid)} type="danger">
              Delete
            </Button>
            <Button type={isEditing ? "danger" : "normal"} extraStyle="w-full" onclick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Update"}
            </Button>
          </div>
          {isEditing && (
            <PostForm
              postId={post.uuid}
              method="PUT"
              initialFieldValues={{ title: post.title, body: post.body }}
              closeForm={() => setIsEditing(!isEditing)}
            />
          )}
        </>
      )}
    </div>
  );
}
