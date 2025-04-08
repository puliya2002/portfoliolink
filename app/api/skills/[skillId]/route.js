import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skillId = params.skillId;
    const skillData = await req.json();

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
    }

    // Find the user and update the specific skill by ID
    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
        "skills._id": skillId,
      },
      {
        $set: {
          "skills.$": {
            _id: skillId, // Preserve the original ID
            ...skillData,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User or skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Skill updated successfully",
        skill: updatedUser.skills.find((s) => s._id.toString() === skillId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update skill error:", error);
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

    const skillId = params.skillId;

    // Validate objectId
    if (!mongoose.Types.ObjectId.isValid(skillId)) {
      return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
    }

    // Find the user and remove the specified skill
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $pull: {
          skills: { _id: skillId },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Skill deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete skill error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
