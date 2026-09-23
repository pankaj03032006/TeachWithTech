import { connectDB } from "@/lib/db";
import Schedule from "@/models/Schedule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "principal") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const {
  teacher,
  class: className,
  subject,
  day,
  startTime,
  endTime,
  room,
  topic,
  instructions
} = body;
  /* ======================
     Time Conflict Logic
  ====================== */

  const teacherConflict = await Schedule.findOne({
    teacher,
    day,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  if (teacherConflict) {
    return NextResponse.json({
      error: "Teacher already has another class during this time"
    });
  }

  const classConflict = await Schedule.findOne({
    class: className,
    day,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  if (classConflict) {
    return NextResponse.json({
      error: "This class already has another subject during this time"
    });
  }

  const schedule = await Schedule.create({
  teacher,
  class: className,
  subject,
  day,
  startTime,
  endTime,
  room,
  topic,
  instructions
});

  return NextResponse.json({
    message: "Schedule created successfully",
    schedule
  });
}