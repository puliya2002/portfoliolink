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
import "./style.css";
import Skills from "@/components/template/Skills";


interface DefaultTemplateProps {
  user: Record<string, any>; // Accepts an object with any properties
  stats: Record<string, any>; // Accepts an object with any properties
  social: Record<string, any>; // Accepts an object with any properties
  project: Record<string, any>; // Accepts an object with any properties
  setup: Record<string, any>; // Accepts an object with any properties
  education: Record<string, any>; // Accepts an object with any properties
  experience: Record<string, any>; // Accepts an object with any properties
  skills: Record<string, any>; // Accepts an object with any properties
  theme: "dark" | "light"; // Either dark or light theme
}

export default function DefaultTemplate({
  user,
  stats,
  social,
  project,
  setup,
  education,
  experience,
  skills,
  theme,
}: DefaultTemplateProps) {
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
          <Skills skills={skills} />{" "}
        </section>
      )}

      <Footer setup={setup} />
    </div>
  );
}
