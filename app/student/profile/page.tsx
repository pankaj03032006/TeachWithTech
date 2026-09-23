"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [profile,setProfile] = useState<any>(null);

  useEffect(()=>{
    loadProfile();
  },[]);

  async function loadProfile(){

    const res = await fetch("/api/student/profile");
    const data = await res.json();

    setProfile(data);

  }

  if(!profile){
    return (
      <div className="flex justify-center items-center h-[60vh] text-white">
        Loading profile...
      </div>
    );
  }

  return (

    <div className="flex justify-center items-center mt-10">

      <div className="bg-yellow-50 shadow-lg rounded-xl w-full max-w-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Student Profile
        </h1>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Name</span>
            <span>{profile.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Class</span>
            <span>{profile.class}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Roll Number</span>
            <span>{profile.rollNumber || profile.rollNo}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email</span>
            <span>{profile.email}</span>
          </div>

          {profile.phone && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Phone</span>
              <span>{profile.phone}</span>
            </div>
          )}

          {profile.address && (
            <div className="flex justify-between">
              <span className="font-semibold">Address</span>
              <span>{profile.address}</span>
            </div>
          )}

        </div>

      </div>

    </div>

  );

}