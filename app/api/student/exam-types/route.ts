import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const exams = await ExamResult.distinct("examType",{
    student: session?.user.id
  });

  return NextResponse.json({exams});

}