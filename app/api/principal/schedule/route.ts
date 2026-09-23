import { connectDB } from "@/lib/db";
import Schedule from "@/models/Schedule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "principal") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const schedules = await Schedule.find()
    .populate("teacher","name")
    .sort({ day:1,startTime:1 });

  return NextResponse.json({ schedules });

}