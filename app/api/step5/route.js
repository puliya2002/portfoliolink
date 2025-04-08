import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { theme } = await req.json();

        const updatedUser = await User.findOneAndUpdate(
          { email: session.user.email },
          {
            $set: {
              theme: theme,
              currentstep: 6,
              completed: true,
            },
          },
          { new: true }
        );
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(
          { message: "Profile updated", user: updatedUser },
          { status: 200 }
        );

    }
    catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findOne(
            { email: session.user.email },
            "theme"
        );
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(
            {
                theme: user.theme,
                
                
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}