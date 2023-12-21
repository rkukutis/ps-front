import getTokenFromStorage from "../../utils/getTokenFromStorage";

interface PostUpdate {
  title: string;
  body: string;
  uuid: string;
}

export default async function updatePost(post: PostUpdate) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/posts/${post.uuid}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromStorage()}`
    },
    body: JSON.stringify(post)
  });
  if (res.status !== 202) {
    throw new Error("Could not update Post");
  }
}
