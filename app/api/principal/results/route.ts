import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { NextResponse } from "next/server";

export async function GET() {

  await connectDB();

  const results = await ExamResult.find()
    .populate("student","name")
    .populate("teacher","name")
    .sort({ createdAt: -1 })
    .limit(200);

  return NextResponse.json({ results });

}