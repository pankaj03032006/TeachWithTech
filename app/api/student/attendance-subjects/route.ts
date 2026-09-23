import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const subjects = await Attendance.distinct(
    "subject",
    { student: session?.user.id }
  );

  return NextResponse.json({subjects});

}