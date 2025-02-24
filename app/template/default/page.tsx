import React from "react";
import Hero from "../../../components/template/hero";
import AboutMe from "../../../components/template/aboutme";
import "./style.css";
import Projects from "../../../components/template/Projects";
import Experience from "../../../components/template/Experience";

interface DefaultTemplateProps {
  userData: {
    username: string;
    displayName: string;
    bio: string;

  };
}

export default function DefaultTemplate({ userData }: DefaultTemplateProps) {
  return (
    <div>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>

      </div>
      <Hero />
      <AboutMe />
      <Projects />
      <Experience />
    </div>
  );
}
