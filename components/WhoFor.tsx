import React from "react";
import Image from "next/image";
import hero from "../public/heroimg.png";
import Who from "../public/whoimg.jpg";

const WhoFor = () => {
  return (
    <div className="px-5">
      <div className="container mx-auto flex flex-col md:flex-row mt-4 py-8 gap-8">
        <div className="md:w-2/5 flex items-start">
          <Image
            src={Who}
            alt="hero"
            width={560}
            height={560}
            className="rounded-[20px]"
          />
        </div>
        <div className="md:w-3/5 justify-center flex flex-col lg:pr-20">
          <h2 className="pb-3">Who is it for?</h2>
          <ul style={{ listStyle: "disc" }} className="text-base lg:text-lg pl-5 ">
            <li>
              Professionals looking for a way to showcase their work and skills.
            </li>
            <li>
              Freelancers and Creatives looking for a platform to share their
              work.
            </li>
            <li>
              Jobb Seekers and Entrepreneurs looking for a way to stand out.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhoFor;
