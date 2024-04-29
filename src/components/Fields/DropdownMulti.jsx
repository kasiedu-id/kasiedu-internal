import { useEffect, useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const DropdownMultiField = ({
    value,
    placeholder,
    label,
    labelWeight,
    textColor,
    list,
    keyValue,
    keyLabel,
    multi,
    onDropdownItemClick,
    onRemoveValue,
    required,
    error,
    disabled,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    const [limitShow, setLimitShow] = useState(2);

    useEffect(() => {
        if(window.innerWidth < 500){
            setLimitShow(1);
        }
    }, [])

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

    function dropdownClick(data){
        onDropdownItemClick(data);
        setOpen(false);
    }

    return (
        <div ref={wrapperRef} className="mb-4">
            <p className={`block tracking-wide ${error ? "text-red-500" : textColor ? textColor : "text-[#07638d]"} text-sm ${labelWeight ? labelWeight : "font-semibold"} mb-2`}>
                {label}{required ? '*' : ''}
            </p>
            <div className="relative mt-2">
                <button disabled={disabled} onClick={() => setOpen(!open)} type="button" className={`${multi && value.length > 0 ? 'flex gap-4' : ''} relative w-full cursor-default rounded-md ${disabled ? "bg-gray-200" : "bg-white"} h-[38px] py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ${error ? "ring-red-500" : "ring-gray-300"} focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-indigo-500" } focus:outline-none focus:ring-2 sm:text-sm sm:leading-6`}>
                    {
                        multi ? value.length > 0 ? value.map((data, index) => {
                            if(value.length > 1 && index === limitShow) {
                                return <p className={`capitalize ${data ? "text-white" : "text-gray-200"} px-2 bg-[#07638d] rounded flex items-center gap-2`}>
                                    +{value.length - limitShow}
                                </p>
                            } else if (index < limitShow) {
                                return <p onClick={() => onRemoveValue(index)} className={`capitalize ${data ? "text-white" : "text-gray-200"} px-2 bg-[#07638d] rounded flex items-center gap-2`}>
                                    {data?.[keyLabel]} <AiFillCloseCircle size={16} />
                                </p>
                            }

                            return null;
                        }) : <p className={`capitalize ${value ? "text-black" : "text-gray-400"}`}>
                            {placeholder}
                         </p> : <p className={`capitalize ${value ? "text-black" : "text-gray-400"}`}>
                            {value ? value?.[keyLabel] : placeholder}
                        </p>
                    }
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>
                <ul className={`${open ? "" : "hidden"} absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                    {
                        multi ? list?.length > 0 && list?.map((data) => {
                            const findIndx = value.findIndex((x ) => x.id === data.id);

                            if(findIndx !== -1) return (<li onClick={() => onRemoveValue(findIndx)} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">
                                <div className="flex items-center">
                                    {/* <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                    <span className="capitalize font-normal ml-3 block truncate">{data?.[keyLabel]}</span>
                                </div>
                                <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </li>)

                            return (<li onClick={() => dropdownClick(data)} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">
                                <div className="flex items-center">
                                    {/* <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                    <span className="capitalize font-normal ml-3 block truncate">{data?.[keyLabel]}</span>
                                </div>
                            </li>)
                        }) : list?.length > 0 && list?.map((data) => {
                            return (<li onClick={() => dropdownClick(data)} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">
                                <div className="flex items-center">
                                    {/* <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                    <span className="capitalize font-normal ml-3 block truncate">{data?.[keyLabel]}</span>
                                </div>
                                {
                                    data?.[keyValue] === value?.[keyValue] ? <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                        </svg>
                                    </span> : null
                                }
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    );
};


