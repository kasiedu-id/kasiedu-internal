import React from "react";

export const TextAreaField = ({
  label,
  value,
  onChange,
  labelWeight,
  labelColor,
  notes,
  placeholder,
  error,
  required
}) => {
  return (
    <div className="mb-4">
      <p className={`block tracking-wide ${error ? "text-red-500" : labelColor ? labelColor : "text-[#28689B]"} text-sm ${labelWeight ? labelWeight : "font-semibold"} mb-2`}>
        {label}{required ? '*' : ''}
      </p>
      <textarea
        className={`w-full cursor-default rounded-md bg-white min-h-[100px] max-h-[200px] py-2 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ${error ? "ring-red-500" : "ring-gray-300"} focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"}  sm:text-sm sm:leading-6`}
        rows={4}
        cols={50}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      <p className="text-gray-500 text-xs">{notes}</p>
    </div>
  );
};
