"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie
} from "recharts";

type DashboardData = {
  stats: {
    classesToday: number
    complaints: number
    attendanceToday: number
  }

  performance: {
    date: string
    score: number
  }[]

  classDistribution: {
    name: string
    value: number
  }[]

  nextClass?: {
    subject: string
    class: string
    startTime: string
    endTime?: string
    room?: string
    topic?: string
  }

  aiScore: number
  teacherRank?: number
}

export default function TeacherDashboard() {

  const { data: session } = useSession();

  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {

    async function loadDashboard() {

      const res = await fetch("/api/teacher/dashboard");
      const json = await res.json();

      setData(json);

    }

    loadDashboard();

  }, []);

  if (!data) return <p className="text-white">Loading dashboard...</p>;

  return (

    <div className="space-y-10">

      <h1 className="text-3xl text-yellow-100 font-bold">
        Welcome {session?.user?.name}
      </h1>


      {/* ===== TOP CARDS ===== */}

      <div className="grid grid-cols-4 gap-6">

        <UpcomingClassCard nextClass={data.nextClass} />

        <Card title="Pending Complaints" value={data.stats.complaints} />

        <Card title="Attendance Taken" value={data.stats.attendanceToday} />

        <Card title="Teacher Rank" value={data.teacherRank ?? "-"} />

      </div>


      {/* ===== CHARTS ===== */}

      <div className="grid grid-cols-2 gap-10">

        <div className="bg-yellow-50 p-6 rounded-xl">

          <h2 className="mb-4 text-lg font-semibold">
            Lecture Quality Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data.performance}>

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line dataKey="score" stroke="#3b82f6" />

            </LineChart>

          </ResponsiveContainer>

        </div>


        <div className="bg-yellow-50 p-6 rounded-xl">

          <h2 className="mb-4 text-lg font-semibold">
            Class Distribution
          </h2>

          <PieChart width={300} height={300}>

            <Pie data={data.classDistribution} dataKey="value" label />

          </PieChart>

        </div>

      </div>


      {/* ===== AI PERFORMANCE ===== */}

      <div className="bg-yellow-50 p-6 rounded-xl">

        <h2 className="text-lg font-semibold mb-4">
          AI Teaching Performance
        </h2>

        <p>
          Your lecture match score average is {data.aiScore}%.
          Students are responding well to your teaching pattern.
        </p>

      </div>

    </div>

  );
}


type CardProps = {
  title: string
  value: string | number
}

function Card({ title, value }: CardProps) {

  return (

    <div className="bg-yellow-50 p-6 rounded-xl">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>

    </div>

  );
}


/* ===== UPCOMING CLASS CARD ===== */

function UpcomingClassCard({ nextClass }: {
  nextClass?: {
    subject: string
    class: string
    startTime: string
    endTime?: string
    room?: string
    topic?: string
  }
}) {

  if (!nextClass) {

    return (

      <div className="bg-yellow-50 p-6 rounded-xl">

        <p className="text-sm text-gray-500">
          Upcoming Class
        </p>

        <p className="text-lg font-semibold mt-2">
          No more classes today
        </p>

      </div>

    )

  }

  return (

    <div className="bg-yellow-50 p-6 rounded-xl">

      <p className="text-sm text-gray-500">
        Upcoming Class
      </p>

      <p className="text-xl font-bold mt-2">
        Class {nextClass.class}
      </p>

      <p className="text-lg">
        {nextClass.subject}
      </p>

      {nextClass.room && (
        <p className="text-sm text-gray-600">
          Room : {nextClass.room}
        </p>
      )}

      {nextClass.topic && (
        <p className="text-sm text-gray-600">
          Topic : {nextClass.topic}
        </p>
      )}

      <p className="text-sm text-gray-600 mt-1">
        Time : {nextClass.startTime} {nextClass.endTime ? `- ${nextClass.endTime}` : ""}
      </p>

    </div>

  )

}