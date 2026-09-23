"use client";

import { useEffect, useState } from "react";

export default function SchedulePage(){

  const [schedule,setSchedule] = useState<any[]>([]);

  useEffect(()=>{
    loadSchedule();
  },[]);

  async function loadSchedule(){

    const res = await fetch("/api/student/schedule");
    const data = await res.json();

    setSchedule(data.schedules || []);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Class Schedule
      </h1>

      <div className="bg-yellow-50 rounded shadow overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-200">

            <tr>

              <th className="border p-3">Subject</th>
              <th className="border p-3">Teacher</th>
              <th className="border p-3">Room</th>
              <th className="border p-3">Topic</th>
              <th className="border p-3">Time</th>

            </tr>

          </thead>

          <tbody>

            {schedule.length === 0 ? (

              <tr>
                <td colSpan={5} className="text-center p-6">
                  No classes scheduled
                </td>
              </tr>

            ) : (

              schedule.map((s:any)=>(
                <tr key={s._id} className="text-center bg-yellow-50">

                  <td className="border p-2">
                    {s.subject}
                  </td>

                  <td className="border p-2">
                    {s.teacher?.name || "-"}
                  </td>

                  <td className="border p-2">
                    {s.room || "-"}
                  </td>

                  <td className="border p-2">
                    {s.topic || "-"}
                  </td>

                  <td className="border p-2">
                    {s.startTime} - {s.endTime}
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}