"use client";
import React, { useEffect, useState } from "react";
import BlogList from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import AddBlog from "@/components/AddBlog";
import { ValidationError } from "joi";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/navigation";


const fetchBlogList = async () => {
  try {
    const response = await fetch("/api/blogs", {
      method: "GET",
      cache: "no-cache",
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};

interface Blog {
  _id: string;
  title: string;
  description: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
const Blogs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [editBlogId, setEdiBlogId] = useState("");
  const [blogList, setBlogList] = useState("");

  const router = useRouter();

  // const validateAddBlog = async () => {
  //   const payload = {
  //     title: "Blog 2",
  //     description: "my Second Blog",
  //   };

  //   const response = await fetch("/api/blogs", {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //   });
  //   const blog = await response.json();
  //   console.log("blog", blog);
  // };

  const handleBlogEdit = (blog) => {
    setEdiBlogId(blog?._id);
    setFormData({
      title: blog?.title,
      description: blog?.description,
    });
    setModalOpen(true);
  };

  const handleAddOrUpdateBlog = async () => {
    try {
      setLoading(true);
      const apiResponse = editBlogId
        ? await fetch(`/api/blogs/${editBlogId}`, {
            method: "PUT",
            body: JSON.stringify(formData),
          })
        : await fetch("/api/blogs", {
            method: "POST",
            body: JSON.stringify(formData),
          });
      const result = await apiResponse.json();
      if (result?.success) {
        setModalOpen(false);
        setLoading(false);
        setEdiBlogId("");
        setFormData({});
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getBlogList = async () => {
    const blogList: [Blog] = await fetchBlogList();
    setBlogList(blogList);
  };

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <div className="p-5">
      <div className="pb-4">
        <AddBlog
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          handleAddOrUpdateBlog={handleAddOrUpdateBlog}
          editBlogId={editBlogId}
        />
      </div>
 
      <BlogList blogList={blogList} handleBlogEdit={handleBlogEdit} /> 
    </div>
  );
};

export default Blogs;
