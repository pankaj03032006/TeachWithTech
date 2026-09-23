import mongoose, { Schema, Document, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";
export interface IAttendance {
  date: string; 
  time: string; 
  faceMatched: boolean;
  locationMatched: boolean;
  verified: boolean;
}
export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;

  subjects: string[];
  classes: string[];

  role: "teacher" | "admin";
  isActive: boolean;

  imageUrl?: string;
  cloudinaryId?: string;

  principal: Types.ObjectId;

  qualification?: string;
  homeCity?: string;
  homeState?: string;

  joiningDate: Date;

  attendance: IAttendance[];

  comparePassword(candidatePassword: string): Promise<boolean>;
}
const AttendanceSchema = new Schema<IAttendance>({
  date: { type: String },

  time: { type: String },

  faceMatched: { type: Boolean, default: false },

  locationMatched: { type: Boolean, default: false },

  verified: {
    type: Boolean,
    default: function (this: IAttendance) {
      return this.faceMatched && this.locationMatched;
    },
  },
});
const TeacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    principal: {
      type: Schema.Types.ObjectId,
      ref: "Principal",
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    subjects: [
      {
        type: String,
      },
    ],

    classes: [
      {
        type: String,
      },
    ],

    qualification: {
      type: String,
    },

    homeCity: {
      type: String,
    },

    homeState: {
      type: String,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    imageUrl: {
      type: String,
    },

    cloudinaryId: {
      type: String,
    },

    attendance: [AttendanceSchema],
  },

  {
    timestamps: true,
  }
);
TeacherSchema.pre("save", async function () {
  const teacher = this as ITeacher;

  if (!teacher.isModified("password")) return;

  teacher.password = await bcrypt.hash(teacher.password, 12);
});
TeacherSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};
const Teacher: Model<ITeacher> =
  mongoose.models.Teacher ||
  mongoose.model<ITeacher>("Teacher", TeacherSchema);
export default Teacher;