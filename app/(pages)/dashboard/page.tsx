"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfilePreview from "@/components/ProfilePreview";
import profileLink from "@/components/ProfileLink"
import ProfileLink from "@/components/ProfileLink";

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
    <div className="main_margin">
      <div className="container min-h-screen mx-auto pt-5">
        <h2>
          Dashbaord<span className="text-[--primary]">.</span>
        </h2>
        <p className="text-xl">Welcome, {session.user?.name} !!</p>
        <div className="flex flex-col lg:flex-row  gap-4 pt-5 ">
          <div className="col w-full lg:w-2/3">
            <ProfilePreview />
          </div>
          <div className="col w-full lg:w-1/3 ">
            <ProfileLink />
          </div>
        </div>
      </div>
    </div>
  );
}
