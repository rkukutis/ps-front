interface PostUpdate {
  title: string;
  body: string;
  uuid: string;
}

export default async function updatePost(post: PostUpdate) {
  const user = localStorage.getItem("user");
  if (!user) return;
  const { state } = JSON.parse(user);
  const res = await fetch(`https://rhoopoe.com/api/posts/${post.uuid}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.password}`
    },
    body: JSON.stringify(post)
  });
  console.log(res);
  if (res.status !== 202) {
    throw new Error("Could not update Post");
  }
}
