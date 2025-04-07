import React from 'react'
import { motion } from "framer-motion";

const Skills = ({ skills }: any) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="d_container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Skills</h2>
      </motion.div>
      <ul className="flex gap-5 justify-center flex-wrap">
        {skills &&
          skills.map((skill: any, index: any) => (
            <li
              key={index}
              className="p-2 px-8 bg-gray-600/30 rounded border border-gray-600/60 hover:bg-gradient-to-tr from-gray-700/20 to-gray-500/50"
            >
              {skill.name}
            </li>
          ))}
      </ul>


    </div>
  );
};

export default Skills