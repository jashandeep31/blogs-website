import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import { JWT as IJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IJWT {
    name: string;
    id: string;
    role: Role;
  }
}
