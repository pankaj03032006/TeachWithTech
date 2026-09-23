"use client";

import { useEffect,useState } from "react";

export default function ComplaintsPage(){

  const [complaints,setComplaints] = useState<any[]>([]);
  const [teachers,setTeachers] = useState<any[]>([]);

  const [type,setType] = useState("");
  const [teacher,setTeacher] = useState("");
  const [message,setMessage] = useState("");

  useEffect(()=>{
    loadComplaints();
    loadTeachers();
  },[]);

  async function loadComplaints(){

    const res = await fetch("/api/student/complaints");
    const data = await res.json();

    setComplaints(data.complaints || []);

  }

  async function loadTeachers(){

    const res = await fetch("/api/student/teachers");
    const data = await res.json();

    setTeachers(data.teachers || []);

  }

  async function submitComplaint(){

    if(!type || !message){
      alert("Select complaint type and write message");
      return;
    }

    const res = await fetch("/api/student/register-complaint",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        type,
        teacher,
        message
      })

    });

    const data = await res.json();

    alert(data.message);

    setMessage("");
    setTeacher("");

    loadComplaints();

  }

  return(

    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-yellow-100">
        Complaint Portal
      </h1>

      {/* Register Complaint */}

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Register Complaint
        </h2>

        <div className="flex gap-4 mb-4">

          <select
          className="border p-2 rounded"
          onChange={(e)=>setType(e.target.value)}
          >

            <option value="">Complaint Type</option>
            <option value="teacher">Against Teacher</option>
            <option value="meal">Mid Day Meal</option>

          </select>

          {type==="teacher" &&(

            <select
            className="border p-2 rounded"
            value={teacher}
            onChange={(e)=>setTeacher(e.target.value)}
            >

              <option value="">
                Select Teacher
              </option>

              {teachers.map((t:any)=>(
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}

            </select>

          )}

        </div>

        <textarea
        className="border p-3 w-full rounded"
        placeholder="Write complaint"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        />

        <div className="mt-4">

          <button
          onClick={submitComplaint}
          className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Complaint
          </button>

        </div>

      </div>


      {/* Complaint History */}

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">
          Complaint History
        </h2>

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>
              <th className="border p-2">Complaint</th>
              <th className="border p-2">Teacher</th>
              <th className="border p-2">Status</th>
            </tr>

          </thead>

          <tbody>

            {complaints.map((c:any)=>(

              <tr key={c._id}>

                <td className="border p-2">
                  {c.message}
                </td>

                <td className="border p-2">
                  {c.teacher?.name || "-"}
                </td>

                <td className="border p-2">

                  <span className={
                    c.status==="pending"
                    ? "text-orange-600"
                    : "text-green-600"
                  }>
                    {c.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}