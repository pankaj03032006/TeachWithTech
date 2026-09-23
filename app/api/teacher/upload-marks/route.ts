import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req:Request){

  await connectDB();

  const session = await getServerSession(authOptions);

  if(!session || session.user.role !== "teacher"){
    return NextResponse.json({error:"Unauthorized"},{status:401});
  }

  const body = await req.json();

  const {class:className,subject,examType,maxMarks,records} = body;

  const docs=[];

  for(const r of records){

    const exists = await ExamResult.findOne({
      student:r.studentId,
      subject,
      examType
    });

    if(exists) continue;

    docs.push({

      student:r.studentId,
      teacher:session.user.id,
      class:className,
      subject,
      examType,
      marks:r.marks,
      maxMarks

    });

  }

  if(docs.length>0){
    await ExamResult.insertMany(docs);
  }

  return NextResponse.json({
    message:"Marks uploaded successfully"
  });

}