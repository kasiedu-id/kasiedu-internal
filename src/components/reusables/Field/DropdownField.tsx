export const DropdownField = ({
  label,
  value,
  type,
  valueField,
  labelField,
  keyField,
  placeholder,
  collectionList,
  onChange,
  labelColor,
  labelWeight,
}: any) => {

  return (
    <div className="mb-4">
      <label className={`mb-2.5 block ${labelWeight ?? 'font-medium'}  ${labelColor ?? 'text-black'} dark:text-white`}>
        {label}
      </label>
      <div className="relative">
        <select
          className={`w-full capitalize rounded-lg border appearance-none border-stroke ${value ? "text-gray-700" : "text-gray-400"} bg-transparent py-4 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          id={`input-${label.replace(/ /g, "-")}`}
          defaultValue={value}
          onChange={onChange}
          value={value}
        >
          <option className="capitalize text-xs" disabled selected value={""}>
            {placeholder}
          </option>
          {collectionList.map((data: any) => {
            return (
              <option
                className="capitalize text-xs"
                key={data[keyField]}
                value={data[valueField]}
              >
                {data[labelField]}
              </option>
            );
          })}
        </select>


        <span className="absolute right-5 top-5">
          <svg
            className="fill-current h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </div>
    </div>
  );
};
