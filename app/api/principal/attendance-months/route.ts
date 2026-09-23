import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const {searchParams} = new URL(req.url);

  const className = searchParams.get("class");
  const year = Number(searchParams.get("year"));

  const records = await Attendance.find({
    class: className
  });

  const months = [
    ...new Set(
      records
        .filter(r => new Date(r.date).getFullYear() === year)
        .map(r => new Date(r.date).getMonth())
    )
  ];

  return NextResponse.json({months});

}