"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const roles = [
    { name: "Ministry", color: "bg-indigo-600" },
    { name: "District Magistrate", color: "bg-purple-600" },
    { name: "Principal", color: "bg-blue-600" },
    { name: "Teacher", color: "bg-green-600" },
    { name: "Student", color: "bg-orange-500" },
    { name: "Admin", color: "bg-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-6">

      {/* Title */}
      <h1 className="text-5xl text-red-300 font-bold text-center mb-6">
        AI Enabled Education Ecosystem
      </h1>

      <p className="text-blue-400 text-lg mb-12 text-center max-w-xl">
        A unified digital platform connecting government, schools,
        teachers, and students through intelligent education systems.
      </p>

      {/* Role Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">

        {roles.map((role) => (
          <div
            key={role.name}
            onClick={() => router.push("/login")}
            className="cursor-pointer bg-red-200 rounded-xl shadow-lg p-8 flex items-center justify-center text-center hover:shadow-2xl hover:-translate-y-1 transition duration-200"
          >
            <h2 className="text-xl font-semibold">
              {role.name}
            </h2>
          </div>
        ))}

      </div>

    </div>
  );
}