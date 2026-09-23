import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const {searchParams} = new URL(req.url);
  const className = searchParams.get("class");

  const records = await Attendance.find({
    class: className
  });

  const years = [
    ...new Set(
      records.map(r => new Date(r.date).getFullYear())
    )
  ];

  return NextResponse.json({years});

}