import { useEffect, useState, useRef } from "react";
import BaseModal from "../Modal/BaseModal";
import GeneralButton from "../Buttons/GeneralButton";

export const DropdownPopField = ({
    value,
    placeholder,
    label,
    labelWeight,
    textColor,
    list,
    keyValue,
    keyLabel,
    onDropdownItemClick,
    multi,
    required,
    error,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} className="mb-4">
            <p className={`block tracking-wide ${error ? "text-red-500" : textColor ? textColor : "text-[#07638d]"} text-sm ${labelWeight ? labelWeight : "font-semibold"} mb-2`}>
                {label}{required ? '*' : ''}
            </p>
            <div className="relative mt-2">
                <button onClick={() => setOpen(!open)} type="button" className={`${multi && value.length > 0 ? 'flex gap-4' : ''} relative w-full cursor-default rounded-md bg-white h-[38px] py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ${error ? "ring-red-500" : "ring-gray-300"} focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}>
                    <p className={`${value ? "text-black" : "text-gray-400"}`}>
                        {value ? value?.[keyLabel] : placeholder}
                    </p>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
            </div>

            {
                open ? <BaseModal open={open}>
                    <p className="capitalize mb-2">Provider</p>
                    <div className="flex flex-col gap-2">
                        {
                            list.map((data) => {
                                return (
                                    <div className="gap-2 flex items-center border-[1px] border-gray-500 rounded p-2" onClick={() => {
                                        setOpen(false);
                                        onDropdownItemClick(data);
                                    }}>
                                        <div className="bg-black rounded-full h-[25px] w-[25px]" />
                                        <div>
                                            <p className="text-[#07638d]">{data.name}</p>
                                            <p className="text-sm text-gray-500">Rp. {data.price}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="mt-4">
                        <GeneralButton title={"Close"} onClick={() => setOpen(false)} loading={false} disable={false} />
                    </div>
                </BaseModal> : null
            }            
        </div>
    );
};


