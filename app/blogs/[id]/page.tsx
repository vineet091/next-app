"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

type BlogProps = {
  params: {
    id: number;
  };
};
interface BlogI {
  _id: number;
  title: string;
  description: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
const BlogPage = async ({ params }: BlogProps) => {
  const { id } = params;
  let blog: [BlogI] = null;
  const response = await fetch(`/api/blogs/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await response.json();
  blog = result.data;
  console.log(blog);

  return (
    <div className="text-center">
      <h2 className="font-bold p-10 text-xl">{blog?.title}</h2>
      <div className="">{blog.description}</div>
    </div>
  );
};

export default BlogPage;
