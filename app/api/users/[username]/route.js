import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function GET(request, context) {
  try {
    await connectDB();

    // Explicitly await the params object before accessing
    const { username } = await context.params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne(
      { "profile.username": username },
      "profile stats social project setup"
    ).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { user: user.profile, stats: user.stats, social: user.social, project: user.project, setup: user.setup },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
