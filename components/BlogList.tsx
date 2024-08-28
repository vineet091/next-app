"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogList = ({ blogList, handleBlogEdit }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();


  async function handleDelete(id) {
    try {
      const apiResponse = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gray-100 pl-3 pr-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList?.length > 0 ? (
          blogList.map((blogItem, index) => (
            <Card key={`blog-card-${index + 1}`} className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center">
                  <Button onClick={() => handleBlogEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDelete(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold p-3 w-full">
            No Blog found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
};

export default BlogList;
