import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";



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




