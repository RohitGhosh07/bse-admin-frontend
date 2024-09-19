import React, { useState, useEffect } from 'react';
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import { useNavigate, useLocation } from 'react-router-dom';

const SideMenu = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');

    useEffect(() => {
        const path = location.pathname.replace('/', '');
        setActiveMenu(path === '' ? 'orders' : path);
    }, [location]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        navigate(`/${menu}`);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div>
            <div className={`fixed inset-y-0 left-0 z-50 h-full transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out sm:relative sm:translate-x-0 sm:w-64 bg-white shadow-md`}>
                <div className="flex flex-col py-4 justify-start">
                    <div className="flex flex-col items-center py-4 sm:items-start">
                        <button className="p-2 focus:outline-none ml-auto sm:ml-0" onClick={toggleSidebar}>
                            <IoMdMenu className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="flex flex-col mr-4">
                        <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'orders' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('')}>
                            <TbFileInvoice className="mr-3 w-8 h-12" />
                            Orders
                        </button>
                        {/* <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'market' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('market')}>
                            <SlGraph className="mr-3 w-8 h-12" />
                            Market
                        </button> */}
                        <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'items' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('items')}>
                            <HiOutlineClipboardList className="mr-3 w-8 h-12" />
                            Items
                        </button>
                        {/* <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'settings' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('settings')}>
                            <IoSettingsSharp className="mr-3 w-8 h-12" />
                            Settings
                        </button> */}
                        {/* <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'option5' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('option5')}>
                            <HiOutlineClipboardList className="mr-3 w-8 h-12" />
                            Option5
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
