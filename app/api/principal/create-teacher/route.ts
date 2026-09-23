import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teacher";
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

  const {
    name,
    email,
    password,
    subjects,
    classes,
    qualification,
    homeCity,
    homeState
  } = body;

  const teacher = await Teacher.create({
    name,
    email,
    password,
    subjects,
    classes,
    qualification,
    homeCity,
    homeState,
    joiningDate: new Date(),
    principal: session.user.id,
  });

  return NextResponse.json({
    message: "Teacher created successfully",
    teacher,
  });
}