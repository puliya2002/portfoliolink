import React from "react";
import { Facebook, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

interface IconMap {
  [key: string]: React.ComponentType<any>;
}

const iconMap: IconMap = {
  Linkedin: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
  Github: Github,
};


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

const SocialMedia = ({ links }: { links: any }) => {

  return (
    <motion.div variants={springAnimation}>
      <div className="flex flex-cols-5 gap-3 sm:gap-1 md:gap-2 lg:gap-3  items-center justify-center">
        {links.map(
          ({ icon, link }: { icon: string; link: string }, index: number) => {
            const IconComponent = iconMap[icon]; // Get the icon component dynamically
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="hero-card aspect-square cursor-pointer p-4 sm:p-3 lg:p-4" 
                  whileHover={{ scale: "0.9" }}
                >
                  <IconComponent className="h-7 w-7" />
                </motion.div>
              </a>
            );
          }
        )}
      </div>
    </motion.div>
  );
};

export default SocialMedia;
