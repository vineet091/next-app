import { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "../../../../database";
import Joi from "joi";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const  BlogValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

export async function GET(req: NextApiRequest, context) {
  try {
    await connectToDB();
    let blog = null;
    const { params } = context;
    const { id } = params;
    console.log("id", id);
    if (id) {
      blog = await Blog.findById(id);
      console.log("blog", blog);
    }

    if (blog) {
      return NextResponse.json({
        success: true,
        message: "Blog Fetch Successfully!",
        data: blog,
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

// DELETE BLOG
export async function DELETE(req, context) {
  try {
    await connectToDB();
    const { params } = context;
    const { id } = params;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}

export async function PUT(req, context) {
    try {
      await connectToDB();
      const { params } = context;
      const { id } = params;
  
  
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Blog ID is required",
        });
      }
  
      const { title, description } = await req.json();
      const { error } = BlogValidator.validate({
        title,
        description,
      });
  
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
  
      const updatedBlog = await Blog.findOneAndUpdate(
        {
          _id: id,
        },
        { title, description },
        { new: true }
      );
  
      if (updatedBlog) {
        return NextResponse.json({
          success: true,
          message: "Blog is updated successfully",
          data: updatedBlog
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Something went wrong ! Please try again",
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again",
      });
    }
  }
