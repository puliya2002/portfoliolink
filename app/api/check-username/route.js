import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function GET(req) {
  try {
    await connectDB(); // Connect to the database

    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ "profile.username": username });

    if (existingUser) {
      return NextResponse.json({ available: false }, { status: 200 });
    } else {
      return NextResponse.json({ available: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
