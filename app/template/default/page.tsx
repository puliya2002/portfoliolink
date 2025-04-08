
"use client";

import { useEffect } from "react";
import React from "react";
import Hero from "../../../components/template/hero";
import AboutMe from "../../../components/template/aboutme";
import Projects from "../../../components/template/Projects";
import Experience from "../../../components/template/Experience";
import Education from "../../../components/template/education";
import TemplateNav from "@/components/template/templatenav";
import Footer from "@/components/template/Footer";
import Skills from "@/components/template/Skills";
import "./style.css";

interface DefaultTemplateProps {
  user: any; // Replace 'any' with a more specific type if you have one
  stats: any; // Replace 'any' with a more specific type
  social: any; // Replace 'any' with a more specific type
  project: any; // Replace 'any' with a more specific type
  setup: any; // Replace 'any' with a more specific type
  education: any; // Replace 'any' with a more specific type
  experience: any; // Replace 'any' with a more specific type
  skills: any; // Replace 'any' with a more specific type
  theme: any; // Replace 'any' with a more specific type
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({
  user,
  stats,
  social,
  project,
  setup,
  education,
  experience,
  skills,
  theme,
}) => {
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

   if (!project) {
     return <div>Project not found</div>;
   }

  return (
    <div>
      <TemplateNav user={user} setup={setup} />
      <section id="home">
        <Hero user={user} stats={stats} social={social} />
      </section>
      <section id="about">
        <AboutMe user={user} />
      </section>
      {setup?.project && (
        <section id="projects">
          <Projects project={project} user={user} />
        </section>
      )}
      {setup?.experience && (
        <section id="experience">
          <Experience experience={experience} />
        </section>
      )}
      {setup?.education && (
        <section id="education">
          <Education education={education} />
        </section>
      )}
      {setup?.skills && (
        <section id="skills">
          <Skills skills={skills} />
        </section>
      )}
      <Footer setup={setup} />
    </div>
  );
};

export default DefaultTemplate;
