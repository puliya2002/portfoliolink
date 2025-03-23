import React from "react";

const TextField = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  description,
  className,
  name,
  required,
}: {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: any;
  description?: string;
  className?: string;
  name?: string;
  required?: boolean;
}) => {
  return (
    <div className={label ? "pt-1" : "pt-0"}>
      {label && <label className="block">{label}</label>}
      <input
        type={type || "text"}
        className={`w-full form_input placeholder-gray-400 bg-gray-50 ${
          className || ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required} // Add required attribute
      />
      {description && <p className="form_description">{description}</p>}
    </div>
  );
};

export default TextField;
