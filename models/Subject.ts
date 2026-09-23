import mongoose, { Schema, Document, Model } from "mongoose";

/* =========================
   Interface
========================= */

export interface ISubject extends Document {
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/* =========================
   Schema
========================= */

const SubjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* =========================
   Model Export
========================= */

const Subject: Model<ISubject> =
  mongoose.models.Subject ||
  mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
