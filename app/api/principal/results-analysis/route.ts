import { connectDB } from "@/lib/db";
import ExamResult from "@/models/ExamResult";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  await connectDB();

  const { searchParams } = new URL(req.url);

  const className = searchParams.get("class");
  const subject = searchParams.get("subject");

  if (!className) {
    return NextResponse.json({ error: "Class required" }, { status: 400 });
  }

  /* ==================================
     MODE 1 : CLASS REPORT
  ================================== */

  if (!subject) {

    const results = await ExamResult.find({ class: className });

    if (results.length === 0) {
      return NextResponse.json({
        mode: "class",
        message: "No results found for this class",
        subjects: []
      });
    }

    const subjectMap: Record<string, number[]> = {};

    results.forEach((r: any) => {

      if (!subjectMap[r.subject]) {
        subjectMap[r.subject] = [];
      }

      subjectMap[r.subject].push(r.marks);

    });

    const subjectStats = Object.entries(subjectMap).map(
      ([sub, marks]) => {

        const avg =
          marks.reduce((a: number, b: number) => a + b, 0) /
          marks.length;

        return {
          subject: sub,
          average: avg.toFixed(2)
        };

      }
    );

    const highestSubject = subjectStats.reduce((a: any, b: any) =>
      Number(a.average) > Number(b.average) ? a : b
    );

    const lowestSubject = subjectStats.reduce((a: any, b: any) =>
      Number(a.average) < Number(b.average) ? a : b
    );

    return NextResponse.json({
      mode: "class",
      subjects: subjectStats,
      highestSubject,
      lowestSubject
    });

  }

  /* ==================================
     MODE 2 : SUBJECT REPORT
  ================================== */

  const results = await ExamResult.find({
    class: className,
    subject
  }).populate("student", "name");

  if (results.length === 0) {
    return NextResponse.json({
      mode: "subject",
      message: "No results found",
      students: []
    });
  }

  const marks = results.map((r: any) => r.marks);

  const avg =
    marks.reduce((a: number, b: number) => a + b, 0) /
    marks.length;

  const highest = results.reduce((a: any, b: any) =>
    a.marks > b.marks ? a : b
  );

  const lowest = results.reduce((a: any, b: any) =>
    a.marks < b.marks ? a : b
  );

  return NextResponse.json({

    mode: "subject",

    average: avg.toFixed(2),

    highestStudent: {
      name: (highest.student as any)?.name || "Unknown",
      marks: highest.marks
    },

    lowestStudent: {
      name: (lowest.student as any)?.name || "Unknown",
      marks: lowest.marks
    },

    students: results

  });

}