import { connectDB } from "@/lib/db";
import DBT from "@/models/DBT";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const records = await DBT.find()
    .populate("student","name class")
    .sort({ date:-1 });

  return NextResponse.json({ records });

}