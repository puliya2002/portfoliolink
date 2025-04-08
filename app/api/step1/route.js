import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export async function POST(req) {
  try {
    await connectDB(); // Connect to the database

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username} = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }


    // Update user's profile using $set
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email }, // Find user by email
      {
        $set: {
          "profile.username": username,

          currentstep: 2, // Update step
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne(
      { email: session.user.email },
      "profile.username"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        username: user.profile.username,

      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
