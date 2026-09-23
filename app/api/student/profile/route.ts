import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const student = await Student.findById(session?.user.id)
  .select("-password");

  return NextResponse.json(student);

}