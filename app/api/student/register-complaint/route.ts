import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req:Request){

  await connectDB();

  const session = await getServerSession(authOptions);

  if(!session){
    return NextResponse.json({error:"Unauthorized"});
  }

  const body = await req.json();

  const complaint = await Complaint.create({

    fromRole:"student",
    type:body.type,
    student:session.user.id,
    teacher:body.teacher || null,
    message:body.message

  });

  return NextResponse.json({
    message:"Complaint submitted successfully",
    complaint
  });

}