"use client";

import DefaultTemplate from "@/app/template/default/page";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  stats?: any[];
  social?: Record<string, string>;
  project?: any[];
  setup?: Record<string, any>;
  education?: any[];
  experience?: any[];
  skills?: any[];
  theme?: boolean;
  hasAccess?: boolean;
  [key: string]: any; // To accommodate other user properties
}

export default function UserPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { username } = params;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`
        );
        setUser({
          ...res.data?.user,
          stats: res.data?.stats,
          social: res.data?.social,
          project: res.data?.project,
          setup: res.data?.setup,
          education: res.data?.education,
          experience: res.data?.experience,
          skills: res.data?.skills,
          theme: res.data?.theme,
          hasAccess: res.data?.hasAccess,
        });
      } catch (err: any) {
        setError("Failed to load user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
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

  if (!user.project) {
    return <div>Project not found</div>;
  }

  const stats = user.stats || [];
  const social = user.social || {};
  const project = user.project || [];
  const education = user.education || [];
  const experience = user.experience || [];
  const skills = user.skills || [];
  const setup = user.setup || {};
  const theme = "dark" ;
  const hasAccess = user.hasAccess || false;

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
