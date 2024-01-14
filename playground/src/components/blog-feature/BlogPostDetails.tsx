import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useUserStore } from "../../stores/tokenStore";
import { deletePost } from "../../services/posts-api/deletePost";
import Button from "../Button";
import toast from "react-hot-toast";
import { useState } from "react";
import PostForm from "./PostForm";
import formatDate from "../../utils/formatDate";
import cleanHTML from "../../utils/cleanHTML";
import { useParams } from "react-router-dom";
import getPost from "../../services/posts-api/getPost";

export function BlogPostDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useUserStore();
  const mutation = useMutation({
    mutationFn: async (postId: string) => await deletePost(postId),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
  const { uuid } = useParams();

  const { data: post, isFetching } = useQuery({
    queryKey: ["post_details"],
    queryFn: () => getPost(uuid || "sds")
  });
  if (!post) return;

  return (
    <div className="bg-slate-100 rounded-md flex flex-col space-y-3 w-full px-8 py-5 mb-2">
      {isFetching ? (
        <ClipLoader />
      ) : (
        <>
          {" "}
          <div className="flex space-x-4">
            <h1 className="font-bold text-3xl">{post.title}</h1>
            <img
              className="h-14 rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVWf_XChj3jCS7ZuA3r1ot387qWiKwQGpPpA&usqp=CAU"
            />
            <div>
              <h3>
                Author: <b>rhoopoe</b>
              </h3>
              <h3>Posted: {formatDate(post.createdAt)}</h3>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div
              className="prose max-w-none prose-img:rounded-md lg:prose-lg xl:prose-xl focus:outline-none bg-slate-50 py-4 px-4 rounded-md prose-img:mx-auto"
              dangerouslySetInnerHTML={{ __html: cleanHTML(post.body) }}
            />
          </div>
          {token && (
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
                  closeForm={() => setIsEditing(!isEditing)}
                  initialFieldValues={{ title: post.title, subtitle: post.subtitle, body: post.body, thumbnail: post.thumbnail }}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
