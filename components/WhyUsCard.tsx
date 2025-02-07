import React from "react";

const WhyUsCard = (props: { heading: string , description: string , numder: string , heading2: string}) => {
  return (
    <div className="bg-gray-100 p-5 rounded-[30px]">
      <h2 className="text-4xl md:text-6xl font-bold text-white text-end mb-[-30px] ">
        {props.numder}
      </h2>
      <h3 className="text-2xl lg:text-3xl  font-medium pb-2 ">
        {props.heading}<br />
        {props.heading2}
      </h3>
      <p className="text-base xl:text-lg">{props.description}</p>
    </div>
  );
};

export default WhyUsCard;
