import { NextRequest, NextResponse } from "next/server";
import connectToDB from "../../../database";
import Joi from "joi";
import Blog from "@/models/blog";

