import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ILecture extends Document {
  title: string;
  teacher: Types.ObjectId;
  subject: string;
  class: string;

  schedule: Types.ObjectId;

  startTime?: Date;
  endTime?: Date;

  transcript?: string;
  referenceTranscript?: string;

  analysis?: {
    matchPercentage?: number;
    voiceProbability?: number;
    summary?: string;
  };

  status: "scheduled" | "recording" | "completed" | "analyzed";
}

const LectureSchema = new Schema<ILecture>(
  {
    title: String,
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
    subject: String,
    class: String,
    schedule: { type: Schema.Types.ObjectId, ref: "Schedule" },

    startTime: Date,
    endTime: Date,

    transcript: String,
    referenceTranscript: String,

    analysis: {
      matchPercentage: Number,
      voiceProbability: Number,
      summary: String,
    },

    status: {
      type: String,
      enum: ["scheduled", "recording", "completed", "analyzed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lecture ||
  mongoose.model<ILecture>("Lecture", LectureSchema);