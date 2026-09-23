
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
         Teacher
        </h2>

        <nav className="flex flex-col gap-4 text-lg">

          <Link href="/teacher/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/teacher/schedule" className="hover:text-blue-400">
          View Schedule
          </Link>

          <Link href="/teacher/students" className="hover:text-blue-400">
            My Students
          </Link>

          <Link href="/teacher/attendance" className="hover:text-blue-400">
           Take Attendance
          </Link>

          <Link href="/teacher/upload-marks" className="hover:text-blue-400">
            Upload Marks
          </Link>

          <Link href="/teacher/complaint" className="hover:text-blue-400">
            Student Complaint
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