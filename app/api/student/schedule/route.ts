import { connectDB } from "@/lib/db";
import Schedule from "@/models/Schedule";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const student = await Student.findById(session.user.id);

  if (!student) {
    return NextResponse.json({ error: "Student not found" });
  }

  const schedules = await Schedule.find({
  class: student.class,
  isActive: true
})
.populate("teacher","name")
.sort({ startTime: 1 });

  return NextResponse.json({ schedules });

}