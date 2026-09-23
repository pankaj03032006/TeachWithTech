"use client";

import { useEffect, useState } from "react";

export default function TeachersPage() {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState("");

  const classes = [
    "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "10", "11", "12"
  ];

  useEffect(() => {
    if (selectedClass) {
      loadTeachers();
    }
  }, [selectedClass]);

  async function loadTeachers() {

    const res = await fetch(`/api/principal/teachers?class=${selectedClass}`);

    const data = await res.json();

    setTeachers(data.teachers || []);

  }

  function calculateService(joiningDate: string) {

    if (!joiningDate) return "N/A";

    const join = new Date(joiningDate);
    const now = new Date();

    const months =
      (now.getFullYear() - join.getFullYear()) * 12 +
      (now.getMonth() - join.getMonth());

    return months;

  }

  return (

    <div className="space-y-8">

      <h1 className="text-3xl text-yellow-100 font-bold">
        Teachers
      </h1>

      {/* Class Selector */}

      <div className="bg-yellow-50 p-6 rounded-lg shadow w-72">

        <label className="block mb-2 font-semibold">
          Select Class
        </label>

        <select
          className="border p-2 w-full rounded"
          onChange={(e) => setSelectedClass(e.target.value)}
        >

          <option value="">Choose Class</option>

          {classes.map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>

      </div>

      {/* Teachers Table */}

      {selectedClass && (

        <div className="bg-yellow-50 rounded-xl shadow-lg p-6 overflow-x-auto">

  {teachers.length === 0 ? (

    <p className="text-gray-700">No teachers assigned to this class.</p>

  ) : (

    <table className="min-w-full border border-gray-300 border-collapse">

      <thead className="bg-gray-200">

        <tr>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Name</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Email</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Qualification</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Joining Date</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Months of Service</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Home City</th>

          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Home State</th>

        </tr>

      </thead>

      <tbody>

        {teachers.map((t, index) => (

          <tr
            key={t._id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >

            <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
              {t.name}
            </td>

            <td className="border border-gray-300 px-4 py-3 break-all">
              {t.email}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              {t.subjects?.join(", ")}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              {t.qualification || "N/A"}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              {t.joiningDate
                ? new Date(t.joiningDate).toLocaleDateString()
                : "N/A"}
            </td>

            <td className="border border-gray-300 px-4 py-3 text-center">
              {calculateService(t.joiningDate)}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              {t.homeCity || "N/A"}
            </td>

            <td className="border border-gray-300 px-4 py-3">
              {t.homeState || "N/A"}
            </td>

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