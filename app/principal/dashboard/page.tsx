"use client";

import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function PrincipalDashboard() {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const res = await fetch("/api/principal/dashboard");
    const d = await res.json();
    setData(d);
  }

  if (!data) return <p>Loading analytics...</p>;

  const pieData = {
    labels: Object.keys(data.classDistribution),
    datasets: [
      {
        data: Object.values(data.classDistribution),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#6366f1"
        ]
      }
    ]
  };

  const teacherBar = {
    labels: data.teacherPerformance.map((t: any) => t._id),
    datasets: [
      {
        label: "Classes Taken",
        data: data.teacherPerformance.map((t: any) => t.classesTaken),
        backgroundColor: "#6366f1"
      }
    ]
  };

  return (

    <div className="space-y-10">

      <h1 className="text-3xl text-yellow-100 font-bold">
        Principal Dashboard
      </h1>

      {/* Top Stats */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3>Total Students</h3>
          <p className="text-2xl font-bold">{data.totalStudents}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3>Total Teachers</h3>
          <p className="text-2xl font-bold">{data.totalTeachers}</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3>Attendance Rate</h3>
          <p className="text-2xl font-bold">{data.attendanceRate}%</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h3>Complaint Resolution</h3>
          <p className="text-2xl font-bold">{data.complaintResolution}%</p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-10">

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h2>Student Distribution</h2>
          <Pie data={pieData}/>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <h2>Top Teacher Activity</h2>
          <Bar data={teacherBar}/>
        </div>

      </div>

      {/* Academic Insights */}

      <div className="bg-yellow-50 p-6 rounded-lg shadow">

        <h2 className="text-xl font-semibold mb-4">
          Academic Highlights
        </h2>

        <p>Board Topper: {data.topper}</p>
        <p>Highest Marks: {data.highestMarks}</p>

      </div>

    </div>
  );
}