"use client";

import { useState } from "react";

export default function CreateTeacher() {

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    subjects:"",
    classes:"",
    qualification:"",
    homeCity:"",
    homeState:"",
  });

  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();

    const res = await fetch("/api/principal/create-teacher",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        ...form,
        subjects:form.subjects.split(","),
        classes:form.classes.split(","),
      })
    });

    const data = await res.json();

    alert(data.message || data.error);

  }

  return(

    <div className="flex justify-center">

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-10">
          Create Teacher
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <input
            placeholder="Teacher Name"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Email"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <input
            placeholder="Qualification"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,qualification:e.target.value})}
          />

          <input
            placeholder="Subjects (Math,Physics)"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,subjects:e.target.value})}
          />

          <input
            placeholder="Classes (9A,10B)"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,classes:e.target.value})}
          />

          <input
            placeholder="Home City"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,homeCity:e.target.value})}
          />

          <input
            placeholder="Home State"
            className="border p-3 rounded"
            onChange={(e)=>setForm({...form,homeState:e.target.value})}
          />

          <div className="col-span-2 flex justify-center mt-4">

            <button
              className="bg-black text-white px-8 py-3 rounded-lg"
            >
              Create Teacher
            </button>

          </div>

        </form>

      </div>

    </div>

  )

}