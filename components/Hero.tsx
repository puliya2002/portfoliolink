import React from "react";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import hero from "../public/heroimg.png";

const Hero = () => {
  return (
    <div className="px-5">
      <div className="container mx-auto bg-white  rounded-[30px] flex flex-col md:flex-row px-8 pt-8 gap-5">
        <div className="md:w-3/5 justify-center flex flex-col">
          <h3 className="md:text-xl text-lg font-bold font-black ">
            Create. Customize. Share.
          </h3>
          <h1 className="lg:text-6xl md:text-4xl text-5xl font-bold font-black">
            Your Gateway<br /> to a Professional Online Presence
            <span className="text-[--primary]">.</span>
          </h1>
          <p className="pt-4  text-lg">
            Say goodbye to the hassle of building and managing a professional
            portfolio. PortfoliLink makes it easy for freelancers, job seekers,
            and small businesses to showcase their skills and accomplishments
            with an affordable, user-friendly platform.
          </p>
          <button className="bg-[--primary] flex w-fit text-lg gap-2 font-medium py-2 px-5 rounded-full mt-5 mb-5">
            <MoveRight />
            Create My Portfolio Now
          </button>
        </div>
        <div className="md:w-2/5  flex justify-bottom">
          <Image src={hero} alt="hero" width={600} height={600}></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
