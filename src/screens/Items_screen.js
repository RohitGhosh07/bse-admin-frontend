import React, { useState } from 'react';
import { FaUserCircle, FaPen, FaBolt } from 'react-icons/fa';
import SideMenu from '../components/SideMenu';

const Items_screen = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowIndex) => {
        setSelectedRow(rowIndex);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <div className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-50">
                <div className="flex items-center">
                    <img src="https://i.ibb.co/gPPqZfg/bse-demo-logo.png" alt="Logo" className="object-cover w-20 h-auto ml-2 sm:ml-8" />
                </div>
                <div className="relative">
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
            <div className="flex h-full bg-gray-200">
                {/* Sidebar */}
                <SideMenu />
                {/* Main Content */}
                <div className="flex-grow p-10">
                    {/* Top Items in Action */}
                    <div className="mb-4">
                        <div className="bg-white p-4 rounded-3xl shadow-md">
                            <div className="flex justify-end items-center mb-4">
                                <button className="flex items-center bg-red-900 text-white px-4 py-2 rounded-lg shadow-lg mr-2">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.52889 0V6.5M6.52889 13V6.5M6.52889 6.5H0H13" stroke="white" />
                                    </svg>
                                    <span className="ml-2">Create Order</span>
                                </button>
                                <button className="px-10 py-1 border-2 border-red-900 text-black rounded-lg bg-transparent shadow-lg">Upload Items</button>
                            </div>
                            <div className="border-b border-gray-300 mb-4"></div>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b"></th>
                                        <th className="px-4 py-2 border-b">Restaurant</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                        <th className="px-4 py-2 border-b">Total Items</th>
                                        <th className="px-4 py-2 border-b"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from({ length: 6 }).map((_, rowIndex) => (
                                        <tr key={rowIndex} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(rowIndex)}>
                                            <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
                                            <td className="px-4 py-2 border-b flex justify-center">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-20" />
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <div className="px-2 py-1 bg-gray-200 rounded-xl inline-block">Active</div>
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">{rowIndex + 19}</td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
                                                </svg>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items_screen;