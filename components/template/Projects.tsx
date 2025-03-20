"use client";
import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function Projects({ project }: any) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="d_container" key={project.length}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Projects</h2>
      </motion.div>

      {project.length > 0 && (
        <div className="grid grid-col-1 sm:grid-cols-2 gap-3">
          {project.map((item: any, index: any) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={fadeInUp}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <ProjectCard
                id={index}
                name={item.title}
                image={item.coverPhoto}
                skills={item.technologies}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
