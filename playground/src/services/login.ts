interface LoginDetails {
  username: string;
  password: string;
}

export default async function ({ username, password }: LoginDetails): Promise<boolean> {
  if (username !== "rhoopoe") return false;
  const res = await fetch("https://rhoopoe.com/api/posts", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer"
  });
  if (res.status == 200) {
    return true;
  } else {
    return false;
  }
}
