// next-auth.d.ts (at the root of your project)

import { Session } from "next-auth";
import { DefaultSession } from "next-auth";

// Extend the session type to include 'currentstep'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      currentstep: number; // Add currentstep here
    } & DefaultSession["user"];
  }
}
