import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  if(!session || session.user.role !== "principal"){
    return NextResponse.json(
      {error:"Unauthorized"},
      {status:401}
    );
  }

  const complaints = await Complaint.find()
    .populate("student","name rollNumber")
    .populate("teacher","name")
    .sort({createdAt:-1});

  return NextResponse.json({complaints});

}