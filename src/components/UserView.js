// UserView.js

import React from 'react';
import { CiMenuKebab } from "react-icons/ci";


const UserView = ({ selectedRow, selectedTable, handleRowClick, handleCloseSidebar, handleTableClick }) => {
    return (
        <>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b"></th>
                            <th className="px-4 py-2 border-b">User Name</th>
                            <th className="px-4 py-2 border-b"></th>
                            <th className="px-4 py-2 border-b">Invoice Value</th>
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
                                <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
                                <td className="px-4 py-2 border-b">
                                    <img src="https://i.pinimg.com/originals/ed/41/cc/ed41cc4f3a05e728d31b48e6501ec670.gif" alt="Restaurant" className="h-20" />
                                </td>
                                <td className="px-4 py-2 border-b text-center">{rowIndex + 8}</td>
                                <td className="px-4 py-2 border-b text-center"><div className="px-2 bg-gray-200 rounded-xl text-center">In Progress</div></td>
                                <td className="px-4 py-2 border-b text-center"><div className="px-2 bg-gray-200 rounded-xl text-center">Member</div></td>
                                <td className="px-4 py-2 border-b text-center">123456</td>
                                <td className="px-4 py-2 border-b text-center"><div className="px-2 bg-gray-200 rounded-xl text-center">20 min</div></td>
                                <td className="px-4 py-2 border-b text-center">{9 * (8 + rowIndex)}</td>
                                <td className="px-4 py-2 border-b text-center">INR 450.00</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
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
                        <div className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-8 z-40 transition-transform transform translate-x-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col mt-20">
                                <button onClick={handleCloseSidebar} className="text-red-900 mb-4 self-start">
                                    <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51" stroke="black" strokeWidth="2" />
                                    </svg>
                                </button>
                                <div className="flex items-center mb-4 justify-around">
                                    <div className="flex flex-col">
                                        <h2 className="text-4xl font-bold mb-4">Username {selectedTable}</h2>
                                        <div className="bg-gray-200 px-4 rounded-xl text-bold">G</div>
                                    </div>
                                    <div className="border-r h-20 px-2"></div>
                                    <div className="ml-2 w-1/3">
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

        </>
    );
}

export default UserView;
