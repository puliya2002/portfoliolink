import React from "react";

const TextField = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  discription,
  className,
}: {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: any;
  discription?: string;
  className?: string;
}) => {
  return (
    <div className={label ? "pt-1" : "pt-0"}>
      <label className="block ">{label}</label>
      <input
        type={type || "text"}
        className={`w-full form_input placeholder-gray-400 bg-gray-50 ${
          className || ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="form_discription">{discription}</p>
    </div>
  );
};

export default TextField;
