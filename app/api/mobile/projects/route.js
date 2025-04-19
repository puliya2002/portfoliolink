// app/api/projects/route.js (add POST method to existing file)
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user from the database using session email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Assuming the field storing projects is named "projects"
    return NextResponse.json(
      {
        projects: user.project || [], // Returns an empty array if no projects exist
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

    // Check if we have an email
    let userEmail = email;

    // If no email in body, try to get from session
    if (!userEmail) {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      userEmail = session.user.email;
    }

    // Find the user
    const user = await User.findOne({ email: userEmail });

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
