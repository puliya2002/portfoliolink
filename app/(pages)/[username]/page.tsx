"use client";

import DefaultTemplate from "@/app/template/default/page";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
  // Define the structure of your user data here
  stats?: any[];
  social?: Record<string, string>;
  project?: any[];
  education?: any[];
  experience?: any[];
  skills?: any[];
  setup?: Record<string, any>;
  theme?: "dark" | "light" | undefined; 
  hasAccess?: boolean;
  [key: string]: any; // To allow other properties
}

export default function UserPage(props: { params: { username: string } }) {
  const { username } = props.params || {};
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData(username: string) {
      if (!username) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`
        );

        if (!res.ok) {
          const errorData = await res.json();
          setError(
            errorData?.message ||
              `Failed to fetch user data (status: ${res.status})`
          );
          setUser(null);
        } else {
          const data = await res.json();
          setUser({
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
          });
          setError(null);
        }
      } catch (e: any) {
        setError(
          e.message || "An unexpected error occurred while fetching user data."
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData(username);
  }, [username]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
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
    stats = [],
    social = {},
    project = [],
    education = [],
    experience = [],
    skills = [],
    setup = {},
    theme = "dark" ,
    hasAccess = false,
  } = user;

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
