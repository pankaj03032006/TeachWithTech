import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req:Request){

  await connectDB();

  const session = await getServerSession(authOptions);

  if(!session || session.user.role !== "teacher"){
    return NextResponse.json({error:"Unauthorized"});
  }

  const body = await req.json();

  if(!body.message || body.message.length>100){
    return NextResponse.json({
      error:"Complaint must be under 100 words"
    });
  }

  const complaint = await Complaint.create({

    fromRole:"teacher",
    student:body.studentId,
    teacher:session.user.id,
    message:body.message

  });

  return NextResponse.json({
    message:"Complaint registered successfully",
    complaint
  });

}