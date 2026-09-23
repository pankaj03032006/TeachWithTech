import { connectDB } from "@/lib/db";
import DBT from "@/models/DBT";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const session = await getServerSession(authOptions);

  const records = await DBT.find({
    student:session?.user.id
  });

  return NextResponse.json({records});

}