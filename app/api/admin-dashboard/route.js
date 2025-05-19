import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.email === "admin@gmail.com") {
      const users = await User.find({});
      return NextResponse.json(users, { status: 200 });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
