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

    const educationId = params.educationId;
    const educationData = await req.json();

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(educationId)) {
      return NextResponse.json(
        { error: "Invalid education ID" },
        { status: 400 }
      );
    }

    // Find the user and update the specific education entry by ID
    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
        "education._id": educationId,
      },
      {
        $set: {
          "education.$": {
            _id: educationId, // Preserve the original ID
            ...educationData,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User or education entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Education updated successfully",
        education: updatedUser.education.find(
          (e) => e._id.toString() === educationId
        ),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update education error:", error);
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

    const educationId = params.educationId;

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(educationId)) {
      return NextResponse.json(
        { error: "Invalid education ID" },
        { status: 400 }
      );
    }

    // Find the user and remove the specified education entry
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $pull: {
          education: { _id: educationId },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Education deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete education error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
