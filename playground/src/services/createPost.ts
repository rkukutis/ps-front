interface Post {
  title: string;
  author: string;
  date: string;
  body: string;
}

export default async function createPost(post: Post) {
  const res = await fetch("API POST PUT ENDPOINT", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  const data = await res.json();
  // Do something with data (hottoast message?)
}
