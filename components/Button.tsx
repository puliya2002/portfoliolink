import React from 'react'
import { MoveRight } from "lucide-react";

const Button = (props: { text: string }) => {
  return (
    <button className="bg-[--primary] flex w-fit text-md md:text-lg gap-2 font-medium py-2 px-5 rounded-full mt-5 mb-5 items-center ">
      <MoveRight />
      <p>{props.text}</p>
    </button>
  );
}

export default Button