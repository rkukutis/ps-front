import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "../../services/createPost";
import toast from "react-hot-toast";

type Inputs = { title: string; body: string };

interface ErrorInput {
  message: string;
}

function ErrorLabel({ message }: ErrorInput) {
  return <span className="bg-red-100 w-full mt-2 p-1 text-red-500 text-center">{message}</span>;
}

interface Props {
  closeForm: () => void;
}

export default function PostForm({ closeForm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post: { title: string; body: string }) => createPost(post),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      closeForm();
      toast.success("Post created successfully!");
      queryClient.invalidateQueries();
    }
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ title: data.title, body: data.body });
  };

  return (
    <div className="flex flex-col items-center">
      <form className="bg-slate-200 py-6 px-4 w-full flex flex-col space-y-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Post title</label>
          <textarea className="w-full" {...register("title", { required: true })} />
          {errors.title && <ErrorLabel message="post title is required" />}
        </div>
        <div className="flex flex-col">
          <label>Post Body</label>
          <textarea wrap="physical" className="w-full" {...register("body", { required: true })} />
          {errors.body && <ErrorLabel message="post body is required" />}
        </div>
        <input className="bg-blue-500 py-1 w-full hover:curs rounded-md text-slate-100" type="submit" />
      </form>
    </div>
  );
}
