import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";

export async function PATCH(
  req:Request,
  {params}:{params:{id:string}}
){

  await connectDB();

  const body = await req.json();

  const complaint = await Complaint.findByIdAndUpdate(
    params.id,
    {
      action: body.action,
      status: body.status
    },
    {new:true}
  );

  return NextResponse.json({
    message:"Action updated",
    complaint
  });

}