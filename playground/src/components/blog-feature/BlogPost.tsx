import getTokenFromStorage from "../../utils/getTokenFromStorage";
import { PostProps } from "./BlogTypes";

function BlogPost({ post }: { post: PostProps }) {
  const token = getTokenFromStorage();

  return <h1>{post.title}</h1>;
}

export default BlogPost;
