"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    });

    if(!res?.error){

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      const role = session?.user?.role;

      if(role === "principal"){
        router.push("/principal/dashboard");
      }
      else if(role === "teacher"){
        router.push("/teacher/dashboard");
      }
      else if(role === "admin"){
        router.push("/admin/dashboard");
      }
      else if(role === "student"){
        router.push("/student/dashboard");
      }
      else{
        router.push("/");
      }

    }else{
      alert(res.error);
    }

    setLoading(false);

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-800 ">

      <div className="bg-gray-400 shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            required
            className="border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>

  );

}