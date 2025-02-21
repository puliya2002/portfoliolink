// app/api/users/[username]/route.js

import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function GET(req, { params }) {
  const { username } = params;

  try {
    await connectDB();

    // Find the user by username
    const user = await User.findOne(
      { "profile.username": username },
      "profile.username email"
    ).lean();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ username: user.profile.username, email: user.email }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
