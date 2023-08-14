import { BiHomeAlt2, BiMoneyWithdraw, BiUser, BiDonateHeart } from 'react-icons/bi';
import { MdOutlineManageAccounts, MdOutlineAdminPanelSettings, MdOutlineSchool, MdOutlineList, MdOutlineClass, MdOutlineSettings } from 'react-icons/md';
import { SiHtmlacademy } from 'react-icons/si';
import NestedSide from './Layouting/NestedLayout';
import SingleLayout from './Layouting/SingleLayout';
import BreadCumb from './Breadcumb';
import { Outlet } from 'react-router-dom';

function Sidebar() {

    const data = [
        {
            title: "Dashboard",
            href: "/",
            icon: <BiHomeAlt2 size={30} className='mr-3' />,
            id: 1,
            collapsible: false,
        },
        {
            title: "Account",
            href: "/accounts",
            id: 2,
            collapsible: true,
            icon: <MdOutlineManageAccounts size={30} className='mr-3' />,
            children: [
                {
                    title: "Customer",
                    href: "/customer",
                    icon: <BiUser size={30} className='mr-3' />,
                },
                {
                    title: "Internal",
                    href: "/internal",
                    icon: <MdOutlineAdminPanelSettings size={30} className='mr-3' />,
                },
                {
                    title: "Vocation",
                    href: "/vocation",
                    icon: <MdOutlineSchool size={30} className='mr-3' />,
                },
            ],
        },
        {
            title: "Vocation",
<<<<<<< HEAD
            href: "/vocation",
=======
            href: "/vocations",
>>>>>>> 23dd32b27522e83ebd5421b65962c86aa9de508c
            id: 3,
            collapsible: true,
            icon: <SiHtmlacademy size={30} className='mr-3' />,
            children: [
                {
                    title: "List",
                    href: "/list",
                    icon: <MdOutlineList size={30} className='mr-3' />,
                },
                {
                    title: "Withdrawal Request",
                    href: "/withdrawal-request",
                    icon: <BiMoneyWithdraw size={30} className='mr-3' />,
                },
            ],
        },
        {
            title: "Class",
            href: "/classes",
            id: 4,
            collapsible: true,
            icon: <MdOutlineClass size={30} className='mr-3' />,
            children: [
                {
                    title: "List",
                    href: "/list",
                    icon: <MdOutlineList size={30} className='mr-3' />,
                },
                {
                    title: "Project",
                    href: "/project",
                    icon: <BiDonateHeart size={30} className='mr-3' />,
                },
            ],
        },
        {
            title: "Setting",
            href: "/settings",
            id: 5,
            collapsible: true,
            icon: <MdOutlineSettings size={30} className='mr-3' />,
            children: [
                {
                    title: "Brand",
<<<<<<< HEAD
                    href: "/brand",
=======
                    href: "/brands",
>>>>>>> 23dd32b27522e83ebd5421b65962c86aa9de508c
                    icon: <MdOutlineList size={30} className='mr-3' />,
                },
                {
                    title: "Category",
<<<<<<< HEAD
                    href: "/category",
=======
                    href: "/categories",
>>>>>>> 23dd32b27522e83ebd5421b65962c86aa9de508c
                    icon: <MdOutlineList size={30} className='mr-3' />,
                },
            ],
        },
    ]

    return (
        <div className="flex max-w-[1440px]">
            <div className="w-[450px] h-screen overflow-y-auto bg-[#07638d]">
                {
                    data.map((side) => {
                        if (side.collapsible) {
                            return (
                                <NestedSide side={side} />
                            )
                        }
                        return (
                            <SingleLayout side={side} />
                        )
                    })
                }
            </div>
            <div className="h-screen w-screen ">
                <div className="header">
                    <div className="label">
                        {/* <p style={{textTransform: 'capitalize'}}>{urlComplete[1]} {urlComplete[1] === 'dashboard' ? "" : "List"}</p> */}
                    </div>
                    <div className="header__content">
                        <div className="header__account">
                        </div>
                    </div>
                </div>
                <div className="body">
                    <BreadCumb />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;