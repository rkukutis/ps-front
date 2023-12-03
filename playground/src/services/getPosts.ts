import { Post } from "../components/blog-feature/BlogPost";

export interface GetPostsResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
}

export default async function getPosts(): Promise<GetPostsResponse> {
  const res = await fetch("https://rhoopoe.com/api/posts?limit=15", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ateitiesprofesionalai"
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer"
  });
  const data = await res.json();
  return data;
}

/*
{
  "content": [
    {
      "uuid": "7241b656-e16d-4cd5-9f1e-c3233c00c1be",
      "title": "test post 1",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE1",
      "createdAt": "2023-12-03T11:49:56.044+00:00"
    },
    {
      "uuid": "c317be62-a79d-4b1c-ab0d-b8f06d229d22",
      "title": "test post 2",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE2",
      "createdAt": "2023-12-03T11:49:56.205+00:00"
    },
    {
      "uuid": "6fbd0f89-0f68-4071-849a-7f769dae01b4",
      "title": "test post 3",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE3",
      "createdAt": "2023-12-03T11:49:56.214+00:00"
    },
    {
      "uuid": "6b8bcec0-4e84-4d66-971d-42c9ca9e02fc",
      "title": "test post 1",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE1",
      "createdAt": "2023-12-03T11:51:45.117+00:00"
    },
    {
      "uuid": "843aac56-f92a-4413-bd41-73f11df7d984",
      "title": "test post 2",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE2",
      "createdAt": "2023-12-03T11:51:45.245+00:00"
    },
    {
      "uuid": "ea1e44c7-d5a0-4e11-80ef-39d1abe8cc76",
      "title": "test post 3",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE3",
      "createdAt": "2023-12-03T11:51:45.254+00:00"
    },
    {
      "uuid": "d5325392-ad3b-435e-9a93-fc741d896c74",
      "title": "test post 1",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE1",
      "createdAt": "2023-12-03T11:52:30.617+00:00"
    },
    {
      "uuid": "dfd8de19-0ac9-42b1-be93-239c507b757f",
      "title": "test post 2",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE2",
      "createdAt": "2023-12-03T11:52:30.756+00:00"
    },
    {
      "uuid": "68890744-3c55-4e7e-a18f-46f23e57529a",
      "title": "test post 3",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE3",
      "createdAt": "2023-12-03T11:52:30.765+00:00"
    },
    {
      "uuid": "f620237d-dedc-40d7-b2a8-9601f3a37e3b",
      "title": "test post 1",
      "body": "LOREM IPSUM",
      "imageUrl": "IMAGE1",
      "createdAt": "2023-12-03T11:53:34.531+00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "sorted": false,
      "empty": true,
      "unsorted": true
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "last": false,
  "totalPages": 2,
  "totalElements": 13,
  "size": 10,
  "number": 0,
  "sort": {
    "sorted": false,
    "empty": true,
    "unsorted": true
  },
  "first": true,
  "numberOfElements": 10,
  "empty": false
}
*/
