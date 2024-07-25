import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { CiMenuKebab } from "react-icons/ci";
import SideMenu from '../components/SideMenu';
import { FaPen, FaBolt } from 'react-icons/fa';
import { HiOutlinePencil } from 'react-icons/hi';
import NavBar from '../components/NavBar';
const Market_screen = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('orders');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isTableView, setIsTableView] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <div>
            <div className="relative">
                <NavBar/>
                <div className="flex h-screen bg-gray-200">
                    {/* Sidebar */}
                    <SideMenu />
                    {/* Main Content */}
                    <div className="flex-grow p-10">
                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-4">
                            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                                <span className="text-gray-600 text-sm">Total Orders</span>
                                <span className="text-4xl font-bold">190</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                                <span className="text-gray-600 text-sm">Orders Completed</span>
                                <span className="text-4xl font-bold">250</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                                <span className="text-gray-600 text-sm">Total Revenue</span>
                                <span className="text-4xl font-bold">340</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                                <span className="text-gray-600 text-sm">Active Tables</span>
                                <span className="text-4xl font-bold">480</span>
                            </div>
                        </div>

                        {/* Top Items in Action */}
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <h2 className="text-3xl font-bold mr-2 p-2">Top Items in Action</h2>
                                <div className="flex items-center mt-2">
                                    <FaPen className="cursor-pointer text-gray-500" />
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-md">
                                <table className="w-full text-left table-fixed">
                                    <thead>
                                        <tr>
                                            <th className="w-1/6 px-4 py-2 text-center">Action</th>
                                            <th className="w-1/6 px-4 py-2 text-center">Item</th>
                                            <th className="w-1/6 px-4 py-2 text-center">Gain</th>
                                            <th className="w-1/6 px-4 py-2 text-center">Price</th>
                                            <th className="w-1/6 px-4 py-2 text-center">Restaurant</th>
                                            <th className="w-1/6 px-4 py-2 text-center">Total Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4].map((row, index) => (
                                            <tr className={`border-t ${index !== 0 && 'border-gray-300'}`} key={index}>
                                                <td className="px-4 py-2 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <FaPen className="cursor-pointer text-gray-500" />
                                                        <FaBolt className="cursor-pointer text-gray-500" />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-center">Veg Burger</td>
                                                <td className="px-4 py-2 text-green-700 font-bold text-center">+1{row}%</td>
                                                <td className="px-4 py-2  text-green-700 font-bold text-center">
                                                    220.00
                                                    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-2">
                                                        <path d="M9.5 2L2 13.5H17L9.5 2Z" fill="#116228" stroke="#116228" stroke-width="2"></path>
                                                    </svg>
                                                    22.00
                                                </td>
                                                <td className="px-4 py-2 flex justify-center">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="w-12 h-12 object-cover rounded-lg " />
                                                </td>
                                                <td className="px-4 py-2 text-center">2{row}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Market_screen;
