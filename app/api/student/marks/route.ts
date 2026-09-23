import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const { searchParams } = new URL(req.url);

  const examType = searchParams.get("examType");

  const session = await getServerSession(authOptions);

  const results = await ExamResult.find({
    student: session?.user.id,
    examType
  });

  const report = results.map(r=>({

    subject: r.subject,
    marks: r.marks,
    maxMarks: r.maxMarks,
    percent: ((r.marks/r.maxMarks)*100).toFixed(2)

  }));

  const totalMarks = results.reduce(
    (sum,r)=>sum+r.marks,0
  );

  const totalMax = results.reduce(
    (sum,r)=>sum+r.maxMarks,0
  );

  const overallPercent = totalMax
    ? ((totalMarks/totalMax)*100).toFixed(2)
    : 0;

  return NextResponse.json({
    report,
    overallPercent
  });

}