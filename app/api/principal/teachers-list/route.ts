import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "principal") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const teachers = await Teacher.find({
    principal: session.user.id,
    role: "teacher",
  })
  .select("_id name subjects classes");   // IMPORTANT

  return NextResponse.json({
    teachers,
  });
}