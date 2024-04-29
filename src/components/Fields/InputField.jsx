export const InputSingleField = ({
  required,
  value,
  placeholder,
  type,
  onChange,
  label,
  labelColor,
  labelWeight,
  error,
  disable
}) => {

  return (
    <div className="mb-4">
      <p className={`block tracking-wide ${error ? "text-red-500" : labelColor ? labelColor : "text-[#28689B]"} text-sm ${labelWeight ? labelWeight : "font-semibold"} mb-2`}>
        {label}{required ? '*' : ''}
      </p>
      <input
        required={required}
        value={value}
        className={`w-full cursor-default rounded-md ${disable ? "bg-gray-200" : "bg-white"} h-[38px] py-2 px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ${error ? "ring-red-500" : "ring-gray-300"} focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"} sm:text-sm sm:leading-6`}
        type={type ?? "text"}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disable}
      />
    </div>
  );
};
