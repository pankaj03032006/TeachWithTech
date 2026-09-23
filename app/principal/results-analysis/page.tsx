"use client";

import { useState } from "react";

export default function ResultsAnalysis(){

  const classes = [
    "1","2","3","4","5","6",
    "7","8","9","10","11","12"
  ];

  const [className,setClassName] = useState("");
  const [subject,setSubject] = useState("");
  const [report,setReport] = useState<any>(null);

  async function loadReport(){

    if(!className){
      alert("Please select a class");
      return;
    }

    let url = `/api/principal/results-analysis?class=${className}`;

    if(subject){
      url += `&subject=${subject}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setReport(data);

  }

  return(

    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-yellow-100">
        Result Analytics
      </h1>

      {/* Filters */}

      <div className="bg-yellow-50 p-6 rounded-lg shadow flex gap-4">

        <select
          className="border p-2 rounded"
          value={className}
          onChange={(e)=>setClassName(e.target.value)}
        >
          <option value="">Select Class</option>

          {classes.map(c=>(
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>

        <input
          placeholder="Subject (optional)"
          className="border p-2 rounded"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />

        <button
          onClick={loadReport}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate Report
        </button>

      </div>

      {/* CLASS REPORT */}

      {report?.mode==="class" && (

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-bold mb-4">
            Class Subject Averages
          </h2>

          {report.message && (
            <p className="text-red-500 mb-4">
              {report.message}
            </p>
          )}

          {report.subjects?.length > 0 && (

            <table className="w-full border">

              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Average Marks</th>
                </tr>
              </thead>

              <tbody>

                {report.subjects?.map((s:any)=>(
                  <tr key={s.subject}>
                    <td className="border p-2">{s.subject}</td>
                    <td className="border p-2">{s.average}</td>
                  </tr>
                ))}

              </tbody>

            </table>

          )}

          <div className="mt-4">

            <p>
              Highest Average Subject:  
              <b> {report.highestSubject?.subject || "N/A"}</b>
            </p>

            <p>
              Lowest Average Subject:  
              <b> {report.lowestSubject?.subject || "N/A"}</b>
            </p>

          </div>

        </div>

      )}

      {/* SUBJECT REPORT */}

      {report?.mode==="subject" && (

        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-bold mb-4">
            Subject Analysis
          </h2>

          {report.message ? (

            <p className="text-red-500">{report.message}</p>

          ) : (

            <>
              <p>Average Marks: {report.average}</p>

              <p>
                Highest Scorer:{" "}
                {report.highestStudent?.name || "N/A"} 
                ({report.highestStudent?.marks || "0"})
              </p>

              <p>
                Lowest Scorer:{" "}
                {report.lowestStudent?.name || "N/A"} 
                ({report.lowestStudent?.marks || "0"})
              </p>
            </>

          )}

        </div>

      )}

    </div>

  );

}