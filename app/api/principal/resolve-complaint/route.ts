import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";

export async function POST(req:Request){

  await connectDB();

  const body = await req.json();

  const { id, action } = body;

  await Complaint.findByIdAndUpdate(id,{
    status:"resolved",
    action
  });

  return NextResponse.json({
    message:"Complaint resolved"
  });

}