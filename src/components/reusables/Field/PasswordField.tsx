import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
export const PasswordField = ({
    label,
    value,
    placeholder,
    onChange,
    labelColor
  }: any) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="w-full">
        <label
          className={`block tracking-wide text-${labelColor ?? "white"} text-xs font-bold mb-2`}
          htmlFor={`input-${label.replace(/ /g, "-")}`}
        >
          {label}
        </label>
        <div className="flex bg-gray-200 text-gray-700 border border-gray-200 rounded items-center">
            <input
            value={value}
            className="appearance-none block text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 py-2 px-1 leading-tight focus:outline-none"
            id={`input-${label.replace(/ /g, "-")}`}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            onChange={onChange}
            />
            <div className="mx-3" onClick={() => setVisible(!visible)}>
                {
                    visible ? <AiOutlineEyeInvisible  size={25}  color="black"/> : <AiOutlineEye size={25} color="black" />
                }
            </div>
        </div>
      </div>
    );
  };
  