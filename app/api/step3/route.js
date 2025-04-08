import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/lib/models/user";
import connectDB from "@/lib/mongodb";


const s3Client = new S3Client({
  region: process.env.AWS_S3_REAGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

async function uploadFileToS3(fileBuffer, fileName) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}-${fileName}`, // Ensure unique filename
    Body: fileBuffer,
    ContentType: "image/jpeg", // Adjust based on the file type
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REAGION}.amazonaws.com/${params.Key}`;
;

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          "profile.picture": s3Url,
          currentstep: 4, 
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "File URL stored successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return params.Key;
}


export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    const storedFileName = await uploadFileToS3(buffer, fileName);

    return NextResponse.json({ fileName: storedFileName }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
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
      "profile.picture"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        picture: user.profile.picture,
      },
      { status: 200 }
    );
    
  } catch(error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


