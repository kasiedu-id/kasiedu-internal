import React from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const SidebarModal = ({ sidebarOpen, setSidebarOpen, children, label }) => {
  return (
    <div className={`fixed ${sidebarOpen ? "-translate-x-0" : "translate-x-full"} duration-200 z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
      <div className={` ${sidebarOpen ? "-translate-x-0" : "translate-x-full"} duration-200 ease-linear relative ml-auto p-5 border w-full md:max-w-[550px] shadow-lg bg-white`}>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{label}</p>
          <AiOutlineCloseCircle onClick={setSidebarOpen} size={25} color={"black"} className="ml-auto cursor-pointer" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SidebarModal;