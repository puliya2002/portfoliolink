// app/template/default/DefaultTemplateClient.tsx
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
  user: Record<string, any>;
  stats: Record<string, any>;
  social: Record<string, any>;
  project: Record<string, any>;
  setup: Record<string, any>;
  education: Record<string, any>;
  experience: Record<string, any>;
  skills: Record<string, any>;
  theme: "dark" | "light";
}

const DefaultTemplateClient: React.FC<DefaultTemplateProps> = ({
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

export default DefaultTemplateClient;
