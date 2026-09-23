import { connectDB } from "@/lib/db";
import Principal from "@/models/Principal";
import Teacher from "@/models/Teacher";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Clear old data (dev only)
    await Principal.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});

    // Create Principal
    const principal = await Principal.create({
      name: "Main Principal",
      email: "principal@test.com",
      password: "123456",
      schoolName: "Govt School",
    });

    // Create Admin
    const admin = await Teacher.create({
      name: "System Admin",
      email: "admin@test.com",
      password: "123456",
      role: "admin",
      principal: principal._id,
    });

    // Create Teacher
    const teacher = await Teacher.create({
      name: "Math Teacher",
      email: "teacher@test.com",
      password: "123456",
      subjects: ["Math"],
      classes: ["10A"],
      principal: principal._id,
    });

    // Create Student
    const student = await Student.create({
      name: "Student One",
      email: "student@test.com",
      password: "123456",
      class: "10A",
      principal: principal._id,
    });

    return NextResponse.json({
      message: "Database seeded successfully",
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
