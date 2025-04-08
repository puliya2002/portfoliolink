// app/[username]/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import DefaultTemplate from "@/app/template/default/page";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`
        );
        setUser(res.data?.user ? { ...res.data.user, ...res.data } : null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">User not found</p>
      </div>
    );
  }

  const {
    stats,
    social,
    project,
    setup,
    education,
    experience,
    skills,
    theme,
    hasAccess,
  } = user;

  return (
    <div>
      {!hasAccess && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 mb-4 flex items-center justify-between border border-orange-400 shadow-md hover:shadow-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-white" size={24} />
            <p className="text-[20px] font-medium text-white">
              Activate Premium
            </p>
          </div>
          <Link href="/pricing">
            <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              UPGRADE
            </span>
          </Link>
        </div>
      )}

      <DefaultTemplate
        user={user}
        stats={stats}
        social={social}
        project={project}
        setup={setup}
        education={education}
        experience={experience}
        skills={skills}
        theme={theme}
      />
    </div>
  );
}
