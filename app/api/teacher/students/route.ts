import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Teacher from "@/models/Teacher";

export async function GET(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacher = await Teacher.findById(session.user.id);

  if (!teacher) {
    return NextResponse.json({ error: "Teacher not found" });
  }

  const { searchParams } = new URL(req.url);
  const className = searchParams.get("class");

  /* if class not selected return teacher classes */

  if (!className) {
    return NextResponse.json({
      classes: teacher.classes,
      subjects: teacher.subjects

    });
  }

  /* verify teacher teaches this class */

  if (!teacher.classes.includes(className)) {
    return NextResponse.json({
      error: "You are not assigned to this class"
    });
  }

  const students = await Student.find({
  class: className
})
.select("-password")
.sort({ rollNo: 1 });

  return NextResponse.json({
    students
  });
}