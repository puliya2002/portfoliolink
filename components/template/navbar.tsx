"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Drawer from "./Drawers";



const TemplateNav = ({user, setup}:any) => {
    const [open, setOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollingUp, setScrollingUp] = useState(true);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

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
        <a href={`/${user.username}`} className="flex items-center">
          <p className="text-2xl font-medium">{user.displayName}</p>
        </a>
        <motion.div
          className={`${open ? "opacity-0" : "flex"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >

          <Drawer setup={setup} />
        </motion.div>
      </div>
    </div>
  );
}

export default TemplateNav;
