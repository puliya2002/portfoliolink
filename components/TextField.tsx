import React from 'react'

const TextField = (props : any) => {
  return (
    <div>
      <label
        htmlFor={props.slug}
        className="block text-md font-medium pl-1 pt-4"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.slug}
        placeholder={props.placeholder}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg h-14 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent bg-gray-50 "
              
      />
    </div>
  );
}

export default TextField