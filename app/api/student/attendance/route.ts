import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req:Request){

  await connectDB();

  const { searchParams } = new URL(req.url);

  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const subject = searchParams.get("subject");

  const session = await getServerSession(authOptions);

  if(!session){
    return NextResponse.json({error:"Unauthorized"});
  }

  const start = new Date(`${year}-${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth()+1);

  const records = await Attendance.find({

    student: session.user.id,
    subject,
    date:{
      $gte:start,
      $lt:end
    }

  }).sort({date:1});

  const total = records.length;

  const present = records.filter(
    r=>r.status==="present"
  ).length;

  const percent = total
    ? ((present/total)*100).toFixed(2)
    : 0;

  return NextResponse.json({
    records,
    total,
    present,
    percent
  });

}