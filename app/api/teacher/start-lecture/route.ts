import { connectDB } from "@/lib/db";
import Lecture from "@/models/Lecture";
import Schedule from "@/models/Schedule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getYoutubeAI } from "@/lib/aiClient";

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "teacher") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { scheduleId } = await req.json();

  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
  return NextResponse.json(
    { error: "Schedule not found" },
    { status: 404 }
  );
}

  let referenceTranscript = "";

  if (schedule.instructions?.includes("youtube")) {
    const yt = await getYoutubeAI(schedule.instructions);
    referenceTranscript = yt.text;
  } else {
    referenceTranscript = schedule.instructions || "";
  }

  const lecture = await Lecture.create({
    teacher: session.user.id,
    subject: schedule.subject,
    class: schedule.class,
    schedule: schedule._id,
    title: `${schedule.subject} Lecture`,
    startTime: new Date(),
    status: "recording",
    referenceTranscript,
  });

  return NextResponse.json({ lecture });
}