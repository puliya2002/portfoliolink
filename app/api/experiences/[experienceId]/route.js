import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experienceId = params.experienceId;
    const experienceData = await req.json();

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return NextResponse.json(
        { error: "Invalid experience ID" },
        { status: 400 }
      );
    }

    // Find the user and update the specific experience by ID
    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
        "experience._id": experienceId,
      },
      {
        $set: {
          "experience.$": {
            _id: experienceId, // Preserve the original ID
            ...experienceData,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User or experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Experience updated successfully",
        experience: updatedUser.experience.find(
          (e) => e._id.toString() === experienceId
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update experience error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const experienceId = params.experienceId;

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return NextResponse.json(
        { error: "Invalid experience ID" },
        { status: 400 }
      );
    }

    // Find the user and remove the specified experience
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $pull: {
          experience: { _id: experienceId },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Experience deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete experience error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
