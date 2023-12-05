import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "../../services/createPost";
import toast from "react-hot-toast";
import updatePost from "../../services/updatePost";

type Post = { title: string; body: string };

function ErrorLabel({ message }: { message: string }) {
  return <span className="bg-red-100 w-full mt-2 p-1 text-red-500 text-center">{message}</span>;
}

interface Props {
  closeForm: () => void;
  initialFieldValues?: { body: string; title: string };
  method?: string;
  postId?: string;
}

export default function PostForm({ closeForm, initialFieldValues, method = "POST", postId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Post>();
  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: (post: { title: string; body: string }) => createPost(post),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      closeForm();
      toast.success("Post created successfully!");
      queryClient.invalidateQueries();
    }
  });
  const updateMutation = useMutation({
    mutationFn: (updatedPost: { title: string; body: string; uuid: string }) => updatePost(updatedPost),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      // closeForm();
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries();
    }
  });

  const onSubmit: SubmitHandler<Post> = (data) => {
    if (method === "PUT" && postId !== undefined) {
      updateMutation.mutate({ title: data.title, body: data.body, uuid: postId });
    } else {
      postMutation.mutate({ title: data.title, body: data.body });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="bg-slate-200 py-6 px-4 w-full flex flex-col space-y-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Post title</label>
          <textarea defaultValue={initialFieldValues?.title} className="w-full" {...register("title", { required: true })} />
          {errors.title && <ErrorLabel message="post title is required" />}
        </div>
        <div className="flex flex-col">
          <label>Post Body</label>
          <textarea wrap="physical" className="w-full" {...register("body", { required: true })} defaultValue={initialFieldValues?.body} />
          {errors.body && <ErrorLabel message="post body is required" />}
        </div>
        <input className="bg-blue-500 py-1 w-full hover:curs rounded-md text-slate-100" type="submit" />
      </form>
    </div>
  );
}
