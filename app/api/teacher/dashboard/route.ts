import { connectDB } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

import Schedule from "@/models/Schedule"
import Attendance from "@/models/Attendance"
import Complaint from "@/models/Complaint"
import Lecture from "@/models/Lecture"

export async function GET() {

  await connectDB()

  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const teacherId = new mongoose.Types.ObjectId(session.user.id)

  const today = new Date().toLocaleDateString("en-US",{ weekday:"long" })

  /* ========================
     CLASSES TODAY
  ======================== */

  const classesToday = await Schedule.countDocuments({
    teacher: teacherId,
    day: today,
    isActive: true
  })

  /* ========================
     ATTENDANCE TODAY
  ======================== */

  const start = new Date()
  start.setHours(0,0,0,0)

  const end = new Date()
  end.setHours(23,59,59,999)

  const attendanceToday = await Attendance.countDocuments({
    teacher: teacherId,
    date: { $gte: start, $lte: end }
  })

  /* ========================
     COMPLAINTS
  ======================== */

  const complaints = await Complaint.countDocuments({
    teacher: teacherId,
    status: "pending"
  })

  /* ========================
     NEXT CLASS
  ======================== */

  const nextClass = await Schedule.findOne({
    teacher: teacherId,
    day: today,
    isActive: true
  }).sort({ startTime: 1 })

  /* ========================
     PERFORMANCE GRAPH
  ======================== */

  const lectures = await Lecture.find({
    teacher: teacherId,
    status: "analyzed"
  }).sort({ createdAt: 1 })

  const performance = lectures.map(l => ({
    date: new Date(l.createdAt).toLocaleDateString(),
    score: l.analysis?.matchPercentage || 0
  }))

  /* ========================
     CLASS DISTRIBUTION
  ======================== */

  const distribution = await Schedule.aggregate([
    { $match: { teacher: teacherId } },
    {
      $group: {
        _id: "$class",
        count: { $sum: 1 }
      }
    }
  ])

  const classDistribution = distribution.map(d => ({
    name: "Class " + d._id,
    value: d.count
  }))

  /* ========================
     AI SCORE (TEMP)
  ======================== */

  const avgScore =
    performance.length === 0
      ? 0
      : Math.round(
          performance.reduce((a,b)=>a+b.score,0) / performance.length
        )

  return NextResponse.json({
    stats:{
      classesToday,
      complaints,
      attendanceToday
    },
    performance,
    classDistribution,
    nextClass,
    aiScore: avgScore
  })
}