import React from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const Button = (props: {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  link?: string;
}) =>
{
  if (props.type === "submit") {
    return (
      <button
        type="submit"
        className="bg-[--primary] flex w-fit text-md gap-2 py-2 px-5 rounded-full mt-6 mb-5 items-center hover:bg-black hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <MoveRight />
        <p className="text-[15px]">{props.text}</p>
      </button>
    );
  }


  return (
    <Link href={props.link || "/register"}>
      <button
        type={props.type || "button"}
        className="bg-[--primary] flex w-fit text-md md:text-lg gap-2  py-2 px-6 rounded-full mt-5 mb-5 items-center 
      hover:bg-black hover:text-white hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <MoveRight />
        <p className="text-[16px] font-medium">{props.text}</p>
      </button>
    </Link>
  );
};

export default Button;
