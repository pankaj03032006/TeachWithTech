import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "teacher" | "principal" | "admin";
      name?: string;
      email?: string;
      class?: string;           // for student
      schoolName?: string;      // for principal
    };
  }

  interface User {
    id: string;
    role: "student" | "teacher" | "principal" | "admin";
    class?: string;
    schoolName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "student" | "teacher" | "principal" | "admin";
    class?: string;
    schoolName?: string;
  }
}
