"use client";

import { useEffect,useState } from "react";

export default function LecturesPage(){

  const [lectures,setLectures] = useState([]);

  useEffect(()=>{
    loadLectures();
  },[]);

  async function loadLectures(){

    const res = await fetch("/api/student/lectures");
    const data = await res.json();

    setLectures(data.lectures);

  }

  return(

    <div>

      <h1>Lecture Summaries</h1>

      {lectures.map((l:any)=>(
        <div key={l._id}>
          <p>{l.subject}</p>
          <p>{l.analysis?.summary}</p>
        </div>
      ))}

    </div>

  )

}