"use client";

import { useState } from "react";

export default function CreateStudent() {

  const [form, setForm] = useState({
    name:"",
    fatherName:"",
    email:"",
    password:"",
    className:"",
    rollNumber:"",
    srNumber:"",
    address:"",
    city:"",
    state:"",
    phone:"",
    guardianPhone:"",
    dateOfBirth:""
  });

  async function handleSubmit(e:React.FormEvent){

    e.preventDefault();

    const res = await fetch("/api/principal/create-student",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(form)
    });

    const data = await res.json();

    alert(data.message || data.error);

  }

  return(

    <div className="flex justify-center">

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-4xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Student Admission
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          <input placeholder="Student Name" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

          <input placeholder="Father Name" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,fatherName:e.target.value})}/>

          <input placeholder="Email" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

          <input type="password" placeholder="Password"
          className="border p-3 rounded"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

          <input placeholder="Class" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,className:e.target.value})}/>

          <input placeholder="Roll Number" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,rollNumber:e.target.value})}/>

          <input placeholder="SR Number" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,srNumber:e.target.value})}/>

          <input type="date" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,dateOfBirth:e.target.value})}/>

          <input placeholder="Phone Number" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,phone:e.target.value})}/>

          <input placeholder="Guardian Phone" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,guardianPhone:e.target.value})}/>

          <input placeholder="City" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,city:e.target.value})}/>

          <input placeholder="State" className="border p-3 rounded"
          onChange={(e)=>setForm({...form,state:e.target.value})}/>

          <textarea placeholder="Address"
          className="border p-3 rounded col-span-2"
          onChange={(e)=>setForm({...form,address:e.target.value})}/>

          <div className="col-span-2 flex justify-center">

            <button className="bg-black text-white px-8 py-3 rounded-lg">
              Admit Student
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}