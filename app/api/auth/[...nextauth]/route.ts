import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";

import Teacher from "@/models/Teacher";
import Principal from "@/models/Principal";
import Student from "@/models/Student";

export const authOptions = {
  providers: [
   CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },

      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials;

        // Principal
        const principal = await Principal.findOne({ email, isActive: true });
        if (principal) {
          const isValid = await principal.comparePassword(password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: principal._id.toString(),
            name: principal.name,
            email: principal.email,
            role: "principal",
            schoolName: principal.schoolName,
          };
        }

        // Teacher
        const teacher = await Teacher.findOne({ email, isActive: true });
        if (teacher) {
          const isValid = await teacher.comparePassword(password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: teacher._id.toString(),
            name: teacher.name,
            email: teacher.email,
            role: teacher.role,
          };
        }

        // Student
        const student = await Student.findOne({ email, isActive: true });
        if (student) {
          const isValid = await student.comparePassword(password);
          if (!isValid) throw new Error("Invalid password");

          return {
            id: student._id.toString(),
            name: student.name,
            email: student.email,
            role: "student",
            class: student.class,
          };
        }

        throw new Error("User not found");
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.class = user.class;
        token.schoolName = user.schoolName;
      }
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.class = token.class;
        session.user.schoolName = token.schoolName;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };