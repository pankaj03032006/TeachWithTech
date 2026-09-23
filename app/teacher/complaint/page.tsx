"use client";

import { useEffect, useState } from "react";

export default function TeacherComplaint(){

  const [classes,setClasses] = useState<string[]>([]);
  const [className,setClassName] = useState("");
  const [students,setStudents] = useState<any[]>([]);
  const [studentId,setStudentId] = useState("");
  const [message,setMessage] = useState("");

  useEffect(()=>{
    loadClasses();
  },[]);

  async function loadClasses(){

    const res = await fetch("/api/teacher/students");
    const data = await res.json();

    setClasses(data.classes || []);

  }

  async function loadStudents(){

    if(!className){
      alert("Select class first");
      return;
    }

    const res = await fetch(`/api/teacher/students?class=${className}`);
    const data = await res.json();

    setStudents(data.students || []);

  }

  async function submit(e:any){

    e.preventDefault();

    if(!studentId){
      alert("Select student");
      return;
    }

    if(message.length>100){
      alert("Complaint must be under 100 words");
      return;
    }

    const res = await fetch("/api/teacher/complaint",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        studentId,
        message
      })
    });

    const data = await res.json();

    alert(data.message);

    setMessage("");
    setStudentId("");

  }

  const selectedStudent = students.find((s)=>s._id===studentId);

  return(

    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-yellow-100">
        Register Student Complaint
      </h1>


      {/* CLASS SELECT */}

      <div className="flex gap-4">

        <select
        className="border p-2 rounded bg-yellow-50"
        onChange={(e)=>setClassName(e.target.value)}
        >

          <option value="">Select Class</option>

          {classes.map((c)=>(
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>

        <button
        className="bg-blue-400 text-white px-4 py-2 rounded"
        onClick={loadStudents}
        >
          Load Students
        </button>

      </div>


      {/* STUDENT SELECT */}

      {students.length>0 &&(

      <div className="flex gap-4">

        <select
        className="border p-2 rounded bg-yellow-50"
        value={studentId}
        onChange={(e)=>setStudentId(e.target.value)}
        >

          <option value="">Select Student</option>

          {students.map((s)=>(
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}

        </select>

        <input
        className="border p-2 rounded bg-yellow-50"
        value={selectedStudent?.rollNumber || ""}
        placeholder="Roll Number"
        readOnly
        />

      </div>

      )}


      {/* COMPLAINT BOX */}

      {studentId &&(

      <form onSubmit={submit} className="space-y-4">

        <textarea
        className="border p-3 w-full h-28 rounded bg-yellow-50"
        placeholder="Write complaint (max 100 words)"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        />

        <div className="text-center">

          <button
          className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Register Complaint
          </button>

        </div>

      </form>

      )}

    </div>

  )

}