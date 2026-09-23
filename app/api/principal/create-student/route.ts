import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "principal") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const student = await Student.create({
    ...body,
    class: body.className,
    principal: session.user.id,
  });

  return NextResponse.json({
    message: "Student created successfully",
    student,
  });
}