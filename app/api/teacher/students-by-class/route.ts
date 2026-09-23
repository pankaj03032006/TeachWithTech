import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);
  const className = searchParams.get("class");

  if (!className) {
    return NextResponse.json({ error: "Class required" });
  }

  const students = await Student.find({
    class: className
  }).select("name rollNo class");

  return NextResponse.json({ students });
}