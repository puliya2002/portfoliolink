// pages/[username].tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultTemplate from "@/app/template/default/page";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

// Define types for each data structure
interface UserBasicData {
  username?: string;
  [key: string]: any;
}

interface ThemeData {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  layout?: string;
  [key: string]: any;
}

export default function UserPage() {
  const params = useParams();
  const username = params?.username as string;

  // Separate states for each data type
  const [user, setUser] = useState<UserBasicData>({});
  const [stats, setStats] = useState<any[]>([]);
  const [social, setSocial] = useState<Record<string, any>>({});
  const [project, setProject] = useState<any[]>([]);
  const [setup, setSetup] = useState<Record<string, any>>({});
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [theme, setTheme] = useState("dark");
  const [hasAccess, setHasAccess] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data at once but update separate states
  useEffect(() => {
    async function fetchAllUserData() {
      if (!username) {
        setLoading(false);
        setError("No username provided");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.status}`);
        }

        const data = await res.json();

        // Update all states with their respective data
        setUser(data?.user || {});
        setStats(data?.stats || []);
        setSocial(data?.social || {});
        setProject(data?.project || []);
        setSetup(data?.setup || {});
        setEducation(data?.education || []);
        setExperience(data?.experience || []);
        setSkills(data?.skills || []);

        // Special handling for theme to prevent errors
        setTheme(
          data?.theme || {
            primaryColor: "#4A90E2",
            secondaryColor: "#F5A623",
            fontFamily: "Inter",
            layout: "default",
          }
        );

        setHasAccess(data?.hasAccess || false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }

    fetchAllUserData();
  }, [username]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading user profile...</p>
      </div>
    );
  }

  // Error state
  if (error || !user || Object.keys(user).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">{error || "User not found"}</p>
      </div>
    );
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
        theme="dark"
      />
    </div>
  );
}
