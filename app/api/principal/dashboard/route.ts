import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import Attendance from "@/models/Attendance";
import ExamResult from "@/models/ExamResult";
import Complaint from "@/models/Complaint";

export async function GET() {

  await connectDB();

  // totals
  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();

  // attendance percentage
  const totalAttendance = await Attendance.countDocuments();
  const presentAttendance = await Attendance.countDocuments({ status: "present" });

  const attendanceRate =
    totalAttendance === 0
      ? 0
      : Math.round((presentAttendance / totalAttendance) * 100);

  // topper
  const topper = await ExamResult.findOne()
    .sort({ marks: -1 })
    .populate("student");

  // class distribution
  const students = await Student.find({}, "className");

  const classDistribution: Record<string, number> = {};

  students.forEach((s: any) => {
    const cls = s.className || "Unknown";
    classDistribution[cls] = (classDistribution[cls] || 0) + 1;
  });

  // teacher performance (based on attendance recorded)
  const teacherAttendance = await Attendance.aggregate([
    {
      $group: {
        _id: "$teacher",
        classesTaken: { $sum: 1 }
      }
    },
    { $sort: { classesTaken: -1 } },
    { $limit: 5 }
  ]);

  // complaint resolution
  const totalComplaints = await Complaint.countDocuments();
  const resolvedComplaints = await Complaint.countDocuments({
    status: "resolved"
  });

  const complaintResolution =
    totalComplaints === 0
      ? 0
      : Math.round((resolvedComplaints / totalComplaints) * 100);

  return NextResponse.json({
    totalStudents,
    totalTeachers,
    attendanceRate,
    topper: (topper?.student as any)?.name || "N/A",
    highestMarks: topper?.marks || 0,
    classDistribution,
    teacherPerformance: teacherAttendance,
    complaintResolution
  });
}