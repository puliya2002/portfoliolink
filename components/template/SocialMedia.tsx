import React from "react";
import { Facebook, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const springAnimation = {
  initial: { scale: 0.5, y: 50, opacity: 0 },
  animate: { scale: 1, y: 0, opacity: 1 },
  transition: {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  },
};

const SocialMedia = ({ social }: { social: any }) => {
  return (
    <div className="flex gap-3 sm:gap-1 md:gap-2 lg:gap-3  items-center justify-center flex-row gap-5">
      {social.linkedin && (
        <motion.div variants={springAnimation}>
          <div className="flex flex-cols-5 gap-3 sm:gap-1 md:gap-2 lg:gap-3  items-center justify-center">
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="hero-card aspect-square cursor-pointer p-4 sm:p-3 lg:p-4"
                whileHover={{ scale: "0.9" }}
              >
                <Linkedin />
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
      {social.github && (
        <motion.div variants={springAnimation}>
          <div className="flex flex-cols-5 gap-3 sm:gap-1 md:gap-2 lg:gap-3  items-center justify-center">
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="hero-card aspect-square cursor-pointer p-4 sm:p-3 lg:p-4"
                whileHover={{ scale: "0.9" }}
              >
                <Github />
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
      {social.facebook && (
        <motion.div variants={springAnimation}>
          <div className="">
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <motion.div
                className="hero-card aspect-square cursor-pointer p-4 sm:p-3 lg:p-4"
                whileHover={{ scale: "0.9" }}
              >
                <Facebook />
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
      {social.instagram && (
        <motion.div variants={springAnimation}>
          <div className="flex flex-cols-5 gap-3 sm:gap-1 md:gap-2 lg:gap-3  items-center justify-center">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                className="hero-card aspect-square cursor-pointer p-4 sm:p-3 lg:p-4"
                whileHover={{ scale: "0.9" }}
              >
                <Instagram />
              </motion.div>
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );};

export default SocialMedia;
