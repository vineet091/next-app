"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function fetchUserList(params) {
  try {
    const response = await fetch("https://dummyjson.com/users", {
      cache: "force-cache",
    });
    const result = await response.json();
    return result.users;
  } catch (err) {
    throw new Error(err);
  }
}

//add new user action                      // /users
export async function addUserAction(payload, pathToRevalidate) {
  await connectToDB();
  try {
    // validate data using joi/ other packages you can use
    const user = await User.findOne({ email: payload.email });
    if (user) {
      return {
        success: true,
        message: "User already exists with that email",
      };
    }
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    const newlyCreatedUser = await User.create({
      ...payload,
      password: hashedPassword,
    });
    console.log(newlyCreatedUser, "newlyCreatedUser");
    if (newlyCreatedUser) {
      // revalidatePath(pathToRevalidate); // it will refresh the page
      return {
        success: true,
        message: "User added successfully",
        data: JSON.parse(JSON.stringify(newlyCreatedUser)),
      };
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: error.message,
      status: 400,
    };
    // throw new Error(error.message);
  }
}

// fetch user list
export async function fetchUsersAction() {
  await connectToDB();
  try {
    const listOfUsers = await User.find({});
    if (listOfUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUsers)),
      };
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Some error occured! Please try again",
      },
      {
        status: 400,
      }
    );
  }
}

// edit a user action
export async function editUserAction(
  currentUserID,
  formData,
  pathToRevalidate
) {
  await connectToDB();

  try {
    const { firstName, lastName, email, address } = formData;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: currentUserID,
      },
      { firstName, email, lastName, address },
      { new: true }
    );
    if (updatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able to update the user! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured! Please try again",
    };
  }
}

// delete a user action

export async function deleteUserAction(currentUserID, pathToRevalidate) {
  await connectToDB();
  try {
    const deletedUser = await User.findByIdAndDelete(currentUserID);

    if (deletedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able perform delete operation! Please try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occured! Please try again",
    };
  }
}

export async function signinUser(payload, pathToRevalidate) {
  try {
    await connectToDB();
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return {
        success: false,
        message: "User does not exists with that email",
      };
    }
    const doMatch = await bcrypt.compare(payload.password, user.password);
    if (!doMatch) {
      return {
        success: false,
        message: "email or password in invalid",
      };
    }
    user.lastSignInAt = new Date();
    await user.save();
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.firstName },
      "SECRET_12345",
      {
        expiresIn: "1d",
      }
    );
    const getCookies = cookies();
    getCookies.set("token", token);
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "User loggedIn successfully",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}
