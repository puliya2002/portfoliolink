"use client";
import { motion } from "framer-motion";



function AboutMe({ user }: any) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="d_container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Adjusts when the animation starts
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="text-start pb-2">About Me</h2>
      </motion.div>

      <div className="opacity-65">
        <motion.p
          className="text-2xl lg:text-3xl mb-4 text-start font-regular"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Ensure element is in view before animation triggers
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.1 }}
        >
          {user.about}
        </motion.p>
      </div>

      {/* Example of using Image and icons */}
    </div>
  );
}

export default AboutMe;
