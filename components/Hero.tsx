import React from "react";

import Image from "next/image";
import hero from "../public/heroimg.png";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="main_margin">
      <div className="container mx-auto  flex flex-col md:flex-row  pt-8 gap-5">
        <div className="md:w-3/5 justify-center flex flex-col lg:pr-20">
          <h4 className="md:text-xl text-md md:text-lg font-bold font-black ">
            Create. Customize. Share.
          </h4>
          <h1 className="">
            Your Gateway
            <br /> to a Professional Online Presence
            <span className="text-[--primary]">.</span>
          </h1>
          <p className="pt-4">
            Say goodbye to the hassle of building and managing a professional
            portfolio. PortfoliLink makes it easy for freelancers, job seekers,
            and small businesses to showcase their skills and accomplishments
            with an affordable, user-friendly platform.
          </p>
          <Button type="button" text="Create my Portfolio Now" />
        </div>
        <div className="md:w-2/5  flex items-end">
          <Image src={hero} alt="hero" width={560} height={560}></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
