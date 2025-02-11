import React from "react";

interface TextFieldProps {
  label: string;
  type: string;
  slug: string;
  placeholder: string;
  error?: any;
  [key: string]: any; // This allows us to pass props like "register" from react-hook-form
}

const TextField = ({ label, error, ...props }: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.slug} className="block text-sm pl-1 pt-4">
        {label}
      </label>
      <input
        {...props}
        className="text-[15px] w-full p-3 mt-1 border border-gray-300 rounded-lg h-13 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent bg-gray-50"
      />
      {error && <span className="text-red-500 text-[13px]">{error.message}</span>}
    </div>
  );
};

export default TextField;
