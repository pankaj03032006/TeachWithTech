import mongoose from "mongoose";

const TranscriptSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["audio", "youtube"],
    },
    source: String,
    text: String,
    confidence: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Transcript ||
  mongoose.model("Transcript", TranscriptSchema);