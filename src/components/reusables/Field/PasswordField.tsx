import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export const PasswordField = ({
    label,
    value,
    placeholder,
    onChange,
    labelColor,
    labelWeight,
}: any) => {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-6">
            <label className={`mb-2.5 block ${labelWeight ?? 'font-medium'} ${labelColor ?? 'text-black'} dark:text-white`}>
                {label}
            </label>
            <div className="relative">
                <input
                    onChange={onChange}
                    value={value}
                    type={show ? "text" :"password"}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <span className="absolute right-4 top-4 cursor-pointer z-1" onClick={() => setShow(!show)}>
                    {
                        !show ? <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            stroke='gray'
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> : <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            stroke='gray'
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }

                </span>
            </div>
        </div>
    );
};
