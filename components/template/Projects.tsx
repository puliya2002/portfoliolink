"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { motion } from "framer-motion";

// components/template/Projects.tsx

export default function Projects({ project, user }: any) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (project && Array.isArray(project) && project.length > 0) { // Add checks here
      localStorage.setItem("projects", JSON.stringify(project));
    }
  }, [project]);

  return (
    <div className="d_container">
      {/* Motion applied on the section title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Projects</h2>
      </motion.div>

      {project && Array.isArray(project) && project.length > 0 ? ( // Check before rendering the grid
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.map((item: Record<string, any>, index: number) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <ProjectCard
                id={index}
                name={item.title}
                image={item.coverPhoto}
                skills={item.technologies}
                username={user?.username} // Add a check here as well
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No projects available.</p> // Or some other fallback UI
      )}
    </div>
  );
}
