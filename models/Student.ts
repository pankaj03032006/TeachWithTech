import mongoose, { Schema, Document, Model, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IStudent extends Document {
  name: string;
  fatherName: string;
  email: string;
  password: string;

  class: string;
  rollNumber: string;
  srNumber: string;

  address: string;
  city: string;
  state: string;

  phone: string;
  guardianPhone: string;

  dateOfBirth: Date;
  admissionDate: Date;

  principal: Types.ObjectId;
  isActive: boolean;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },

    fatherName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    class: { type: String, required: true },

    rollNumber: { type: String, required: true },

    srNumber: { type: String, required: true, unique: true },

    address: { type: String, required: true },

    city: { type: String, required: true },

    state: { type: String, required: true },

    phone: { type: String, required: true },

    guardianPhone: { type: String, required: true },

    dateOfBirth: { type: Date, required: true },

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    principal: {
      type: Schema.Types.ObjectId,
      ref: "Principal",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function () {
  const student = this as IStudent;

  if (!student.isModified("password")) return;

  student.password = await bcrypt.hash(student.password, 12);
});

StudentSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Student: Model<IStudent> =
  mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;