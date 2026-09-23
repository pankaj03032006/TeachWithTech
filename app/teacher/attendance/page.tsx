"use client";

import { useEffect, useState } from "react";

export default function AttendancePage() {

  const [classes, setClasses] = useState<string[]>([]);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});

  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const day = today.toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {

    const res = await fetch("/api/teacher/students");
    const data = await res.json();

    setClasses(data.classes || []);
  }

  async function loadStudents() {

    if (!className) {
      alert("Please select class");
      return;
    }

    if (!subject) {
      alert("Please select subject");
      return;
    }

    const res = await fetch(`/api/teacher/students?class=${className}`);
    const data = await res.json();

    setStudents(data.students || []);
  }

  function mark(studentId: string, status: string) {

  setAttendance((prev: any) => ({
    ...prev,
    [studentId]: status
  }));

}

  async function saveAttendance() {

    if (!className || !subject) {
      alert("Class and subject required");
      return;
    }
const records = students.map((s) => ({
  studentId: s._id,
  status: attendance[s._id] ?? "present"
}));

    const res = await fetch("/api/teacher/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        class: className,
        subject,
        date,
        records
      })
    });

    const data = await res.json();

    alert(data.message);
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Attendance
      </h1>

      {/* CLASS + SUBJECT SELECT */}

      <div className="flex gap-4 items-center">

        <select
          className="border p-2 rounded bg-yellow-50"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        >

          <option value="">
            Select Class
          </option>

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

          <option value="">
            Select Subject
          </option>

          <option>Math</option>
          <option>Science</option>
          <option>English</option>
          <option>Hindi</option>

        </select>


        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={loadStudents}
        >
          Load Students
        </button>

      </div>


      {/* ATTENDANCE TABLE */}

      {students.length > 0 && (

        <div className="overflow-x-auto">

          <table className="border w-full bg-yellow-50">

            <thead>

              <tr className="bg-gray-200 text-center">

                <th className="border px-4 py-3">Name</th>
                <th className="border px-4 py-3">Roll No</th>
                <th className="border px-4 py-3">Day</th>
                <th className="border px-4 py-3">Date</th>
                <th className="border px-4 py-3">Attendance</th>

              </tr>

            </thead>

            <tbody>

              {students.map((s: any) => (

                <tr key={s._id} className="text-center">

                  <td className="border px-4 py-2">
                    {s.name}
                  </td>

                  <td className="border px-4 py-2">
                    {s.rollNumber ?? "-"}
                  </td>

                  <td className="border px-4 py-2">
                    {day}
                  </td>

                  <td className="border px-4 py-2">
                    {date}
                  </td>

                  <td className="border px-4 py-2">

                    <select
                      className="border p-1"
                      value={attendance[s._id] || "present"}
                      onChange={(e) => mark(s._id, e.target.value)}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
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
          onClick={saveAttendance}
        >
          Save Attendance
        </button>

      )}

    </div>

  )

}