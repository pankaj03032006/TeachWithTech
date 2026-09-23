"use client";

import { useEffect,useState } from "react";

export default function AttendancePage(){

  const [subjects,setSubjects] = useState<string[]>([]);
  const [years,setYears] = useState<number[]>([]);
  const [months,setMonths] = useState<number[]>([]);

  const [subject,setSubject] = useState("");
  const [year,setYear] = useState("");
  const [month,setMonth] = useState("");

  const [data,setData] = useState<any>(null);

  useEffect(()=>{
    loadSubjects();
  },[]);

  async function loadSubjects(){

    const res = await fetch("/api/student/attendance-subjects");
    const data = await res.json();

    setSubjects(data.subjects);

  }

  async function loadYears(sub:string){

    const res = await fetch(`/api/student/attendance-years?subject=${sub}`);
    const data = await res.json();

    setYears(data.years);

  }

  async function loadMonths(sub:string,yr:string){

    const res = await fetch(`/api/student/attendance-months?subject=${sub}&year=${yr}`);
    const data = await res.json();

    setMonths(data.months);

  }

  async function loadAttendance(){

    const res = await fetch(
      `/api/student/attendance?year=${year}&month=${month}&subject=${subject}`
    );

    const result = await res.json();

    setData(result);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Attendance
      </h1>

      <div className="flex gap-4">

        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>{
            setSubject(e.target.value);
            loadYears(e.target.value);
          }}
        >
          <option>Select Subject</option>

          {subjects.map(s=>(
            <option key={s} value={s}>{s}</option>
          ))}

        </select>


        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>{
            setYear(e.target.value);
            loadMonths(subject,e.target.value);
          }}
        >
          <option>Select Year</option>

          {years.map(y=>(
            <option key={y} value={y}>{y}</option>
          ))}

        </select>


        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>setMonth(e.target.value)}
        >
          <option>Select Month</option>

          {months.map(m=>(
            <option key={m} value={m}>{m}</option>
          ))}

        </select>


        <button
          onClick={loadAttendance}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          View
        </button>

      </div>


      {data &&(

        <div className="bg-yellow-50 p-6 rounded shadow">

          <div className="flex justify-between mb-4">

            <h2 className="font-bold text-lg">
              {subject} Attendance
            </h2>

            <div className="font-semibold">
              Attendance % : {data.percent}
            </div>

          </div>

          <table className="w-full border">

            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>

              {data.records.map((r:any)=>(
                <tr key={r._id}>

                  <td className="border p-2">
                    {new Date(r.date).toLocaleDateString()}
                  </td>

                  <td
                    className={
                      r.status==="present"
                      ? "border p-2 text-green-600"
                      : "border p-2 text-red-600"
                    }
                  >
                    {r.status}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}