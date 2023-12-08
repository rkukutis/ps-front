import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createPost from "../../services/posts-api/createPost";
import toast from "react-hot-toast";
import updatePost from "../../services/posts-api/updatePost";
import FormInlineError from "../FormInlineError";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "../editor-feature/MenuBar";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

type Post = { title: string; body: string };

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
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries();
    }
  });

  const onSubmit: SubmitHandler<Post> = (data) => {
    if (!editor) return;
    if (method === "PUT" && postId !== undefined) {
      updateMutation.mutate({ title: data.title, body: editor?.getHTML(), uuid: postId });
    } else {
      postMutation.mutate({ title: data.title, body: editor.getHTML() });
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Image, Underline, TextStyle, Color],
    content: initialFieldValues?.body || "Start here...",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none lg:prose-sm xl:prose-lg mx-auto focus:outline-none bg-slate-50 rounded-md p-2 text-sm min-h-[10rem] w-full prose-img:mx-auto"
      }
    }
  });

  return (
    <div className="flex flex-col items-center">
      <form className="bg-slate-200 py-6 px-4 w-full flex flex-col space-y-2 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Title</label>
          <input defaultValue={initialFieldValues?.title} className="w-full p-2 rounded-md" {...register("title", { required: true })} />
          {errors.title && <FormInlineError message="post title is required" />}
        </div>
        <div className="flex flex-col space-y-2">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          {errors.body && <FormInlineError message="post body is required" />}
        </div>
        <input className="w-full bg-blue-500 text-slate-50 py-2 rounded-md" type="submit" value="Submit" />
      </form>
    </div>
  );
}
