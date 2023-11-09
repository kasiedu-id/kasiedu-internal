export const IconField = ({
    label,
    value,
    type,
    icon,
    placeholder,
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
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-3 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />

                <span className="absolute right-4 top-4">
                    {icon}
                </span>
            </div>
        </div>
    );
};
