import { NextRequest, NextResponse } from "next/server";
import connectToDB from "../../../database";
import Joi from "joi";
import Blog from "@/models/blog";

const AddBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
// GET BLOG LIST
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams?.get("id");
    console.log("searchParams", id);
    const blogList = await Blog.find({});
    if (blogList) {
      return NextResponse.json({
        success: true,
        message: "Blog fetch Successfully!",
        data: blogList,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please try again!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
// ADD BLOG
export async function POST(req) {
  try {
    await connectToDB();
    const payload = await req.json();
    const { title, description } = payload;
    const { error } = AddBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const blog = await Blog.create(payload);
    if (blog) {
      return NextResponse.json({
        success: true,
        message: "Blog Added Successfully!",
        data: blog,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please try again!",
      });
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

