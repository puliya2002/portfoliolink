// app/api/experiences/route.js - GET and POST handlers

import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { experience } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $push: { experience: experience }, // Using education instead of experience
      },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Experience added", user: updatedUser.experience },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add experience error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne(
      { email: session.user.email },
      "experience"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        experience: user.experience,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch experiences error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

