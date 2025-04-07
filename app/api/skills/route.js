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
    const { skills } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $push: { skills: skills },
      },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Skills added", user: updatedUser.skills },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add skills error:", error);
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
    const user = await User.findOne({ email: session.user.email }, "skills");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        skills: user.skills,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch skills error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
