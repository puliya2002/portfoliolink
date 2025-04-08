// app/template/default/page.tsx
import { Suspense } from "react";
import DefaultTemplateClient from "./DefaultTemplateClient";

// This is your page component that Next.js will use
export default async function DefaultTemplatePage() {
  try {
    // Fetch your data and provide fallback default values
    const user = (await fetchUser()) || {};
    const stats = (await fetchStats()) || {};
    const social = (await fetchSocial()) || {};
    const project = (await fetchProjects()) || { projects: [] }; // Ensure projects array exists
    const setup = (await fetchSetup()) || {};
    const education = (await fetchEducation()) || { educations: [] }; // Ensure educations array exists
    const experience = (await fetchExperience()) || { experiences: [] }; // Ensure experiences array exists
    const skills = (await fetchSkills()) || {
      technicalSkills: [],
      softSkills: [],
      languages: [],
    }; // Ensure skills arrays exist

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
  } catch (error) {
    console.error("Error in DefaultTemplatePage:", error);
    // Return a fallback UI in case of errors
    return (
      <div>
        Something went wrong loading your profile. Please try again later.
      </div>
    );
  }
}

// These are placeholder functions - replace with your actual data fetching logic
// Make sure each function returns data with the expected structure
async function fetchUser() {
  // Return a basic user object with required fields
  return {
    name: "Default User",
    bio: "This is a default bio",
    // Add other required user fields
  };
}

async function fetchStats() {
  return {};
}

async function fetchSocial() {
  return {};
}

async function fetchProjects() {
  // Make sure to return an object with a projects array
  return {
    projects: [],
  };
}

async function fetchSetup() {
  // Include all flags needed by the template
  return {
    project: true,
    experience: true,
    education: true,
    skills: true,
  };
}

async function fetchEducation() {
  // Return an object with an educations array
  return {
    educations: [],
  };
}

async function fetchExperience() {
  // Return an object with an experiences array
  return {
    experiences: [],
  };
}

async function fetchSkills() {
  // Return an object with all needed skills arrays
  return {
    technicalSkills: [],
    softSkills: [],
    languages: [],
  };
}
  