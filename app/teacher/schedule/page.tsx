"use client";

import { useEffect, useState, useRef } from "react";

export default function TeacherSchedule() {

  const [schedule, setSchedule] = useState<any[]>([]);
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);
  const [lectureId, setLectureId] = useState(""); // 🔥 NEW

  useEffect(() => {
    loadSchedule();
  }, []);

  async function loadSchedule() {
    const res = await fetch("/api/teacher/today-schedule");
    const data = await res.json();
    setSchedule(data.schedules || []);
  }

  // 🎯 START (FIXED)
  async function startLecture(s: any) {

    try {
      // 🔥 1. create lecture first
      const res = await fetch("/api/teacher/start-lecture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduleId: s._id }),
      });

      const data = await res.json();

      if (!data.lecture) {
        alert("Lecture creation failed");
        return;
      }

      setLectureId(data.lecture._id);

      // 🔥 2. mic permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      chunksRef.current = []; // 🔥 reset

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      recorder.onstop = uploadAudio;

      recorder.start();

      alert("Recording started");

    } catch (err) {
      console.error(err);
      alert("Mic permission denied or error");
    }
  }

  // 🛑 STOP
  function stopLecture() {
    if (!mediaRecorderRef.current) {
      alert("No recording running");
      return;
    }

    mediaRecorderRef.current.stop();
  }

  // 📤 UPLOAD (FIXED)
  async function uploadAudio() {

    if (chunksRef.current.length === 0) {
      alert("No audio recorded");
      return;
    }

    const blob = new Blob(chunksRef.current, { type: "audio/webm" });

    const formData = new FormData();

    formData.append("audio", blob);

    // 🔥 FIXED
    formData.append("lectureId", lectureId);

    await fetch("/api/teacher/upload-audio", {
      method: "POST",
      body: formData
    });

    alert("Lecture processed successfully");
  }

  return (

    <div>

      <h1 className="text-3xl text-yellow-100 font-bold">Today's Classes</h1>

      <div className="mt-6">

        <table className="min-w-full border border-gray-700 text-left">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 border">Class</th>
              <th className="p-3 border">Subject</th>
              <th className="p-3 border">Room</th>
              <th className="p-3 border">Topic</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Action</th>
            </tr>

          </thead>

          <tbody>

            {schedule.map((s: any) => (
              <tr key={s._id} className="border-b bg-yellow-50 border-gray-700">

                <td className="p-3">{s.class}</td>
                <td className="p-3">{s.subject}</td>
                <td className="p-3">{s.room || "-"}</td>
                <td className="p-3">{s.topic || "-"}</td>
                <td className="p-3">{s.startTime} - {s.endTime}</td>

                <td className="p-3 flex gap-2">

                  <button
                    className="bg-green-600 px-3 py-1 rounded"
                    onClick={() => startLecture(s)}
                  >
                    Start
                  </button>

                  <button
                    className="bg-red-600 px-3 py-1 rounded"
                    onClick={stopLecture}
                  >
                    Stop
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}