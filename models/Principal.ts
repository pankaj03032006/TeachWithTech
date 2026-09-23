import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IPrincipal extends Document {
  name: string;
  email: string;
  password: string;
  schoolName: string;
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const PrincipalSchema = new Schema<IPrincipal>(
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
    password: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

PrincipalSchema.pre("save", async function () {
  const principal = this as IPrincipal;

  if (!principal.isModified("password")) return;

  principal.password = await bcrypt.hash(principal.password, 12);
});



PrincipalSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Principal: Model<IPrincipal> =
  mongoose.models.Principal ||
  mongoose.model<IPrincipal>("Principal", PrincipalSchema);

export default Principal;
