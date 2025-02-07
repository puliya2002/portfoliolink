import React from "react";
import { MoveRight } from "lucide-react";

const Button = (props: {
  text: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      type={props.type || "button"}
      className="bg-[--primary] flex w-fit text-md md:text-lg gap-2 font-medium py-2 px-5 rounded-full mt-5 mb-5 items-center 
      hover:bg-black hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
    >
      <MoveRight />
      <p>{props.text}</p>
    </button>
  );
};

export default Button;
