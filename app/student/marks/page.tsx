"use client";

import { useEffect,useState } from "react";

export default function MarksPage(){

  const [examType,setExamType] = useState("");
  const [examTypes,setExamTypes] = useState<string[]>([]);
  const [data,setData] = useState<any[]>([]);
  const [overall,setOverall] = useState<number | string>(0);

  useEffect(()=>{
    loadExamTypes();
  },[]);

  async function loadExamTypes(){

    const res = await fetch("/api/student/exam-types");
    const data = await res.json();

    setExamTypes(data.exams || []);

  }

  async function loadMarks(){

    if(!examType){
      alert("Select exam type");
      return;
    }

    const res = await fetch(
      `/api/student/marks?examType=${examType}`
    );

    const result = await res.json();

    setData(result.report || []);
    setOverall(result.overallPercent || 0);

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Report Card
      </h1>

      <div className="flex gap-4">

        <select
          className="border p-2 rounded bg-yellow-50"
          value={examType}
          onChange={(e)=>setExamType(e.target.value)}
        >

          <option value="">Select Exam</option>

          {examTypes.map(e=>(
            <option key={e} value={e}>
              {e}
            </option>
          ))}

        </select>

        <button
          onClick={loadMarks}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          View Report
        </button>

      </div>


      {data.length>0 &&(

        <div className="bg-yellow-50 rounded shadow p-6">

          <div className="flex justify-between mb-4">

            <h2 className="text-xl font-bold">
              {examType} Result
            </h2>

            <div className="text-lg font-semibold">
              Overall % : {overall}
            </div>

          </div>

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Obtained</th>
                <th className="border p-2">Max Marks</th>
                <th className="border p-2">Percent</th>
              </tr>

            </thead>

            <tbody>

              {data.map((r:any)=>(
                <tr key={r.subject}>

                  <td className="border p-2">
                    {r.subject}
                  </td>

                  <td className="border p-2">
                    {r.marks}
                  </td>

                  <td className="border p-2">
                    {r.maxMarks}
                  </td>

                  <td className="border p-2">
                    {r.percent}%
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}