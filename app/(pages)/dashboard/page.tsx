"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfilePreview from "@/components/ProfilePreview";
import ProfileLink from "@/components/ProfileLink";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        setCurrentStep(response.data.currentstep);
        setCompleted(response.data.completed);
        setProfile(response.data.profile);
        
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
            <ProfileLink username={profile?.username} />
          </div>
        </div>
      </div>
    </div>
  );
}
