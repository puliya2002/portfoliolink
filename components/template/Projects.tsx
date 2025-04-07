"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Projects({ project, user }: any) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (project.length > 0) {
      localStorage.setItem("projects", JSON.stringify(project));
    }
  }, [project]);

  return (
    <div className="d_container">
      {/* Motion applied on the section title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Projects</h2>
      </motion.div>

      {project.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Loop through each project item */}
          {project.map((item: any, index: any) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Animation triggers only once when fully in view
              variants={fadeInUp}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <ProjectCard
                id={index}
                name={item.title}
                image={item.coverPhoto}
                skills={item.technologies}
                username={user.username}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
