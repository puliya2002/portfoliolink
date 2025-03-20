import React from "react";
import Hero from "../../../components/template/hero";
import AboutMe from "../../../components/template/aboutme";
import "./style.css";
import Projects from "../../../components/template/Projects";
import Experience from "../../../components/template/Experience";
import Education from "../../../components/template/education";



export default function DefaultTemplate({ user, stats, social, project, setup}: { user: any, stats: any, social: any, project: any, setup: any }) {
  return (
    <div>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}></div>
      <Hero user={user} stats={stats} social={social} />
      <AboutMe user={user} />
      {setup.project && <Projects project={project} />}
      {setup.experience && <Experience />}
      {setup.education && <Education />}
    </div>
  );
}
