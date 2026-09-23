import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const {searchParams} = new URL(req.url);

  const subject = searchParams.get("subject");
  const year = searchParams.get("year");

  const session = await getServerSession(authOptions);

  const records = await Attendance.find({
    student:session?.user.id,
    subject
  });

  const months = [
    ...new Set(
      records
        .filter(r=>new Date(r.date).getFullYear()==Number(year))
        .map(r=>new Date(r.date).getMonth()+1)
    )
  ];

  return NextResponse.json({months});

}