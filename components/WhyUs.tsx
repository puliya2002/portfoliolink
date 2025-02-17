import React from "react";
import WhyUsCard from "./WhyUsCard";
import Button from "./Button";

const WhyUs = () => {
  return (
    <div className="px-5">
      <div className="container mt-4 py-8">
        <h2 className="">Why Choose PortfoliLink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 min-h-[1100px] md:min-h-[500px]">
          <WhyUsCard
            numder="01"
            heading="Simple"
            heading2="and Intuitive."
            description="Build your portfolio effortlessly with customizable templates tailored
        to your profession. No coding required!"
          />
          <WhyUsCard
            numder="02"
            heading="Affordable"
            heading2="Plans."
            description="Get started for just $2/month.
Hosting, templates, and mobile app access are all in-cluded."
          />
          <WhyUsCard
            numder="03"
            heading="Real-Time"
            heading2=" Updates."
            description="Update your portfolio on the go with our seamless web & mobile app."
          />
          <WhyUsCard
            numder="04"
            heading="Stand Out"
            heading2="Online."
            description="Update your portfolio on the go with our seamless mobile app."
          />
          <WhyUsCard
            numder="05"
            heading="Mobile"
            heading2="Application."
            description="Add & update latest projects on the go with our seamless mobile app."
          />
          <div className="bg-gray-100 p-5 rounded-[30px] text-center justify-center flex items-center lg:col-span-3">
            <Button type="button" text="Sign Up Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
