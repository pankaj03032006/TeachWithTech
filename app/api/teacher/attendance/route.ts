import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const body = await req.json();

  const { records, date, class: className, subject } = body;

  if (!className || !subject) {
    return NextResponse.json({
      error: "Class and subject are required"
    });
  }

  const docs = [];

  for (const r of records) {

    const exists = await Attendance.findOne({
      student: r.studentId,
      class: className,
      subject,
      date: new Date(date)
    });

    if (exists) continue;

    docs.push({
      student: r.studentId,
      teacher: session.user.id,
      class: className,
      subject,
      date: new Date(date),
      status: r.status
    });

  }

  if (docs.length > 0) {
    await Attendance.insertMany(docs);
  }

  return NextResponse.json({
    message: "Attendance saved successfully"
  });

}