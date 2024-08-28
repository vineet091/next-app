"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

type PostProps = {
  params: {
    id: number;
  };
};
interface Post {
  id: number;
  title: string;
  body: string;
  views: number;
  tags: [string];
  useId: number;
}

// eslint-disable-next-line @next/next/no-async-client-component
const Post = async ({ params, searchParams }: PostProps) => {
  const { id } = params;
  const { searchid } = searchParams;// to read the search params after posts/1?searchid=1?
  // Or we can use usePathname package from navigation to get complete path only works with client components
  const pathname = usePathname(); // to read the entire path
  const searchParamsGlb = useSearchParams(); // to read the search params after ?
  console.log(pathname);
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-cache",
    // next: {
    //   revalidate: 10,// to refesh data in every 10 sec
    // },
  });

  const post: Post = await res.json();
  console.log(post);

  return (
    <div className="text-center">
      <h2 className="font-bold p-10 text-xl">{post.title}</h2>
      <div className="">{post.body}</div>
    </div>
  );
};

export default Post;
