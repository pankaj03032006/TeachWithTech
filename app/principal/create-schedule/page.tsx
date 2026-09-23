"use client";

import { useEffect, useState } from "react";

export default function CreateSchedule() {

  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  const classes = [
    "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "10", "11", "12"
  ];

  const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
  ];
  const [form, setForm] = useState({
    teacher: "",
    class: "",
    subject: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    room: "",
    topic: "",
    instructions: ""
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    const res = await fetch("/api/principal/teachers-list");
    const data = await res.json();
    setTeachers(data.teachers || []);
  }

  function handleTeacherChange(id: string) {

    const teacher = teachers.find((t) => t._id === id);

    setForm({
      ...form,
      teacher: id,
      subject: ""
    });

    if (teacher) {
      setSubjects(teacher.subjects || []);
    } else {
      setSubjects([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const res = await fetch("/api/principal/create-schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message || data.error);
  }

  return (

    <div className="flex justify-center">

      <div className="bg-yellow-50 shadow-xl rounded-xl p-10 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center mb-10">
          Create Class Schedule
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          {/* Teacher */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Teacher
            </label>

            <select
              className="border p-3 rounded"
              onChange={(e) =>
                handleTeacherChange(e.target.value)
              }
            >

              <option value="">Select Teacher</option>

              {teachers.map((t) => (

                <option key={t._id} value={t._id}>
                  {t.name}
                </option>

              ))}

            </select>

          </div>

          {/* Class */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Class
            </label>

            <select
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, class: e.target.value })
              }
            >

              <option value="">Select Class</option>

              {classes.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}

            </select>

          </div>

          {/* Subject */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Subject
            </label>

            <select
              className="border p-3 rounded"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
            >

              <option value="">Select Subject</option>

              {subjects.map((s) => (

                <option key={s} value={s}>
                  {s}
                </option>

              ))}

            </select>

          </div>

          {/* Day */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Day
            </label>

            <select
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, day: e.target.value })
              }
            >

              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}

            </select>

          </div>

          {/* Start Time */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Start Time
            </label>

            <input
              type="time"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
            />

          </div>

          {/* End Time */}

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              End Time
            </label>

            <input
              type="time"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
            />

          </div>

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Room
            </label>

            <input
              type="text"
              placeholder="Room number"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, room: e.target.value })
              }
            />

          </div>

          <div className="flex flex-col">

            <label className="font-medium mb-1">
              Lecture Topic
            </label>

            <input
              type="text"
              placeholder="Topic for the lecture"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, topic: e.target.value })
              }
            />

          </div>

          <div className="flex flex-col col-span-2">

            <label className="font-medium mb-1">
              Instructions for Teacher
            </label>

            <textarea
              rows={3}
              placeholder="Optional instructions"
              className="border p-3 rounded"
              onChange={(e) =>
                setForm({ ...form, instructions: e.target.value })
              }
            />

          </div>

          {/* Button */}

          <div className="col-span-2 flex justify-center mt-4">

            <button
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
            >
              Create Schedule
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}