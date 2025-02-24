import React from 'react'
import { motion } from "framer-motion";

const KeyCard = ({heading,discription}: {heading: string , discription: string}) => {
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
  return (
    <motion.div className="h-40 sm:h-auto hero-card" variants={springAnimation}>
      <div className="p-5 sm:py-10">
        <p className=" text-5xl sm:text-4xl lg:text-5xl ">{heading}+</p>
        <p className="text-[21px] sm:text-lg lg:text-2xl pt-2 opacity-65 " style={{ lineHeight: "1.1" }}>
          {discription}
        </p>
      </div>
    </motion.div>
  );
}

export default KeyCard