import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../stores/userStore";
import { deletePost } from "../../services/deletePost";
import Button from "../Button";
import toast from "react-hot-toast";

export interface Post {
  uuid: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

export function BlogPost({ post }: { post: Post }) {
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
        <p className="whitespace-pre-wrap">{post.body}</p>
        <p>{post.imageUrl}</p>
        <p>{post.createdAt}</p>
      </div>
      {username && (
        <div className="col-span-2 flex w-full justify-center space-x-2 pt-3">
          <Button extraStyle="w-full" onclick={() => mutation.mutate(post.uuid)} type="danger">
            Delete
          </Button>
          <Button extraStyle="w-full" onclick={() => console.log("update")}>
            Update
          </Button>
        </div>
      )}
    </div>
  );
}
