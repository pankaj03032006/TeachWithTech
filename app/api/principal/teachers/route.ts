import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Teacher from "@/models/Teacher";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);
  const className = searchParams.get("class");

  let query:any = {};

  if(className){
    query.classes = className;
  }

  const teachers = await Teacher.find(query);

  return NextResponse.json({ teachers });

}