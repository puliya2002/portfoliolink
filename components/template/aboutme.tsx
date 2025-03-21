"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {  Twitter } from "lucide-react"; // Lucide icons

function AboutMe({user}: any) {
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
        <h2 className="text-start pb-2">About Me</h2>
      </motion.div>

      <motion.p
        className="text-3xl text-gray-300/70 mb-4 text-start font-regular"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        {user.about}
      </motion.p>

      {/* Example of using Image and icons */}
    </div>
  );
}

export default AboutMe;
