"use client";

import { useEffect,useState } from "react";

export default function SchedulePage(){

  const [schedules,setSchedules] = useState<any[]>([]);

  useEffect(()=>{
    loadSchedules();
  },[]);

  async function loadSchedules(){

    const res = await fetch("/api/principal/schedule");
    const data = await res.json();

    setSchedules(data.schedules || []);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Class Schedule
      </h1>

      <div className="bg-yellow-50 rounded-lg shadow p-6 overflow-x-auto">

        <table className="min-w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">Day</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>

            </tr>

          </thead>

          <tbody>

            {schedules.map((s)=>(
              <tr key={s._id} className="text-center">

                <td className="border px-4 py-2">{s.class}</td>
                <td className="border px-4 py-2">{s.subject}</td>
                <td className="border px-4 py-2">{s.teacher?.name}</td>
                <td className="border px-4 py-2">{s.day}</td>
                <td className="border px-4 py-2">{s.startTime}</td>
                <td className="border px-4 py-2">{s.endTime}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}