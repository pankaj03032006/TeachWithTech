import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const data = body.records.map((r:any)=>({
    student: r.studentId,
    teacher: session.user.id,
    subject: body.subject,
    examType: body.examType,
    marks: r.marks,
    maxMarks: body.maxMarks
  }));

  await ExamResult.insertMany(data);

  return NextResponse.json({
    message:"Marks saved successfully"
  });

}