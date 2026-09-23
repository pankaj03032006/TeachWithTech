"use client";

import { useEffect,useState } from "react";

export default function DBTStatus(){

  const [records,setRecords] = useState([]);

  useEffect(()=>{
    loadDBT();
  },[]);

  async function loadDBT(){

    const res = await fetch("/api/principal/dbt");

    const data = await res.json();

    setRecords(data.records);

  }

  return(

    <div>

      <h1>DBT Transfers</h1>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>Student</th>
            <th>Benefit</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {records.map((r:any)=>(
            <tr key={r._id}>
              <td>{r.student?.name}</td>
              <td>{r.type}</td>
              <td>{r.amount}</td>
              <td>{r.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}