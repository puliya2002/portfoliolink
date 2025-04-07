import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    await connectDB();


    const user = await User.findOne(
      { email: "vidmalpulindu2@gmail.com" },
      "profile social stats"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        profile: user.profile,
        social: user.social,
        stats: user.stats,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
