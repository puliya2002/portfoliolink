import React from "react";

interface TextFieldProps {
  label: string;
  type: string;
  slug: string;
  placeholder: string;
  error?: any;
  [key: string]: any; 
}

const TextField = ({ label, error, ...props }: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={props.slug} className="block text-sm pl-1 pt-4">
        {label}
      </label>
      <input
        {...props}
        className="text-[15px] w-full p-3 mt-1 border border-gray-300 rounded-lg h-13 focus:outline-none focus:ring-[1.3px] focus:ring-[--primary] focus:border-transparent bg-gray-50"
      />
      {error && (
        <span className="text-red-500 text-[13px]">{error.message}</span>
      )}
    </div>
  );
};

export default TextField;
