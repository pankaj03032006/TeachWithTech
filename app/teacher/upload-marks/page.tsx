"use client";

import { useEffect, useState } from "react";

export default function UploadMarks() {

  const [classes, setClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");

  const [students, setStudents] = useState<any[]>([]);
  const [marks, setMarks] = useState<any>({});
  const [maxMarks, setMaxMarks] = useState(100);

  useEffect(() => {
    loadTeacherData();
  }, []);

  async function loadTeacherData() {

    const res = await fetch("/api/teacher/students");
    const data = await res.json();

    setClasses(data.classes || []);
    setSubjects(data.subjects || []);

  }

  async function loadStudents() {

    if (!className || !subject) {
      alert("Select class and subject");
      return;
    }

    const res = await fetch(`/api/teacher/students?class=${className}`);
    const data = await res.json();

    setStudents(data.students || []);

  }

  function setStudentMarks(studentId: string, value: string) {

    setMarks((prev: any) => ({
      ...prev,
      [studentId]: Number(value)
    }));

  }

  async function saveMarks() {

    const records = students.map((s) => ({
      studentId: s._id,
      marks: marks[s._id] ?? 0
    }));

    const res = await fetch("/api/teacher/upload-marks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        class: className,
        subject,
        examType,
        maxMarks,
        records
      })
    });

    const data = await res.json();

    alert(data.message);

  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Upload Marks
      </h1>

      {/* CONTROLS */}

      <div className="flex gap-4">

        <select
          className="border p-2 rounded bg-yellow-50"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        >

          <option value="">Select Class</option>

          {classes.map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>


        <select
          className="border p-2 rounded bg-yellow-50"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >

          <option value="">Select Subject</option>

          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}

        </select>


        <input
          className="border p-2 rounded bg-yellow-50"
          placeholder="Exam Type (UT1 / Midterm)"
          onChange={(e) => setExamType(e.target.value)}
        />


        <button
          className="bg-blue-400 text-white px-4 py-2 rounded"
          onClick={loadStudents}
        >
          Load Students
        </button>

      </div>


      {/* MARKS TABLE */}

      {students.length > 0 && (

        <div className="overflow-x-auto">

          <table className="border w-full bg-yellow-50">

            <thead>

              <tr className="bg-gray-200 text-center">
                <th className="border px-4 py-3">Student's Name</th>
                <th className="border px-4 py-3">Roll Number</th>

                <th className="border px-4 py-3">Obtained Marks</th>
                <th className="border px-4 py-3">Max Marks</th>

              </tr>

            </thead>

            <tbody>

              {students.map((s: any) => (

                <tr key={s._id} className="text-center">

                  <td className="border px-4 py-2">
                    {s.name}
                  </td>
                  <td className="border px-4 py-2">
                    {s.rollNumber}
                  </td>



                  <td className="border px-4 py-2">

                    <input
                      type="number"
                      className="border p-1 w-20"
                      onChange={(e) => setStudentMarks(s._id, e.target.value)}
                    />

                  </td>

                  <td className="border px-4 py-2">
                    {maxMarks}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {students.length > 0 && (

        <button
          className="bg-green-600 text-white px-6 py-2 rounded"
          onClick={saveMarks}
        >
          Save Marks
        </button>

      )}

    </div>

  )

}