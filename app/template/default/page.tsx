"use client";
import { useEffect, useState } from 'react';
import React from "react";
import Hero from "../../../components/template/hero";
import AboutMe from "../../../components/template/aboutme";

import Projects from "../../../components/template/Projects";
import Experience from "../../../components/template/Experience";
import Education from "../../../components/template/education";
// import NavBar from "@/components/template/Navbar";
import Footer from "@/components/template/Footer";
import "./style.css";
import Skills from '@/components/template/Skills';



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
}: {
  user: any;
  stats: any;
  social: any;
  project: any;
  setup: any;
  education: any;
  experience: any;
  skills: any;
  theme: "dark" | "light";
  }) {
  
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    
  }, [theme]);
  


  return (
    <div>

      {/* <NavBar user={user} setup={setup} /> */}

      <section id="home">
        <Hero user={user} stats={stats} social={social} />
      </section>
      <section id="about">
        <AboutMe user={user} />
      </section>
      {setup.project && (
        <section id="projects">
          <Projects project={project} user={user} />
        </section>
      )}
      {setup.experience && (
        <section id="experience">
          <Experience experience={experience} />
        </section>
      )}
      {setup.education && (
        <section id="education">
          <Education education={education} />
        </section>
      )}
      {setup.skills && (
        <section id="skills"><Skills skills={skills} /> </section>
      )}
      
      
      <Footer setup={setup} />
    </div>
  );
}
