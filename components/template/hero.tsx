"use client";

import Image from "next/image";
import { motion,  } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Facebook,
  Github,
  Linkedin,
  Instagram,

  ArrowRight,
  ArrowDownRight,
} from "lucide-react";
import Keycard from "@/components/template/KeyCard";
import SocialMedia from "./SocialMedia";


export interface SocialLink {
  icon: "Linkedin" | "Facebook" | "Instagram" | "Github";
  link: string;
}



const fadeLeft = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
};

const fadeUp = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0, transition: { duration: 1 } },
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



const Hero = ({ user, stats, social }: { user: any, stats: any, social: any }) => {
  const router = useRouter();

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = "/pulindu_vidmal_software_engineer_resume.pdf";
  //   link.download = "pulindu_vidmal_software_engineer_resume.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <section className=" flex items-center">
      <div className="d_container z-10">
        <motion.h1
          className="mb-3 "
          initial="initial"
          animate="animate"
          variants={fadeLeft}
        >
          {`Hi, I am ${user.displayName}`}
        </motion.h1>
        <motion.div
          className=""
          initial="initial"
          animate="animate"
          variants={fadeUp}
        >
          <p className="text-3xl mb-10 opacity-65">{user.tagline}</p>
        </motion.div>
        <motion.div
          className="grid grid-col-1 sm:grid-cols-3 gap-3"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.05 }}
        >
          <motion.div
            className="hero-card row-span-2"
            variants={springAnimation}
          >
            <Image
              className="object-cover sm:max-h-100 w-full p-6 rounded-[35px]"
              src={user.picture}
              alt="profile"
              width={500}
              height={500}
              priority
            />
          </motion.div>
          {stats.map((stat: any, index: number) => (
            <div key={index}>
              <Keycard heading={stat.value} discription={stat.title} />
            </div>
          ))}

          <motion.div
            className="h-40 sm:h-auto hero-card click cursor-pointer"
            whileHover={{ scale: "0.9" }}
            variants={springAnimation}
            // onClick={() => router.push("/contact")}
          >
            <div className="flex-row flex justify-between items-center">
              <p className="text-2xl sm:text-lg lg:text-2xl">Contact Now</p>
              <div className="ml-2 cursor-pointer size-auto p-1 border-[2px] border-gray-500 rounded-full hover:bg-gradient-to-tr from-gray-700/20 to-gray-500/50">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
            <SocialMedia social={social} />

          <motion.div
            className="gap-3 hero-card sm:col-span-2 h-[80px] sm:h-auto cursor-pointer"
            variants={springAnimation}
            // onClick={handleDownload}
            whileHover={{ scale: "0.95" }}
          >
            <div className="flex-row flex justify-between items-center ">
              <p className="text-2xl sm:text-lg lg:text-xl p-3">Download CV</p>
              <div className="ml-2 cursor-pointer size-auto p-1 border-[2px] border-gray-600 rounded-full hover:bg-gradient-to-tr from-gray-700/20 to-gray-500/50">
                <ArrowDownRight className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
