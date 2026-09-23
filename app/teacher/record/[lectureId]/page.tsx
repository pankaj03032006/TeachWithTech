"use client";

import { useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function RecordLecture() {

  const params = useParams();
  const lectureId = params.lectureId as string;

  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  const [recording, setRecording] = useState(false);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    recorder.onstop = uploadAudio;

    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }

  async function uploadAudio() {
    const blob = new Blob(chunksRef.current, {
      type: "audio/webm",
    });

    const formData = new FormData();
    formData.append("audio", blob);
    formData.append("lectureId", lectureId);

    await fetch("/api/teacher/upload-audio", {
      method: "POST",
      body: formData,
    });

    alert("Lecture uploaded");
  }

  return (
    <div>
      <h1>Lecture Recording</h1>

      {!recording ? (
        <button onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
}