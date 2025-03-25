import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { profile } from "console";
export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne(
      { email: session.user.email },
      "currentstep completed profile setup"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        currentstep: user.currentstep,
        completed: user.completed,
        profile: user.profile,
        setup: user.setup,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
