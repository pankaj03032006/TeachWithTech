import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const {searchParams} = new URL(req.url);

  const subject = searchParams.get("subject");

  const session = await getServerSession(authOptions);

  const records = await Attendance.find({
    student:session?.user.id,
    subject
  });

  const years = [
    ...new Set(
      records.map(r=>new Date(r.date).getFullYear())
    )
  ];

  return NextResponse.json({years});

}