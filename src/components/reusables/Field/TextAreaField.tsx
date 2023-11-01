import React from "react";

export const TextAreaField = ({
  label,
  value,
  onChange,
  labelWeight,
  labelColor
}) => {
  return (
    <div className="mb-4">
      <label className={`mb-2.5 block ${labelWeight ?? 'font-medium'}  ${labelColor ?? 'text-black'} dark:text-white`}>
        {label}
      </label>
      <textarea
        id={`input-${label.replace(/ /g, "-")}`}
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        rows={4}
        cols={50}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
