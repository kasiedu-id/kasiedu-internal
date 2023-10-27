import React, { useEffect, useRef, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import KasiEduLogo from '../../../assets/logo/Logo-KasiEdu.png';
import { useLocation } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const query = 'page=1&limit=20'

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-1 flex h-screen w-72.5 flex-col overflow-y-hidden bg-sky-950 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mx-auto">
        <a href="/">
          <img
            width={176}
            height={32}
            src={KasiEduLogo}
            alt="Logo"
          />
        </a>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <a
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === "/dashboard" &&
                    "bg-graydark dark:bg-meta-4"
                    }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                      strokeWidth="2"
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                      strokeWidth="2"
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                      strokeWidth="2"
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                      strokeWidth="2"
                    />
                  </svg>
                  Dashboard
                </a>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Vocation --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/vocations" || pathname.includes("vocations")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/vocations" ||
                          pathname.includes("vocations")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 22 22"
                          fill="none"
                          strokeWidth={'1px'}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.673 5.606a3326.02 3326.02 0 0 1-5.671-2.674L.138 8.524l2.03.98L2 9.531V20h1v-9.626l.72-.124.28.135v5.288c0 .914 5.206 3.533 6.249 4.049a3.89 3.89 0 0 0 3.48-.026C20 16.486 20 15.895 20 15.673v-5.288l3.854-1.857s-3.8-1.801-6.181-2.922zM19 15.504a51.526 51.526 0 0 1-5.726 3.302 2.884 2.884 0 0 1-2.582.02A40.184 40.184 0 0 1 5 15.521v-4.655l7 3.373 7-3.373zm-7-2.373L5.416 9.958l6.469-1.115-.17-.987-7.85 1.354-1.403-.676 9.537-4.495c.825.393 8.523 4.014 9.542 4.494z" fill="" stroke="white" strokeWidth="1" />
                          <path fill="" d="M0 0h24v24H0z" strokeWidth="1" />
                        </svg>
                        Vocation
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href={`/vocations?${query}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/vocations" && "text-white"
                                } `}
                            >
                              List
                            </a>
                          </li>
                          <li>
                            <a
                              href="/vocations/archive?page=1&limit=20"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/vocations/archive" && "text-white"
                                } `}
                            >
                              Archive
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Vocation --> */}

              {/* <!-- Menu Item Class --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/classes" || pathname.includes("classes")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/classes" ||
                          pathname.includes("classes")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                            fill=""
                          />
                          <path
                            d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                            fill=""
                          />
                          <path
                            d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                            fill=""
                          />
                          <path
                            d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                            fill=""
                          />
                          <path
                            d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                            fill="white"
                          />
                        </svg>
                        Class
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href={`/classes?${query}`}
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/classes" &&
                                "text-white"
                                }`}
                            >
                              List
                            </a>
                          </li>
                          <li>
                            <a
                              href={`/classes/archive?${query}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/classes/archive" &&
                                "text-white"
                                }`}
                            >
                              Archive
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Class --> */}

              {/* <!-- Menu Item Project --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/projects" || pathname.includes("projects")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/projects" ||
                          pathname.includes("projects")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg fill="white" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.25 6a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 007.25 6zM12 6a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 6zm4 .75a.75.75 0 011.5 0v9.5a.75.75 0 01-1.5 0v-9.5z"/><path fillRule="evenodd" d="M3.75 2A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0022 20.25V3.75A1.75 1.75 0 0020.25 2H3.75zM3.5 3.75a.25.25 0 01.25-.25h16.5a.25.25 0 01.25.25v16.5a.25.25 0 01-.25.25H3.75a.25.25 0 01-.25-.25V3.75z"/>
                        </svg>
                        Project
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href={`/projects?${query}`}
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/projects" &&
                                "text-white"
                                }`}
                            >
                              List
                            </a>
                          </li>
                          <li>
                            <a
                              href={`/projects/archive?${query}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/projects/archive" &&
                                "text-white"
                                }`}
                            >
                              Archive
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Project --> */}

              {/* <!-- Menu Item Payment --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/payments" || pathname.includes("payments")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/payments" ||
                          pathname.includes("payments")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          fill="white"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="18"
                          height="18"
                        >
                          <g>
                            <g>
                              <path d="M270.348,227.994H30.962C13.889,227.994,0,241.884,0,258.957v124.629c0,17.073,13.889,30.962,30.962,30.962h194.172
			c4.736,0,8.575-3.839,8.575-8.575c0-4.736-3.839-8.575-8.575-8.575H30.962c-7.617,0-13.812-6.196-13.812-13.812v-61.331H284.16
			v61.331c0,7.617-6.196,13.812-13.812,13.812h-16.632c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h16.632
			c17.073,0,30.962-13.889,30.962-30.962V258.957C301.31,241.884,287.421,227.994,270.348,227.994z M284.161,305.105H17.15v-22.924
			h51.353c4.736,0,8.575-3.839,8.575-8.575s-3.839-8.575-8.575-8.575H17.15v-6.074c0-7.617,6.196-13.812,13.812-13.812h239.386
			c7.617,0,13.812,6.196,13.812,13.812v6.074H97.085c-4.736,0-8.575,3.839-8.575,8.575s3.839,8.575,8.575,8.575h187.077V305.105z"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M368.047,97.452H108.154c-4.736,0-8.575,3.839-8.575,8.575v100.177c0,4.736,3.839,8.575,8.575,8.575
			c4.736,0,8.575-3.839,8.575-8.575v-39.387c27.007-3.792,48.425-25.209,52.216-52.216h199.102c4.736,0,8.575-3.839,8.575-8.575
			C376.621,101.291,372.782,97.452,368.047,97.452z M116.729,149.438v-34.836h34.836
			C148.108,132.136,134.264,145.98,116.729,149.438z"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M503.425,97.452H396.63c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h46.017
			c3.791,27.006,25.203,48.424,52.204,52.216v71.5c-27.001,3.792-48.413,25.21-52.204,52.216H323.095
			c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h180.33c4.736,0,8.575-3.839,8.575-8.575V106.027
			C512,101.291,508.161,97.452,503.425,97.452z M494.85,149.437c-17.529-3.458-31.369-17.302-34.825-34.835h34.825V149.437z
			 M494.85,290.533h-34.825c3.456-17.534,17.296-31.378,34.825-34.836V290.533z"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M305.79,141.389c-43.52,0-78.927,27.442-78.927,61.171c0,1.434,0.07,2.921,0.206,4.42
			c0.429,4.716,4.601,8.186,9.317,7.763c4.716-0.429,8.192-4.601,7.763-9.317c-0.09-0.984-0.135-1.949-0.135-2.866
			c0-24.273,27.713-44.022,61.777-44.022c34.07,0,61.789,19.748,61.789,44.022c-0.002,19.932-18.949,37.438-46.079,42.569
			c-4.653,0.88-7.712,5.366-6.831,10.019c0.779,4.115,4.375,6.982,8.416,6.982c0.528,0,1.066-0.049,1.603-0.151
			c35.35-6.687,60.039-31.121,60.039-59.419C384.729,168.831,349.317,141.389,305.79,141.389z"/>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path d="M93.582,339.714H38.935c-4.736,0-8.575,3.839-8.575,8.575c0,4.736,3.839,8.575,8.575,8.575h54.647
			c4.736,0,8.575-3.839,8.575-8.575C102.156,343.554,98.317,339.714,93.582,339.714z"/>
                            </g>
                          </g>
                        </svg>
                        Payment
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href="/payment/list"
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/payments/list" &&
                                "text-white"
                                }`}
                            >
                              All
                            </a>
                          </li>
                          <li>
                            <a
                              href="/payments/archive"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/payments/vocations" &&
                                "text-white"
                                }`}
                            >
                              Vocation
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Payment --> */}

              {/* <!-- Menu Item Brand --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/brands" || pathname.includes("brands")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/brands" ||
                          pathname.includes("brands")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg fill="white" width="18" height="18" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 2L7 7L2 7L2 46L14 46L14 44L4 44L4 9L9 9L9 4L29 4L29 7L11 7L11 9L34 9L34 20L36 20L36 7L31 7L31 2 Z M 8 12L8 14L12 14L12 12 Z M 17 12L17 14L21 14L21 12 Z M 26 12L26 14L30 14L30 12 Z M 8 17L8 19L12 19L12 17 Z M 17 17L17 19L21 19L21 17 Z M 26 17L26 19L30 19L30 17 Z M 29 20C25.742188 20 23.328125 21.324219 22.074219 23.296875C20.929688 25.09375 20.875 27.339844 21.59375 29.433594C21.515625 29.566406 21.402344 29.679688 21.328125 29.839844C21.171875 30.191406 21.035156 30.589844 21.054688 31.097656L21.054688 31.101563C21.109375 32.378906 21.851563 33.046875 22.398438 33.421875C22.628906 34.640625 23.207031 35.660156 24 36.390625L24 38.53125C23.824219 38.953125 23.472656 39.308594 22.796875 39.679688C22.089844 40.070313 21.132813 40.4375 20.144531 40.917969C19.15625 41.398438 18.125 42.011719 17.324219 42.988281C16.519531 43.96875 16 45.308594 16 47L16 48L48.050781 48L47.992188 46.941406C47.902344 45.363281 47.316406 44.117188 46.488281 43.222656C45.664063 42.328125 44.644531 41.765625 43.679688 41.320313C42.714844 40.875 41.785156 40.535156 41.109375 40.171875C40.464844 39.832031 40.148438 39.511719 40 39.160156L40 37.472656C40.597656 36.609375 40.859375 35.617188 40.9375 34.6875C41.414063 34.265625 41.96875 33.617188 42.125 32.457031C42.230469 31.625 42.019531 30.996094 41.695313 30.464844C42.144531 29.277344 42.328125 27.84375 41.933594 26.417969C41.707031 25.589844 41.277344 24.777344 40.5625 24.171875C40.003906 23.691406 39.238281 23.425781 38.390625 23.308594L37.75 22L37.125 22C36.097656 22 35.085938 22.238281 34.214844 22.578125C33.871094 22.714844 33.558594 22.863281 33.265625 23.027344C33.101563 22.808594 32.921875 22.601563 32.714844 22.414063C32.105469 21.863281 31.261719 21.550781 30.324219 21.421875L29.621094 20 Z M 8 22L8 24L12 24L12 22 Z M 17 22L17 24L19.484375 24L20.761719 22 Z M 28.4375 22.113281L29.027344 23.300781L29.644531 23.300781C30.464844 23.300781 30.96875 23.535156 31.371094 23.894531C31.773438 24.257813 32.066406 24.796875 32.238281 25.429688C32.582031 26.695313 32.289063 28.339844 32.007813 28.792969L31.644531 29.371094L32.050781 29.921875C32.289063 30.238281 32.441406 30.566406 32.363281 31.007813C32.253906 31.625 32.03125 31.707031 31.589844 32.089844L31.257813 32.375L31.246094 32.8125C31.210938 33.792969 30.871094 34.777344 30.300781 35.339844L30 35.632813L30 38.988281L30.058594 39.152344C30.453125 40.25 31.335938 40.933594 32.234375 41.429688C33.132813 41.925781 34.101563 42.289063 34.976563 42.714844C35.851563 43.140625 36.609375 43.625 37.132813 44.261719C37.496094 44.699219 37.71875 45.289063 37.855469 46L18.144531 46C18.28125 45.289063 18.503906 44.699219 18.867188 44.261719C19.390625 43.625 20.148438 43.140625 21.023438 42.714844C21.898438 42.289063 22.867188 41.925781 23.765625 41.429688C24.664063 40.933594 25.546875 40.25 25.941406 39.152344L26 38.988281L26 35.523438L25.5625 35.226563C25.101563 34.914063 24.34375 33.769531 24.238281 32.742188L24.183594 32.1875L23.683594 31.945313C23.398438 31.808594 23.082031 31.753906 23.050781 31.015625C23.050781 31.015625 23.082031 30.824219 23.15625 30.65625C23.234375 30.484375 23.375 30.304688 23.332031 30.347656L23.8125 29.867188L23.542969 29.242188C22.796875 27.523438 22.898438 25.722656 23.761719 24.367188C24.550781 23.125 26.097656 22.269531 28.4375 22.113281 Z M 36.558594 24.113281L37.089844 25.199219L37.714844 25.199219C38.472656 25.199219 38.921875 25.398438 39.265625 25.691406C39.613281 25.984375 39.859375 26.414063 40.003906 26.949219C40.300781 28.019531 40.085938 29.480469 39.746094 30.144531L39.417969 30.796875L39.933594 31.308594C39.867188 31.242188 40.195313 31.785156 40.140625 32.195313C40.011719 33.175781 39.871094 33.113281 39.449219 33.390625L39.03125 33.667969L39 34.171875C38.953125 35.042969 38.515625 36.351563 38.28125 36.589844L38 36.878906L38 39.621094L38.058594 39.78125C38.4375 40.835938 39.296875 41.476563 40.167969 41.9375C41.035156 42.398438 41.980469 42.738281 42.84375 43.136719C43.707031 43.535156 44.476563 43.984375 45.019531 44.578125C45.367188 44.953125 45.601563 45.433594 45.769531 46L39.921875 46C39.757813 44.777344 39.3125 43.765625 38.675781 42.988281C37.875 42.011719 36.84375 41.398438 35.855469 40.917969C34.867188 40.4375 33.910156 40.070313 33.203125 39.679688C32.527344 39.308594 32.175781 38.953125 32 38.53125L32 36.296875C32.691406 35.421875 33.054688 34.390625 33.15625 33.34375C33.542969 33.003906 34.144531 32.417969 34.332031 31.359375C34.484375 30.492188 34.226563 29.785156 33.90625 29.210938C34.4375 27.988281 34.59375 26.460938 34.167969 24.902344C34.164063 24.886719 34.15625 24.871094 34.152344 24.855469C34.367188 24.71875 34.640625 24.5625 34.949219 24.441406C35.4375 24.25 36.007813 24.179688 36.558594 24.113281 Z M 8 27L8 29L12 29L12 27 Z M 17 27L17 29L19.753906 29L19.394531 27 Z M 8 32L8 34L12 34L12 32 Z M 17 32L17 34L20.449219 34L19.613281 32 Z M 8 37L8 39L12 39L12 37 Z M 17 37L17 39L21 39L21 37Z" />
                        </svg>
                        Brand
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href={`/brands?${query}`}
                              className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/brands" &&
                                "text-white"
                                }`}
                            >
                              List
                            </a>
                          </li>
                          <li>
                            <a
                              href={`/brands/archive?${query}`}
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/brands/archive" &&
                                "text-white"
                                }`}
                            >
                              Archive
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Brand --> */}


              {/* <!-- Menu Item Account --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/accounts" || pathname.includes("accounts")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/accounts" ||
                          pathname.includes("accounts")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                            fill=""
                          />
                          <path
                            d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                            fill=""
                          />
                        </svg>
                        Account
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href="/accounts/user"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/accounts/user" && "text-white"
                                } `}
                            >
                              User
                            </a>
                          </li>
                          <li>
                            <a
                              href="/accounts/vocation"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/accounts/vocation" && "text-white"
                                } `}
                            >
                              Vocation
                            </a>
                          </li>
                          <li>
                            <a
                              href="/accounts/admin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/accounts/admin" && "text-white"
                                } `}
                            >
                              Admin
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Account --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/settings" || pathname.includes("settings")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/auth" || pathname.includes("auth")) &&
                          "bg-graydark dark:bg-meta-4"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9763)">
                            <path
                              d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                              fill=""
                            />
                            <path
                              d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9763">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Settings
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                            }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </div>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && "hidden"
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <a
                              href="/settings/category"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/settings/category" && "text-white"
                                }`}
                            >
                              Category
                            </a>
                          </li>
                          <li>
                            <a
                              href="/settings/master"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/settings/master" && "text-white"
                                }`}
                            >
                              Master
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
