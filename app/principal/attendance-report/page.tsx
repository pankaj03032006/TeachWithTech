"use client";

import { useEffect, useState } from "react";

export default function AttendanceReport(){

  const [classes,setClasses] = useState<string[]>([]);
  const [subjects,setSubjects] = useState<string[]>([]);
  const [years,setYears] = useState<number[]>([]);
  const [months,setMonths] = useState<number[]>([]);

  const [className,setClassName] = useState("");
  const [subject,setSubject] = useState("");
  const [year,setYear] = useState("");
  const [month,setMonth] = useState("");

  const [records,setRecords] = useState<any[]>([]);
  const [stats,setStats] = useState<any>(null);

  useEffect(()=>{
    loadClasses();
  },[]);

  async function loadClasses(){

    const res = await fetch("/api/principal/students");
    const data = await res.json();

    const unique: string[] = Array.from(
      new Set(data.students.map((s:any)=>s.class))
    );

    setClasses(unique);

  }

  async function loadSubjects(c:string){

    const res = await fetch(`/api/principal/attendance-subjects?class=${c}`);
    const data = await res.json();

    setSubjects(data.subjects);

  }

  async function loadYears(c:string){

    const res = await fetch(`/api/principal/attendance-years?class=${c}`);
    const data = await res.json();

    setYears(data.years);

  }

  async function loadMonths(c:string,y:string){

    const res = await fetch(`/api/principal/attendance-months?class=${c}&year=${y}`);
    const data = await res.json();

    setMonths(data.months);

  }

  async function loadReport(){

    let url =
      `/api/principal/attendance-report?class=${className}&year=${year}&month=${month}`;

    if(subject){
      url += `&subject=${subject}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setRecords(data.records || []);
    setStats(data.stats || null);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Attendance Report
      </h1>

      {/* Filters */}

      <div className="flex gap-4 flex-wrap">

        {/* Class */}

        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>{

            const c = e.target.value;

            setClassName(c);
            loadSubjects(c);
            loadYears(c);

          }}
        >
          <option>Select Class</option>

          {classes.map(c=>(
            <option key={c}>{c}</option>
          ))}

        </select>

        {/* Subject */}

        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>setSubject(e.target.value)}
        >
          <option>All Subjects</option>

          {subjects.map(s=>(
            <option key={s}>{s}</option>
          ))}

        </select>

        {/* Year */}

        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>{

            const y = e.target.value;
            setYear(y);

            loadMonths(className,y);

          }}
        >
          <option>Select Year</option>

          {years.map(y=>(
            <option key={y}>{y}</option>
          ))}

        </select>

        {/* Month */}

        <select
          className="border p-2 bg-yellow-50"
          onChange={(e)=>setMonth(e.target.value)}
        >
          <option>Select Month</option>

          {months.map(m=>(
            <option key={m}>{m+1}</option>
          ))}

        </select>

        <button
          className="bg-blue-400 text-white px-4 py-2"
          onClick={loadReport}
        >
          Generate Report
        </button>

      </div>

      {/* Stats */}

      {stats &&(

        <div className="flex justify-end">

          <div className="bg-yellow-50 p-4 shadow">

            <p>
              Highest :
              <b>{stats.highest.name} ({stats.highest.percent}%)</b>
            </p>

            <p>
              Lowest :
              <b>{stats.lowest.name} ({stats.lowest.percent}%)</b>
            </p>

          </div>

        </div>

      )}

      {/* Table */}

      <table className="border w-full bg-yellow-50">

        <thead>

          <tr className="bg-gray-200">

            <th>Name</th>
            <th>Roll</th>
            <th>Total</th>
            <th>Attended</th>
            <th>%</th>

          </tr>

        </thead>

        <tbody>

          {records.map(r=>(

            <tr key={r.studentId}>

              <td>{r.name}</td>
              <td>{r.rollNumber}</td>
              <td>{r.totalClasses}</td>
              <td>{r.attended}</td>
              <td>{r.percent}%</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}