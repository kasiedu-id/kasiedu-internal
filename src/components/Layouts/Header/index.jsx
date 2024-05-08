import React from 'react';
import DropdownUser from "./DropdownUser";
import FeederLogo from '../../../assets/logo/logo.png';

const Header = ({
  sidebarOpen,
  setSidebarOpen
}) => {

  return (
    <header className="sticky top-0 z-[10] flex w-full bg-white shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 lg:py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex flex-1 items-center gap-2 sm:gap-4 lg:hidden py-4">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[99999] block rounded-sm border border-stroke bg-white p-2 shadow-sm border-strokedark bg-boxdark lg:hidden"
          >
            <span className="relative block h-5 w-5 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 block h-[4px] w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[4px] w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[4px] w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2 top-0 block h-full w-[4px] rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2 block h-[4px] w-full rounded-sm bg-black duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <a className="block w-full flex-shrink-0 lg:hidden" href="/">
            <img
              src={FeederLogo}
              alt="Logo"
              className="h-[40px] mx-auto "
            />
          </a>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
