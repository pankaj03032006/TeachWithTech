import { connectDB } from "@/lib/db";
import Student from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "principal") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const className = searchParams.get("class");

  const query: any = {
    principal: session.user.id,
  };

  if (className) {
    query.class = className;
  }

  const students = await Student.find(query)
    .sort({ rollNumber: 1 });

  return NextResponse.json({
    students,
  });
}