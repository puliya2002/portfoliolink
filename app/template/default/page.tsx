import React from "react";
import Hero from "../../../components/template/hero";
import AboutMe from "../../../components/template/aboutme";
import "./style.css";
import Projects from "../../../components/template/Projects";
import Experience from "../../../components/template/Experience";



export default function DefaultTemplate({ user, stats, social}: { user: any, stats: any, social: any }) {
  return (
    <div>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", }}></div>
      <Hero user={user} stats={stats} social={social} />
      <AboutMe user={user} />
      <Projects />
      <Experience />
    </div>
  );
}
