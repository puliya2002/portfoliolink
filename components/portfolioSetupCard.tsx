import React from "react";
import { Switch } from "@/components/ui/switch";

const PortfolioSetupCard = ({
  heading,
  slug,
  isChecked,
  isDisabled,
}: {
  heading: string;
  slug: string;
  isChecked?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg flex justify-between ">
      <p className="text-[15px]">{heading}</p>
      <Switch
        id={slug}
        className=""
        defaultChecked={isChecked || false}
        disabled={isDisabled || false}
      />
    </div>
  );
};

export default PortfolioSetupCard;
