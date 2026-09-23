import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const teachers = await Teacher.find()
  .select("name")
  .sort({name:1});

  return NextResponse.json({teachers});

}