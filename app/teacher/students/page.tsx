"use client";

import { useEffect, useState } from "react";

export default function TeacherStudents() {

  const [classes,setClasses] = useState<string[]>([]);
  const [selectedClass,setSelectedClass] = useState("");
  const [students,setStudents] = useState<any[]>([]);

  useEffect(()=>{
    loadClasses();
  },[]);


  async function loadClasses(){

    const res = await fetch("/api/teacher/students");
    const data = await res.json();

    setClasses(data.classes || []);

  }


  async function loadStudents(className:string){

    setSelectedClass(className);

    const res = await fetch(`/api/teacher/students?class=${className}`);

    const data = await res.json();

    setStudents(data.students || []);

  }


  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Students
      </h1>


      {/* CLASS SELECT */}

      <div className="bg-yellow-50 p-6 rounded-xl w-fit">

        <label className="font-semibold mr-4">
          Select Class
        </label>

        <select
          className="border p-2 rounded"
          value={selectedClass}
          onChange={(e)=>loadStudents(e.target.value)}
        >

          <option value="">
            Choose Class
          </option>

          {classes.map((c)=>(
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>

      </div>


      {/* STUDENTS TABLE */}

      {students.length > 0 && (

      <div className="overflow-x-auto">

      <table className="border border-gray-300 w-full bg-yellow-50">

        <thead>

          <tr className="bg-gray-200">

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

          {students.map((s:any)=>(

          <tr key={s._id}>

            <td className="border px-4 py-2">{s.name}</td>
            <td className="border px-4 py-2">{s.fatherName}</td>
            <td className="border px-4 py-2">{s.rollNo}</td>
            <td className="border px-4 py-2">{s.srNumber}</td>
            <td className="border px-4 py-2">{s.email}</td>
            <td className="border px-4 py-2">{s.phone}</td>
            <td className="border px-4 py-2">{s.city}</td>
            <td className="border px-4 py-2">{s.state}</td>

          </tr>

          ))}

        </tbody>

      </table>

      </div>

      )}

    </div>
  );
}