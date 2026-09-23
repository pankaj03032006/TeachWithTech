"use client";

import { useEffect, useState } from "react";

export default function ComplaintsPage(){

  const [teacherComplaints,setTeacherComplaints] = useState<any[]>([]);
  const [studentComplaints,setStudentComplaints] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadComplaints();
  },[]);

  async function loadComplaints(){

    const res = await fetch("/api/principal/complaints");
    const data = await res.json();

    const teacher = data.complaints.filter(
      (c:any)=>c.fromRole==="teacher"
    );

    const student = data.complaints.filter(
      (c:any)=>c.fromRole==="student"
    );

    setTeacherComplaints(teacher);
    setStudentComplaints(student);

    setLoading(false);

  }

  async function resolveComplaint(id:string){

    const action = prompt("Enter action taken by principal");

    if(!action) return;

    await fetch(`/api/principal/complaints/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        action,
        status:"resolved"
      })
    });

    loadComplaints();
  }

  if(loading){
    return <p className="text-white">Loading complaints...</p>;
  }

  return(

    <div className="space-y-10">

      <h1 className="text-3xl font-bold text-yellow-100">
        Complaint Management
      </h1>


      {/* ===============================
         Teacher → Student Complaints
      =============================== */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">
          Teacher → Student Complaints
        </h2>

        {teacherComplaints.length===0 &&(
          <p className="text-gray-500">No complaints</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {teacherComplaints.map((c:any)=>(

            <div
              key={c._id}
              className="border rounded-lg p-4 space-y-2"
            >

              <p>
                <b>Teacher:</b> {c.teacher?.name}
              </p>

              <p>
                <b>Student:</b> {c.student?.name}
              </p>

              <p>
                <b>Complaint:</b> {c.message}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    c.status==="pending"
                    ? "text-orange-600 font-semibold"
                    : "text-green-600 font-semibold"
                  }
                >
                  {c.status}
                </span>
              </p>

              {c.action &&(

                <p>
                  <b>Action:</b> {c.action}
                </p>

              )}

              {c.status==="pending" &&(

                <button
                  onClick={()=>resolveComplaint(c._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
                >
                  Take Action
                </button>

              )}

            </div>

          ))}

        </div>

      </div>


      {/* ===============================
         Student → Teacher Complaints
      =============================== */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">
          Student → Teacher Complaints
        </h2>

        {studentComplaints.length===0 &&(
          <p className="text-gray-500">No complaints</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          {studentComplaints.map((c:any)=>(

            <div
              key={c._id}
              className="border rounded-lg p-4 space-y-2"
            >

              <p>
                <b>Student:</b> {c.student?.name}
              </p>

              <p>
                <b>Teacher:</b> {c.teacher?.name}
              </p>

              <p>
                <b>Complaint:</b> {c.message}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    c.status==="pending"
                    ? "text-orange-600 font-semibold"
                    : "text-green-600 font-semibold"
                  }
                >
                  {c.status}
                </span>
              </p>

              {c.action &&(

                <p>
                  <b>Action:</b> {c.action}
                </p>

              )}

              {c.status==="pending" &&(

                <button
                  onClick={()=>resolveComplaint(c._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
                >
                  Take Action
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}