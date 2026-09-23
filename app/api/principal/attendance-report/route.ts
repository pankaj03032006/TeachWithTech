import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

type AttendanceResult = {
  studentId: string;
  name: string;
  rollNumber: string;
  totalClasses: number;
  attended: number;
  percent: number;
};

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);

  const className = searchParams.get("class");
  const subject = searchParams.get("subject");
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month");

  if (!className || !yearParam || !monthParam) {
    return NextResponse.json({
      error: "Class, year and month required"
    });
  }

  const year = parseInt(yearParam);
  const month = parseInt(monthParam);

  /* Proper date range */

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  /* Fetch class students */

  const students = await Student.find({
    class: className
  })
    .sort({ rollNumber: 1 })
    .lean();

  /* Build attendance query */

  const query: any = {
    class: className,
    date: {
      $gte: start,
      $lte: end
    }
  };

  if (subject) {
    query.subject = subject;
  }

  const records = await Attendance.find(query).lean();

  /* Attendance map */

  const attendanceMap: Record<
    string,
    { total: number; present: number }
  > = {};

  records.forEach((r: any) => {

    const id = r.student.toString();

    if (!attendanceMap[id]) {
      attendanceMap[id] = {
        total: 0,
        present: 0
      };
    }

    attendanceMap[id].total++;

    if (r.status === "present") {
      attendanceMap[id].present++;
    }

  });

  /* Final student report */

  const result: AttendanceResult[] = students.map((s: any) => {

    const stats = attendanceMap[s._id.toString()] || {
      total: 0,
      present: 0
    };

    const percent =
      stats.total === 0
        ? 0
        : Math.round((stats.present / stats.total) * 100);

    return {
      studentId: s._id.toString(),
      name: s.name,
      rollNumber: s.rollNumber,
      totalClasses: stats.total,
      attended: stats.present,
      percent
    };

  });

  /* Highest + Lowest */

  let highest: AttendanceResult | null = null;
  let lowest: AttendanceResult | null = null;

  if (result.length > 0) {

    highest = result[0];
    lowest = result[0];

    result.forEach((r) => {

      if (highest && r.percent > highest.percent) highest = r;
      if (lowest && r.percent < lowest.percent) lowest = r;

    });

  }

  return NextResponse.json({
    records: result,
    stats: {
      highest,
      lowest
    }
  });

}