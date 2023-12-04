import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import { deletePost } from "../../services/deletePost";
import { useUserStore } from "../../stores/userStore";

export interface Post {
  uuid: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

export function BlogPost({ post }: { post: Post }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (postId: string) => await deletePost(postId)
  });
  const { username } = useUserStore();

  function onDelete() {
    mutation.mutate(post.uuid);
    queryClient.invalidateQueries();
  }

  return (
    <div className="bg-slate-100 rounded-md flex flex-col w-full p-2 my-2">
      <div className="col-span-10 px-2">
        <p>{post.uuid}</p>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <p>{post.imageUrl}</p>
        <p>{post.createdAt}</p>
      </div>
      {username && (
        <div className="col-span-2 flex w-full justify-center space-x-2 pt-3">
          <Button extraStyle="w-full" onclick={onDelete} type="danger">
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
