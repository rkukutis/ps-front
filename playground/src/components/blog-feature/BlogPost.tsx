import Button from "../Button";

export interface Post {
  uuid: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string;
}

export function BlogPost({ post }: { post: Post }) {
  return (
    <div className="text bg-slate-100 py-3 w-1/2 px-4 my-2 rounded-md flex justify-between">
      <div>
        <p>{post.uuid}</p>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <p>{post.imageUrl}</p>
        <p>{post.createdAt}</p>
      </div>
      <Button type="danger">Delete</Button>
    </div>
  );
}
