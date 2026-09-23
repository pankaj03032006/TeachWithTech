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
         Student
        </h2>

        <nav className="flex flex-col gap-4 text-lg">

          <Link href="/student/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/student/profile" className="hover:text-blue-400">
          Profile
          </Link>

          <Link href="/student/marks" className="hover:text-blue-400">
           Report Card
          </Link>

          <Link href="/student/attendance" className="hover:text-blue-400">
           Attendance
          </Link>

          <Link href="/student/schedule" className="hover:text-blue-400">
            Schedule
          </Link>

          <Link href="/student/lectures" className="hover:text-blue-400">
            Lecture Summaries
          </Link>

          <Link href="/student/meals" className="hover:text-blue-400">
            Mid Day Meal
          </Link>

          <Link href="/student/dbt" className="hover:text-blue-400">
            DBT Status
          </Link>

          <Link href="/student/complaints" className="hover:text-blue-400">
            Complaints
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