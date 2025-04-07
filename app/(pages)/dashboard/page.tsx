"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfilePreview from "@/components/ProfilePreview";
import ProfileLink from "@/components/ProfileLink";
import axios from "axios";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import PortalButton from "@/components/PortalButton";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentstep, setCurrentStep] = useState(7);
  const [completed, setCompleted] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    displayName: "",
    about: "",
    tagline: "",
  });
  const[hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        setCurrentStep(response.data.currentstep);
        setCompleted(response.data.completed);
        setProfile(response.data.profile);
        setHasAccess(response.data.hasAccess);
        
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.error);
      });
  }, []);

  // Handle navigation inside useEffect
  useEffect(() => {
    if (!session) return;

    if (!completed && currentstep < 6) {
      router.push(`/dashboard/step${currentstep}`);
    }
  }, );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>You must be logged in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="main_margin">
      <div className="container min-h-screen mx-auto pt-5">
        <h2>
          Dashboard<span className="text-[--primary]">.</span>
        </h2>
        <p className="text-xl">Welcome, {session.user?.name} !!</p>
        <div className="flex flex-col lg:flex-row gap-4 pt-5">
          <div className="col w-full lg:w-2/3">
            <ProfilePreview profile={profile || { username: "" }} />
          </div>
          <div className="col w-full lg:w-1/3">
            {hasAccess ? (
              <div className="bg-emerald-500 h-fit rounded-xl p-4 mb-4 flex items-center justify-between border-2 border-emerald-400 shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-white" size={24} />
                  <h2 className="text-lg font-medium text-white">
                    Premium Activated
                  </h2>
                </div>
                <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-1 rounded-full">
                  ACTIVE
                </span>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 h-fit rounded-xl p-4 mb-4 flex items-center justify-between border border-orange-400 shadow-md transition-all hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <AlertCircle className="text-white" size={24} />
                  <h2 className="text-lg font-medium text-white">
                    Activate Premium
                  </h2>
                </div>
                <Link href="/pricing">
                  <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    UPGRADE
                  </span>
                </Link>
              </div>
            )}
            <PortalButton />

            <ProfileLink username={profile?.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
