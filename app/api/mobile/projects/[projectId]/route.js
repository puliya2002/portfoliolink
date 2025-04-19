// app/api/mobile/projects/[projectId]/route.js
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const projectId = params.projectId;

    // Get email from request body
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the project in the user's projects array
    const projectIndex = user.project.findIndex(
      (p) => p._id.toString() === projectId
    );

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Remove the project from the array
    user.project.splice(projectIndex, 1);

    // Save the updated user document
    await user.save();

    return NextResponse.json(
      {
        message: "Project deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
