interface Post {
  title: string;
  body: string;
}

export default async function createPost(post: Post) {
  const user = localStorage.getItem("user");
  if (!user) return;
  const { state } = JSON.parse(user);
  const res = await fetch("https://rhoopoe.com/api/posts", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.password}`
    },
    body: JSON.stringify(post)
  });
  const data = await res.json();
  console.log(data);
  // Do something with data (hottoast message?)
}
