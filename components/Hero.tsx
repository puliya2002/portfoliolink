import React from "react";
import Image from "next/image";

import Button from "./ui/Button";
import Person from "../public/person.png";
import Yellow from "../public/yellow.png";
import Text from "../public/text.png";

const Hero = () => {
  return (
    <div className="main_margin">
      <div className="container mx-auto pt-8 flex flex-col md:flex-row gap-5">
        {/* Text Content */}
        <div className="w-full md:w-3/5 justify-center flex flex-col lg:pr-20 mb-12 md:mb-0">
          <h4 className="text-md md:text-lg lg:text-xl font-bold font-black">
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
          <div className="mt-6">
            <Button type="button" text="Create my Portfolio Now" />
          </div>
        </div>

        {/* Image Container - Fixed */}
        <div className="w-full md:w-2/5 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] flex items-end min-h-[75vh]">
          <div className="w-full h-full relative">
            <Image
              className="absolute bottom-0 left-0 w-full  object-contain animate-rotate z-0 max-h-[550px] "
              src={Text}
              alt="Text background"
              priority
            />
            <Image
              className="absolute bottom-0 left-0 w-full object-contain z-1 max-h-[550px]"
              src={Yellow}
              alt="Yellow accent"
              priority
            />
            <Image
              className="absolute bottom-0 left-0 w-full object-contain z-3 "
              src={Person}
              alt="Person"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
