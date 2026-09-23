import { connectDB } from "@/lib/db";
import Lecture from "@/models/Lecture";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const student = await Student.findById(session?.user.id);

  const lectures = await Lecture.find({
    class: student?.class,
    status: "completed"
  }).sort({ date: -1 });

  return NextResponse.json({ lectures });

}