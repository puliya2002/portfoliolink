// app/api/mobile/projects/route.js
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    // Get email from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user's projects
    return NextResponse.json(
      {
        project: user.project || [], // Note the field name matches your database
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    // Get request body
    const projectData = await request.json();
    const { email, ...project } = projectData;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new project to the user's projects array
    user.project.push(project);
    await user.save();

    // Return the newly created project
    const newProject = user.project[user.project.length - 1];

    return NextResponse.json(
      {
        message: "Project added successfully",
        project: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add project error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
