import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { CiMenuKebab } from "react-icons/ci";
import SideMenu from '../components/SideMenu';
const OrdersScreen = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('orders');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isTableView, setIsTableView] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowIndex) => {
        setSelectedRow(rowIndex);
    };

    const handleCloseSidebar = () => {
        setSelectedTable(null);
        setSelectedRow(null);
    };
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleView = () => {
        setIsTableView(!isTableView);
    };

    const handleTableClick = (table) => {
        setSelectedTable(table);
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <div className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-50">
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
                <SideMenu/>

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

                            <div>
                                {/* "Create order" button */}
                                <button className="mb-4 px-6 py-2 bg-red-900 border-2 border-red-900 text-white rounded-md self-end">Create orders</button>

                                {/* "Add Customer" button */}
                                <button className="mb-4 ml-2 px-6 py-2 border-2 border-red-900 text-black rounded-md self-end bg-transparent">Add Customer</button>
                            </div>
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
                                                    <tr key={rowIndex} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(rowIndex)}>
                                                        <td className="px-4 py-2 border-b">{rowIndex + 1}</td>
                                                        <td className="px-4 py-2 border-b">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-20" />
                                                        </td>
                                                        <td className="px-4 py-2 border-b">{rowIndex + 8}</td>
                                                        <td className="px-4 py-2 border-b "><div className="px-2 bg-gray-200 rounded-xl text-center">In Progress</div></td>                                      
                                                        <td className="px-4 py-2 border-b "><div className="px-2 bg-gray-200 rounded-xl text-center">Member</div></td>                                                   
                                                        <td className="px-4 py-2 border-b">123456</td>
                                                        <td className="px-4 py-2 border-b "><div className="px-2 bg-gray-200 rounded-xl text-center">20 min</div></td>                                                   
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



                                        {/* Sidebar for Row Details */}
                                        {selectedRow !== null && (
                                            <>
                                                <div className="fixed inset-0 bg-gray-200 opacity-50 z-30" onClick={handleCloseSidebar}></div>
                                                <div className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-4 z-40 transition-transform transform translate-x-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex flex-col mt-20">
                                                        <button onClick={handleCloseSidebar} className="text-red-900 mb-4 self-start">
                                                            <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51" stroke="black" stroke-width="2" />
                                                            </svg>
                                                        </button>
                                                        <div className="flex items-center mb-4 justify-around">
                                                            <div className="flex flex-col">
                                                                <h2 className="text-4xl font-bold mb-4">Table {selectedTable}</h2>
                                                                <div className="bg-gray-200 px-4 rounded-xl text-bold">Guest</div>
                                                            </div>
                                                            <div className="border-r h-20 px-2"></div>
                                                            <div className="w-1/3">
                                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-20" />
                                                            </div>
                                                            <div className="flex-1 flex items-center justify-end">

                                                                <div className="flex w-2/3 px-2 ">
                                                                    <select className="w-full px-4 py-2 border rounded-md">
                                                                        <option>In Progress</option>
                                                                        <option>Completed</option>
                                                                    </select>
                                                                </div>
                                                                <CiMenuKebab className="w-6 h-6 text-gray-600" />


                                                            </div>

                                                        </div>
                                                        <hr className="border-gray-300 mb-4" />
                                                        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                                                        <div className="overflow-x-auto mb-4">
                                                            <table className="min-w-full bg-white">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="px-4 py-2 border-b">Item Name</th>
                                                                        <th className="px-4 py-2 border-b"></th>
                                                                        <th className="px-4 py-2 border-b">Quantity</th>
                                                                        <th className="px-4 py-2 border-b">Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Array.from({ length: 4 }).map((_, itemIndex) => (
                                                                        <tr key={itemIndex} className="hover:bg-gray-100">
                                                                            <td className="px-4 py-2 border-b text-center">Item #{itemIndex + 1}</td>
                                                                            <td className="px-4 py-2 border-b text-center"></td>
                                                                            <td className="px-4 py-2 border-b text-center">{1 + itemIndex}</td>
                                                                            <td className="px-4 py-2 border-b text-center">INR 100.00</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>

                                                                <tfoot>
                                                                    <tr>
                                                                        <td className="px-4 py-2 border-b font-bold text-center">Total</td>
                                                                        <td className="px-4 py-2 border-b"></td>
                                                                        <td className="px-4 py-2 border-b font-bold text-center">10</td>
                                                                        <td className="px-4 py-2 border-b font-bold text-center">INR 400.00</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {Array.from({ length: 25 }).map((_, index) => (
                                            <div key={index} className="flex justify-center font-bold bg-white border border-gray-300 rounded-md p-2 sm:p-4 hover:bg-gray-200 hover:border-black cursor-pointer" onClick={() => handleTableClick(index + 1)}>
                                                Table {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>

                {/* Sidebar for Table Details */}
                {selectedTable !== null && (
                    <>
                        <div className="fixed inset-0 bg-gray-200 opacity-50 z-30" onClick={() => setSelectedTable(null)}></div>
                        <div className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-4 z-40 transition-transform transform translate-x-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col mt-20">
                                <button onClick={() => setSelectedTable(null)} className="text-red-900 mb-4 self-start">
                                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51" stroke="black" stroke-width="2" />
                                    </svg>
                                </button>
                                <h2 className="text-4xl font-bold mb-4">Table {selectedTable}</h2>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="bg-gray-200 px-4 rounded-xl text-bold">Guest</div>
                                    <CiMenuKebab className="w-6 h-6 text-gray-600" />
                                </div>
                                <hr className="border-gray-300 mb-4" />
                                <h3 className="text-lg font-semibold mb-4">Ongoing Orders</h3>
                                <div className="overflow-x-auto mb-4">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border-b"></th>
                                                <th className="px-4 py-2 border-b">Restaurant</th>
                                                <th className="px-4 py-2 border-b">Order</th>
                                                <th className="px-4 py-2 border-b">Total Items</th>
                                                <th className="px-4 py-2 border-b">Invoice Value</th>
                                                <th className="px-4 py-2 border-b"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from({ length: 4 }).map((_, rowIndex) => (
                                                <tr key={rowIndex} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border-b">{rowIndex + 1}</td>
                                                    <td className="px-4 py-2 border-b">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-10 w-10 object-cover rounded-full" />
                                                    </td>
                                                    <td className="px-4 py-2 border-b">Order #{rowIndex + 1}</td>
                                                    <td className="px-4 py-2 border-b">{9 * (8 + rowIndex)}</td>
                                                    <td className="px-4 py-2 border-b">INR 450.00</td>
                                                    <td className="px-4 py-2 border-b" onClick={isTableView}>
                                                        <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" stroke-width="2" />
                                                        </svg>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h3 className="text-lg font-semibold mb-4">Completed Orders</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border-b"></th>
                                                <th className="px-4 py-2 border-b">Restaurant</th>
                                                <th className="px-4 py-2 border-b">Order</th>
                                                <th className="px-4 py-2 border-b">Total Items</th>
                                                <th className="px-4 py-2 border-b">Invoice Value</th>
                                                <th className="px-4 py-2 border-b"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.from({ length: 4 }).map((_, rowIndex) => (
                                                <tr key={rowIndex} className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border-b">{rowIndex + 1}</td>
                                                    <td className="px-4 py-2 border-b">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s" alt="Restaurant" className="h-10 w-10 object-cover rounded-full" />
                                                    </td>
                                                    <td className="px-4 py-2 border-b">Order #{rowIndex + 1}</td>
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
                            </div>
                        </div>
                    </>
                )}



            </div>
        </div>
    );
};

export default OrdersScreen;
