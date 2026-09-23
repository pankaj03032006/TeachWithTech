"use client";

import { useEffect,useState } from "react";

export default function DBTPage(){

  const [records,setRecords] = useState([]);

  useEffect(()=>{
    loadDBT();
  },[]);

  async function loadDBT(){

    const res = await fetch("/api/student/dbt");
    const data = await res.json();

    setRecords(data.records);

  }

  return(

    <div>

      <h1>DBT Benefits</h1>

      {records.map((r:any)=>(
        <div key={r._id}>
          <p>{r.type}</p>
          <p>Status: {r.status}</p>
          <p>Amount: {r.amount}</p>
        </div>
      ))}

    </div>

  )

}