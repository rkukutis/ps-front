export async function deletePost(postId: string) {
  const user = localStorage.getItem("user");
  if (!user) return false;
  const { state } = JSON.parse(user);
  const res = await fetch(`https://rhoopoe.com/api/posts/${postId}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.password}`
    }
  });
  if (res.status !== 200) {
    throw new Error("Could not delete message");
  }
}
