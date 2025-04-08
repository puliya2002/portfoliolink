"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DefaultTemplate from "@/app/template/default/page";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

// Axios-based data fetch
async function getUserData(username: string) {
  if (!username) return null;

  try {
    const res = await axios.get(
      `api/users/${username}`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );

    const data = res.data;

    return {
      ...data?.user,
      stats: data?.stats,
      social: data?.social,
      project: data?.project,
      setup: data?.setup,
      education: data?.education,
      experience: data?.experience,
      skills: data?.skills,
      theme: data?.theme,
      hasAccess: data?.hasAccess,
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

// Client-side component using Axios
export default function UserPage(props: any) {
  const username = props.params?.username;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserData(username);
      setUser(fetchedUser);
      setLoading(false);
    };

    if (username) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [username]);

  const stats = user?.stats || [];
  const social = user?.social || {};
  const project = user?.project || [];
  const education = user?.education || [];
  const experience = user?.experience || [];
  const skills = user?.skills || [];
  const setup = user?.setup || {};
  const theme = user?.theme || {};
  const hasAccess = user?.hasAccess || false;

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

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      {!hasAccess && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 h-fit p-4 mb-4 flex items-center justify-between border border-orange-400 shadow-md transition-all hover:shadow-lg cursor-pointer">
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
