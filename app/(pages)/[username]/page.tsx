import DefaultTemplate from "@/app/template/default/page";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

async function getUserData(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`,
    {
      cache: "no-store", // Ensures fresh data
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return {
    ...data.user,
    stats: data.stats,
    social: data.social,
    project: data.project,
    setup: data.setup,
    education: data.education,
    experience: data.experience,
    skills: data.skills,
    theme: data.theme,
    hasAccess : data.hasAccess
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;

  const user = await getUserData(username);

  const stats = user?.stats || [];
  const social = user?.social || {};
  const project = user?.project || [];
  const education = user?.education || [];
  const experience = user?.experience || [];
  const skills = user?.skills || [];
  const setup = user?.setup || {};
  const theme = user?.theme || {};
  const hasAccess = user?.hasAccess || false;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl"> User not found</p>
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
        theme={theme}
      />
    </div>
  );
}

