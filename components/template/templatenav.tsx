"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Drawer from "./Drawers";

const TemplateNav = ({ user, setup }: any) => {

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(true);



  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= lastScrollY || currentScrollY === 0) {
      setScrollingUp(true);
    } else {
      setScrollingUp(false);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div
      className={` z-30 fixed w-full transition-transform duration-300 backdrop-blur-sm   ${
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className=" max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">

          <p className="text-2xl font-medium">{user.displayName}</p>

        <motion.div

          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Drawer setup={setup} />
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateNav;
