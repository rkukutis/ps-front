import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { PostProps } from "./BlogTypes";

function BlogPost({ post }: { post: PostProps }) {
  return (
    <div className="flex w-full bg-slate-500 p-6">
      <img className="text h-24" src={post.thumbnail} />
      <section>
        <h1>{post.title}</h1>
        <h2>Author: rhoopoe</h2>
        <h3>{formatDate(post.createdAt)}</h3>
        <Link to={`posts/${post.uuid}`}>Read more</Link>
      </section>
    </div>
  );
}

export default BlogPost;
