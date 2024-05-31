import { MdOutlineClose } from "react-icons/md";


function BaseModal({ open, title, onClose, children }) {
    return (
        <div className={`fixed ${open ? "" : "hidden"} z-[1000] inset-0 p-5 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
            <div className="relative mx-auto p-5 border w-[90%] max-w-[550px] shadow-lg md:max-w-[600px] rounded-md bg-white">
                <div className="grid grid-cols-3 mt-4">
                    <div />
                    <p className="text-center font-semibold">{title}</p>
                    <div className="flex justify-end items-center" onClick={onClose}>
                        <MdOutlineClose size={20} color="black" />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default BaseModal;
