
import React from "react";
import { Switch } from "@/components/ui/switch";

const PortfolioSetupCard = ({
  heading,
  value,


  isDisabled,
  ...props


}: {
  heading: string;
    value: string;


    isDisabled?: boolean;
  [key: string]: any;

}) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg flex justify-between ">
      <p className="text-[15px]">{heading}</p>
      <Switch
        id={value}
        className=""


        disabled={isDisabled || false}
        {...props}
        
 
        
      />
    </div>
  );
};

export default PortfolioSetupCard;
