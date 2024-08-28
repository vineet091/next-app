
import Link from "next/link";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic"; //rendor component and all child component dynamic at runtime 

interface Post {
  id: number;
  title: string;
  body: string;
  views: number;
  useId: number;
}

const Posts = async () => {
  setTimeout(async () => {
  }, 2000);

  const res = await fetch("https://dummyjson.com/posts?limit=20", {
    cache: "no-cache",
    // next: {
    //   revalidate: 10,// to refesh data in every 10 sec
    // },
  });
  const postsRes = await res.json();
  const posts: [Post] = postsRes?.posts || [];

  return (
    <div>
      <Suspense fallback="Loading....">
        <table className="table table-bordered border-black">
          <thead>
            <tr>
              <th className="text-red-500 font-bold text-xl">Posts</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={`${post.id}`}>
                <td>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
};

export default Posts;
