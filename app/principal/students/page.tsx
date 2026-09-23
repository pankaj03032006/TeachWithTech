"use client";

import { useEffect, useState } from "react";

export default function StudentsPage() {

  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState("");

  const classes = [
    "1","2","3","4","5","6",
    "7","8","9","10","11","12"
  ];

  useEffect(() => {

    if (selectedClass) {
      loadStudents();
    }

  }, [selectedClass]);

  async function loadStudents(){

    const res = await fetch(`/api/principal/students?class=${selectedClass}`);

    const data = await res.json();

    setStudents(data.students || []);

  }

  return (

    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-yellow-100">
        Students
      </h1>

      {/* Class Selector */}

      <div className="bg-yellow-50 p-6 rounded-lg shadow w-72">

        <label className="block mb-2 font-semibold">
          Select Class
        </label>

        <select
          className="border p-2 w-full rounded"
          onChange={(e)=>setSelectedClass(e.target.value)}
        >

          <option value="">Choose Class</option>

          {classes.map((c)=>(
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>

      </div>

      {/* Students Table */}

      {selectedClass && (

        <div className="bg-yellow-50 rounded-xl shadow-lg p-6 overflow-x-auto">

          {students.length === 0 ? (

            <p>No students found in this class.</p>

          ) : (

            <table className="min-w-full border border-gray-300 border-collapse">

              <thead className="bg-gray-200">

                <tr>

                  <th className="border px-4 py-3">Name</th>
                  <th className="border px-4 py-3">Father Name</th>
                  <th className="border px-4 py-3">Roll No</th>
                  <th className="border px-4 py-3">SR Number</th>
                  <th className="border px-4 py-3">Email</th>
                  <th className="border px-4 py-3">Phone</th>
                  <th className="border px-4 py-3">City</th>
                  <th className="border px-4 py-3">State</th>

                </tr>

              </thead>

              <tbody>

                {students.map((s,index)=>(

                  <tr
                    key={s._id}
                    className={index%2===0 ? "bg-white" : "bg-gray-50"}
                  >

                    <td className="border px-4 py-3">{s.name}</td>
                    <td className="border px-4 py-3">{s.fatherName}</td>
                    <td className="border px-4 py-3">{s.rollNumber}</td>
                    <td className="border px-4 py-3">{s.srNumber}</td>
                    <td className="border px-4 py-3 break-all">{s.email}</td>
                    <td className="border px-4 py-3">{s.phone}</td>
                    <td className="border px-4 py-3">{s.city}</td>
                    <td className="border px-4 py-3">{s.state}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      )}

    </div>

  );

}