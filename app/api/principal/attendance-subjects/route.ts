import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const {searchParams} = new URL(req.url);
  const className = searchParams.get("class");

  const subjects = await Attendance.distinct("subject",{
    class: className
  });

  return NextResponse.json({subjects});

}