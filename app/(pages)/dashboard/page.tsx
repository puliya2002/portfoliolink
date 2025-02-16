"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
