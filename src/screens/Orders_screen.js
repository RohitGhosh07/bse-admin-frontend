import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import { FaArrowRightLong } from "react-icons/fa6";

const OrdersScreen = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('orders');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isTableView, setIsTableView] = useState(false);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleView = () => {
        setIsTableView(!isTableView);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-20">
                <div className="flex items-center">
                    <img src="https://i.ibb.co/gPPqZfg/bse-demo-logo.png" alt="Logo" className="object-cover w-20 h-auto ml-2 sm:ml-8" />
                </div>
                <div className="relative ">
                    
                    {/* Profile Icon with Shadow */}
                    <div className="shadow-md rounded-full p-1 bg-white">
                        <FaUserCircle className="text-2xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)} />
                    </div>

                    
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-100 shadow-lg rounded-md z-50">
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Profile</div>
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Settings</div>
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Logout</div>
                        </div>
                    )}
                </div>

            </div>
            <div className="flex h-screen bg-gray-200">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-30 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out sm:relative sm:translate-x-0 sm:w-64 bg-white shadow-md`}>
                    <div className="flex flex-col py-4 justify-start">
                        <div className="flex flex-col items-center py-4 sm:items-start">
                            <button className="p-2 focus:outline-none ml-auto sm:ml-0" onClick={toggleSidebar}>
                                <IoMdMenu className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex flex-col mr-4">
                            <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'orders' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('orders')}>
                                <TbFileInvoice className="mr-3 w-8 h-12" />
                                Orders
                            </button>
                            <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'market' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('market')}>
                                <SlGraph className="mr-3 w-8 h-12" />
                                Market
                            </button>
                            <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'items' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('items')}>
                                <HiOutlineClipboardList className="mr-3 w-8 h-12" />
                                Items
                            </button>
                            <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'settings' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('settings')}>
                                <IoSettingsSharp className="mr-3 w-8 h-12" />
                                Settings
                            </button>
                            <button className={`flex items-center px-2 text-xl hover:bg-gray-700 hover:text-white rounded-r-xl ${activeMenu === 'option5' ? 'bg-red-900 text-white' : ''}`} onClick={() => handleMenuClick('option5')}>
                                <HiOutlineClipboardList className="mr-3 w-8 h-12" />
                                Option5
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col relative">
                    {!sidebarOpen && (
                        <button
                            className="absolute left-0 top-0 mt-4 ml-4 p-2 bg-red-900 text-white rounded-md z-20 focus:outline-none sm:hidden"
                            onClick={toggleSidebar}
                        >
                            <FaBars />
                        </button>
                    )}

                    {/* Main Content Area */}
                    <div className="flex-1 p-4 sm:p-8 bg-gray-200 flex flex-col items-center">
                        {/* Container to wrap the button and card */}
                        <div className="flex flex-col items-end w-full max-w-6xl">

                            {/* "Create order" button */}
                            <button className="mb-4 px-6 py-2 bg-red-900 text-white rounded-md self-end">Create orders</button>

                            {/* Card */}
                            <div className="bg-white p-4 sm:p-8 shadow-md rounded-md w-full">
                                <label htmlFor="Toggle3" className="inline-flex items-center p-1 rounded-xl cursor-pointer dark:text-gray-100">
                                    <input
                                        id="Toggle3"
                                        type="checkbox"
                                        className="hidden peer"
                                        checked={isTableView}
                                        onChange={toggleView}
                                    />
                                    <span className="px-4 sm:px-8 py-1 rounded-l-md border dark:border-gray-900 dark:bg-white text-black peer-checked:dark:bg-gray-900 peer-checked:text-white">Order View</span>
                                    <span className="px-4 sm:px-8 py-1 rounded-r-md border dark:border-gray-900 dark:bg-gray-900 text-white peer-checked:dark:bg-white peer-checked:text-black">Table View</span>
                                </label>

                                {/* Divider */}
                                <hr className="my-4 border-gray-300" />

                                {/* Conditional Rendering based on View */}
                                {isTableView ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 border-b"></th>
                                                    <th className="px-4 py-2 border-b">Restaurant</th>
                                                    <th className="px-4 py-2 border-b">Table #</th>
                                                    <th className="px-4 py-2 border-b">Status</th>
                                                    <th className="px-4 py-2 border-b">Membership</th>
                                                    <th className="px-4 py-2 border-b">KOT #</th>
                                                    <th className="px-4 py-2 border-b">Total Elapsed</th>
                                                    <th className="px-4 py-2 border-b">Total Items</th>
                                                    <th className="px-4 py-2 border-b">Invoice Value</th>
                                                    <th className="px-4 py-2 border-b"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: 6 }).map((_, rowIndex) => (
                                                    <tr key={rowIndex} className="hover:bg-gray-100">
                                                        <td className="px-4 py-2 border-b">{rowIndex + 1}</td>
                                                        <td className="px-4 py-2 border-b">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-20" />
                                                        </td>
                                                        <td className="px-4 py-2 border-b">{rowIndex + 8}</td>
                                                        <td className="px-4 py-2 border-b">In Progress</td>
                                                        <td className="px-4 py-2 border-b">Member</td>
                                                        <td className="px-4 py-2 border-b">123456</td>
                                                        <td className="px-4 py-2 border-b">20 mins</td>
                                                        <td className="px-4 py-2 border-b">{9 * (8 + rowIndex)}</td>
                                                        <td className="px-4 py-2 border-b">INR 450.00</td>
                                                        <td className="px-4 py-2 border-b">
                                                            <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" stroke-width="2" />
                                                            </svg>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {Array.from({ length: 25 }).map((_, index) => (
                                            <div key={index} className="flex justify-center font-bold bg-white border border-gray-300 rounded-md p-2 sm:p-4 hover:bg-gray-200">
                                                Table {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default OrdersScreen;