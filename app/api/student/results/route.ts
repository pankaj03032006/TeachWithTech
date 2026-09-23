import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const results = await ExamResult.find({
    student: session?.user.id
  })
  .sort({ createdAt:-1 })
  .limit(5);

  const formatted = results.map(r=>{

    const percent = Math.round(
      (r.marks/r.maxMarks)*100
    );

    return {
      _id:r._id,
      subject:r.subject,
      marks:r.marks,
      maxMarks:r.maxMarks,
      percent
    };

  });

  return NextResponse.json({
    results: formatted
  });

}