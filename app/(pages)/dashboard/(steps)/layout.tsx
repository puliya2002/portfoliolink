"use client";
import ProgressSidebar from "@/components/ProgressSidebar";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation"; // Use `usePathname` for Next.js 13+

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const pathname = usePathname(); // Using `usePathname` to get the current path


  useEffect(() => {
    if (pathname) {
      // Extract the step number from the URL
      const match = pathname.match(/step(\d+)/);
      if (match) {
        setCurrentStep(Number(match[1]));
      }
    }
  }, [pathname]);

  return (
    <div className="main_margin">
      <div className="flex flex-col md:flex-row min-h-screen container mx-auto">
        {/* Sidebar */}
        <ProgressSidebar currentStep={currentStep} />

        {/* Main Content */}
        <div className="flex-1 p-4 pt-10">{children}</div>
      </div>
    </div>
  );
}
