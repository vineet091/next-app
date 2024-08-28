'use client'
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from 'next/navigation';



export default function Home() {

  const router = useRouter() // only works with cleint components

  const redirectToPost = () => {
    router.push('/posts')
  }
  return (
    <main>
      <div>Home Page</div>
      <Link href="/users">Users</Link>
      <br />
      <Link href="/products">Products</Link>
      <br />
      {/* Aletrnate to Link */}
      <button onClick={redirectToPost}>Posts</button>
      <br />
      <Link href="/blogs">Blogs</Link>
    </main>
  );
}
