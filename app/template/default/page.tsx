// app/template/default/page.tsx
import { Suspense } from "react";
import DefaultTemplateClient from "./DefaultTemplateClient";

// This is your page component that Next.js will use
export default async function DefaultTemplatePage() {
  // Here you would fetch your data from your API or other sources
  const user = await fetchUser();
  const stats = await fetchStats();
  const social = await fetchSocial();
  const project = await fetchProjects();
  const setup = await fetchSetup();
  const education = await fetchEducation();
  const experience = await fetchExperience();
  const skills = await fetchSkills();

  // Default theme or you could get it from user preferences
  const theme = "light";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultTemplateClient
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
    </Suspense>
  );
}

// These are placeholder functions - replace with your actual data fetching logic
async function fetchUser() {
  return {};
}
async function fetchStats() {
  return {};
}
async function fetchSocial() {
  return {};
}
async function fetchProjects() {
  return {};
}
async function fetchSetup() {
  return {};
}
async function fetchEducation() {
  return {};
}
async function fetchExperience() {
  return {};
}
async function fetchSkills() {
  return {};
}
