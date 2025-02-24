"use client";
import React from "react";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export const ProjectList = [
  {
    id: 1,
    title: "Sovereign Trust",
    image: "https://pulinduvidmal.com/assets/portfoliolink-2gqH6YEV.webp",
    skills: ["WordpPress", "Woocommerce", "Elementor", "JavaScript", "CSS"],
    ss: "https://pulinduvidmal.com/assets/portfoliolinkss-DJPfsH0X.webp",
    giturl: "",
    weburl: "https://sovereigntrustco.com/",
    description:
      "Project for a client based in the USA who runs a trust-based business. Wordpress-based project. Logo and all branding designed by me.",
  },
  {
    id: 2,
    title: "Sovereign Trust",
    image: "https://pulinduvidmal.com/assets/portfoliolink-2gqH6YEV.webp",
    skills: ["WordpPress", "Woocommerce", "Elementor", "JavaScript", "CSS"],
    ss: "https://pulinduvidmal.com/assets/portfoliolinkss-DJPfsH0X.webp",
    giturl: "",
    weburl: "https://sovereigntrustco.com/",
    description:
      "Project for a client based in the USA who runs a trust-based business. Wordpress-based project. Logo and all branding designed by me.",
  },
];

export default function Projects() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="d_container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Projects</h2>
      </motion.div>

      <div className="grid grid-col-1 sm:grid-cols-2 gap-3">
        {ProjectList.map((item: any) => (
          <motion.div
            key={item.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 1, delay: item.id * 0.1 }}
          >
            <ProjectCard
              id={item.id}
              name={item.title}
              image={item.image}
              skills={item.skills}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
