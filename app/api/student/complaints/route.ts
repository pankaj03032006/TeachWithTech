import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const complaints = await Complaint.find({
    student:session?.user.id
  }).populate("teacher","name");

  return NextResponse.json({complaints});

}