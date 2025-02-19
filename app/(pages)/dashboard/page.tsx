"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (
      session?.user?.currentstep !== undefined &&
      session.user.currentstep < 4
    ) {
      router.push(`/dashboard/step${session.user.currentstep}`);
    }
  }, [session, router]);

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <h1>{session.user.currentstep}</h1>
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
