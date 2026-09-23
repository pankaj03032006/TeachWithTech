"use client";

import Link from "next/link";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">

        <h2 className="text-2xl font-bold mb-8">
          Principal
        </h2>

        <nav className="flex flex-col gap-4 text-lg">

          <Link href="/principal/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/principal/create-teacher" className="hover:text-blue-400">
            Create Teacher
          </Link>

          <Link href="/principal/teachers" className="hover:text-blue-400">
            View Teachers
          </Link>

          <Link href="/principal/create-student" className="hover:text-blue-400">
            Create Student
          </Link>

          <Link href="/principal/students" className="hover:text-blue-400">
            View Students
          </Link>

          <Link href="/principal/create-schedule" className="hover:text-blue-400">
            Create Schedule
          </Link>
          <Link href="/principal/schedule" className="hover:text-blue-400">
            View Schedule
          </Link>

          <Link href="/principal/attendance-report" className="hover:text-blue-400">
            Attendance Reports
          </Link>

          <Link href="/principal/results-analysis" className="hover:text-blue-400">
            Results Analysis
          </Link>

          <Link href="/principal/complaints" className="hover:text-blue-400">
            Complaints
          </Link>

          <Link href="/principal/meal-menu" className="hover:text-blue-400">
            Update Meal Menu
          </Link>

          <Link href="/principal/dbt-status" className="hover:text-blue-400">
            DBT Status
          </Link>

        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-800 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}