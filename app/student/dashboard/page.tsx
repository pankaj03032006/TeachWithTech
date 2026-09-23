"use client";

import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";

export default function StudentDashboard(){

  const {data:session} = useSession();

  const [attendance,setAttendance] = useState(0);
  const [results,setResults] = useState<any[]>([]);
  const [complaints,setComplaints] = useState<any[]>([]);
  const [meal,setMeal] = useState<any>(null);

  useEffect(()=>{
    loadData();
  },[]);

  async function loadData(){

    const [
      attendanceRes,
      resultsRes,
      complaintsRes,
      mealRes
    ] = await Promise.all([

      fetch("/api/student/attendance"),
      fetch("/api/student/results"),
      fetch("/api/student/complaints"),
      fetch("/api/student/meals")

    ]);

    const attendanceData = await attendanceRes.json();
    const resultsData = await resultsRes.json();
    const complaintsData = await complaintsRes.json();
    const mealData = await mealRes.json();

    setAttendance(attendanceData.percentage || 0);
    setResults(resultsData.results || []);
    setComplaints(complaintsData.complaints || []);
    setMeal(mealData.meal || null);

  }

  const pending = complaints.filter(
    (c:any)=>c.status==="pending"
  ).length;

  return(

    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-yellow-100">
        Student Dashboard
      </h1>

      <p className="text-white text-2xl">
        Welcome {session?.user?.name}
      </p>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3>Attendance</h3>
          <p className="text-2xl">
            {attendance}%
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3>Total Complaints</h3>
          <p className="text-2xl">
            {complaints.length}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3>Pending Complaints</h3>
          <p className="text-2xl">
            {pending}
          </p>
        </div>

      </div>


      {/* Recent Results */}

      <div className="bg-yellow-50 p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          Recent Exam Results
        </h2>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Obtained</th>
              <th className="border p-2">Max</th>
              <th className="border p-2">Percent</th>
            </tr>
          </thead>

          <tbody>

            {results.map((r:any)=>(
              <tr key={r._id}>
                <td className="border p-2">{r.subject}</td>
                <td className="border p-2">{r.marks}</td>
                <td className="border p-2">{r.maxMarks}</td>
                <td className="border p-2">{r.percent}%</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>


      {/* Today Meal */}

      <div className="bg-yellow-50 p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          Today's Mid-Day Meal
        </h2>

        {meal ? (

          <div>

            <p>
              <b>Day:</b> {meal.day}
            </p>

            <p>
              <b>Meal:</b> {meal.menu}
            </p>

          </div>

        ) : (

          <p>No meal available</p>

        )}

      </div>

    </div>

  );

}