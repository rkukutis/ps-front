import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = { title: string; body: string };

interface ErrorInput {
  message: string;
}

function ErrorLabel({ message }: ErrorInput) {
  return <span className="bg-red-100 w-full mt-2 p-1 text-red-500 text-center">{message}</span>;
}

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const [displayMessage, setDisplayMessage] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = () => setDisplayMessage(true);

  return (
    <div className="flex flex-col items-center">
      <form
        className="bg-slate-200 py-6 px-4 w-3/4 flex flex-col space-y-4 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Post title</label>
          <textarea className="w-full" {...register("title", { required: true })} />
          {errors.title && <ErrorLabel message="post title is required" />}
        </div>
        <div className="flex flex-col">
          <label>Post Body</label>
          <textarea className="w-full" {...register("body", { required: true })} />
          {errors.body && <ErrorLabel message="post body is required" />}
        </div>
        <input
          className="bg-blue-500 py-1 w-full hover:curs rounded-md text-slate-100"
          type="submit"
        />
      </form>
      {displayMessage && <h1>Why are you typing in stuff? This form does nothing...</h1>}
    </div>
  );
}
