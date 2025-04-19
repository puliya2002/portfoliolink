"use client";
import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Projects = ({ project, user }: { project?: any; user?: any }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (project && Array.isArray(project) && project.length > 0) {
      localStorage.setItem("projects", JSON.stringify(project));
    }
  }, [project]);

  if (!project || !Array.isArray(project)) {
    return <p>No projects available.</p>;
  }


   if (!project) {
     return <div>Project not found</div>;
   }
  return (
    <div className="d_container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Projects</h2>
      </motion.div>

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
              skills={item.technologies || []}
              username={user?.username}
              discription={item.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
