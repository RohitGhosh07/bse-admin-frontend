import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';

const TableView = ({ selectedTable, setSelectedTable }) => {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const handleCreateOrderClick = () => {
        setIsCreatingOrder(true);
    };

    const handleCloseTableView = () => {
        setSelectedTable(null);
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {Array.from({ length: 25 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-center font-bold bg-white border border-gray-300 rounded-md p-2 sm:p-4 hover:bg-gray-200 hover:border-black cursor-pointer"
                        onClick={() => setSelectedTable(index + 1)}
                    >
                        Table {index + 1}
                    </div>
                ))}
            </div>

            {selectedTable !== null && (
                <>
                    <div
                        className="fixed inset-0 bg-gray-200 opacity-50 z-30"
                        onClick={handleCloseTableView}
                    ></div>
                    <div
                        className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-4 z-40 transition-transform transform translate-x-0 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col mt-20">
                            <button
                                onClick={handleCloseTableView}
                                className="text-red-900 mb-4 self-start"
                            >
                                <svg
                                    width="51"
                                    height="30"
                                    viewBox="0 0 51 30"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51"
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>

                            <div className="bg-white px-4 rounded-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-2">
                                            <FaPen className="cursor-pointer text-gray-500 mr-2" />
                                            <h2 className="text-4xl font-bold mb-1">
                                                Table {selectedTable}
                                            </h2>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 px-2 rounded-xl font-bold">
                                                G
                                            </div>
                                            <span className="ml-2">Mr. John Smith</span>
                                            <span className="ml-1">+4</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.1651 20.0599H18.0278C17.6254 20.0599 17.2977 19.7328 17.2977 19.3302V17.8418C17.2977 17.4394 17.6251 17.1118 18.0278 17.1118H22.1651C22.3229 17.1118 22.4505 17.2394 22.4505 17.3972V19.7742C22.4505 19.9323 22.3229 20.0599 22.1651 20.0599ZM18.0278 17.6829C17.9399 17.6829 17.8685 17.7542 17.8685 17.8421V19.3304C17.8685 19.4181 17.9399 19.4894 18.0278 19.4894H21.8797V17.6829H18.0278Z" fill="black" /> <path d="M22.1651 25.828H5.36299C4.347 25.828 3.52051 25.0015 3.52051 23.9855V11.9303C3.52051 11.7728 3.64836 11.6449 3.8059 11.6449C3.96343 11.6449 4.09129 11.7728 4.09129 11.9303V23.9855C4.09129 24.6867 4.66179 25.2572 5.36299 25.2572H21.8797V13.1866C21.8797 13.029 22.0073 12.9012 22.1651 12.9012C22.3229 12.9012 22.4505 13.029 22.4505 13.1866V25.5426C22.4505 25.7004 22.3229 25.828 22.1651 25.828Z" fill="black" /> <path d="M22.1651 13.472H5.06219C4.21201 13.472 3.52051 12.7805 3.52051 11.9304C3.52051 11.0802 4.21201 10.3887 5.06219 10.3887H9.69921C9.85675 10.3887 9.98461 10.5165 9.98461 10.6741C9.98461 10.8316 9.85675 10.9595 9.69921 10.9595H5.06219C4.52679 10.9595 4.09129 11.395 4.09129 11.9304C4.09129 12.4657 4.52679 12.9013 5.06219 12.9013H21.8797V10.9595H19.4858C19.328 10.9595 19.2004 10.8316 19.2004 10.6741C19.2004 10.5165 19.328 10.3887 19.4858 10.3887H22.1651C22.3229 10.3887 22.4505 10.5165 22.4505 10.6741V13.1866C22.4505 13.3445 22.3229 13.472 22.1651 13.472Z" fill="black" /> <path d="M22.1651 12.2157H5.35302C5.19548 12.2157 5.06763 12.0878 5.06763 11.9303C5.06763 11.7728 5.19548 11.6449 5.35302 11.6449H22.1651C22.3229 11.6449 22.4505 11.7728 22.4505 11.9303C22.4505 12.0878 22.3229 12.2157 22.1651 12.2157Z" fill="black" /> <path d="M20.1319 18.8716H18.84C18.6821 18.8716 18.5546 18.744 18.5546 18.5862C18.5546 18.4284 18.6821 18.3008 18.84 18.3008H20.1319C20.2897 18.3008 20.4173 18.4284 20.4173 18.5862C20.4173 18.744 20.2897 18.8716 20.1319 18.8716Z" fill="black" /> <path d="M8.2609 8.94649C6.89988 8.94649 5.79285 7.83918 5.79285 6.47843C5.79285 5.11769 6.89988 4.01038 8.2609 4.01038C9.62193 4.01038 10.729 5.11741 10.729 6.47843C10.729 7.83946 9.62165 8.94649 8.2609 8.94649ZM8.2609 4.58116C7.21466 4.58116 6.36363 5.43219 6.36363 6.47843C6.36363 7.52468 7.21466 8.37571 8.2609 8.37571C9.30715 8.37571 10.1582 7.52468 10.1582 6.47843C10.1582 5.43219 9.30686 4.58116 8.2609 4.58116Z" fill="black" /> <path d="M20.0335 12.216C19.9242 12.216 19.8203 12.1529 19.7727 12.047L17.695 7.40658L7.0103 12.1909C6.86646 12.2554 6.69751 12.1909 6.6333 12.047C6.56909 11.9032 6.6333 11.7342 6.77714 11.67L17.7227 6.76902C17.7912 6.7382 17.8703 6.73591 17.941 6.76274C18.0118 6.78985 18.0689 6.84379 18.1 6.91285L20.2944 11.8139C20.3589 11.9577 20.2944 12.1267 20.1503 12.1909C20.1123 12.2077 20.0723 12.216 20.0335 12.216Z" fill="black" /> <path d="M10.3405 12.216C10.2315 12.216 10.1273 12.1529 10.08 12.047C10.0155 11.9032 10.08 11.7342 10.2238 11.67L17.0121 8.63033C17.1559 8.56554 17.3249 8.63061 17.3891 8.77416L18.7504 11.8139C18.8149 11.9577 18.7504 12.1266 18.6066 12.1909C18.4613 12.2554 18.2935 12.1909 18.2293 12.047L16.985 9.26789L10.4572 12.1909C10.4193 12.2077 10.3796 12.216 10.3405 12.216Z" fill="black" /> <path d="M14.449 5.07894C13.088 5.07894 11.981 3.97162 11.981 2.61088C11.981 1.25014 13.088 0.142822 14.449 0.142822C15.81 0.142822 16.9168 1.24985 16.9168 2.61088C16.9168 3.97191 15.8098 5.07894 14.449 5.07894ZM14.449 0.713604C13.4028 0.713604 12.5517 1.56464 12.5517 2.61088C12.5517 3.65712 13.4028 4.50816 14.449 4.50816C15.495 4.50816 16.346 3.65712 16.346 2.61088C16.346 1.56464 15.495 0.713604 14.449 0.713604Z" fill="black" /> </svg>

                                            <span className="ml-2 text-xl font-bold">₹5,000</span>
                                        </div>
                                        <button className="mb-4 mt-2 ml-2 px-10 py-1 border-2 border-red-900 text-black rounded-lg self-end bg-transparent shadow-xl">
                                            Load Wallet
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-gray-300 mb-4" />

                                {isCreatingOrder ? (
                                    <div>
                                        <div className="overflow-x-auto mb-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search items..."
                                                    className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-md"
                                                />
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-500"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.9 14.32a8 8 0 111.42-1.42l4.7 4.7a1 1 0 11-1.42 1.42l-4.7-4.7zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

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
                                            <a href="/items">
                                                <div className="flex justify-between items-center py-2 px-4 mt-1 bg-white hover:bg-gray-100">
                                                    <span className="text-gray-800 text-xs font-medium">Add more items</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer"
                                                    >
                                                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl">Ongoing Orders</h3>
                                            <button
                                                className="flex items-center bg-red-900 text-white px-4 py-2 rounded-2xl shadow-lg"
                                                onClick={handleCreateOrderClick}
                                            >
                                                <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 13 13"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M6.52889 0V6.5M6.52889 13V6.5M6.52889 6.5H0H13" stroke="white" />
                                                </svg>
                                                <span className="ml-2">Create Order</span>
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto mb-4">
                                            <table className="min-w-full bg-white">
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2 border-b"></th>
                                                        <th className="px-4 py-2 border-b">Restaurant</th>
                                                        <th className="px-4 py-2 border-b">Order #</th>
                                                        <th className="px-4 py-2 border-b">Total Items</th>
                                                        <th className="px-4 py-2 border-b">Invoice Value</th>
                                                        <th className="px-4 py-2 border-b"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: 4 }).map((_, rowIndex) => (
                                                        <tr key={rowIndex} className="hover:bg-gray-100">
                                                            <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
                                                            <td className="px-4 py-2 border-b flex justify-center">
                                                                <img
                                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s"
                                                                    alt="Restaurant"
                                                                    className="h-10 w-10 object-cover rounded-full"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2 border-b text-center">123456</td>
                                                            <td className="px-4 py-2 border-b text-center">{9 * (8 + rowIndex)}</td>
                                                            <td className="px-4 py-2 border-b text-center">INR 450.00</td>
                                                            <td
                                                                className="px-4 py-2 border-b text-center cursor-pointer"
                                                                onClick={() => console.log('Redirect to detailed order view')}
                                                            >
                                                                <svg
                                                                    width="39"
                                                                    height="20"
                                                                    viewBox="0 0 39 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
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
                                                            <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
                                                            <td className="px-4 py-2 border-b flex justify-center">
                                                                <img
                                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwxZFXqROAIRM6IRJrkAAmdvEdBV_tJA&s"
                                                                    alt="Restaurant"
                                                                    className="h-10 w-10 object-cover rounded-full"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-2 border-b text-center">123456</td>
                                                            <td className="px-4 py-2 border-b text-center">{9 * (8 + rowIndex)}</td>
                                                            <td className="px-4 py-2 border-b text-center">INR 450.00</td>
                                                            <td
                                                                className="px-4 py-2 border-b text-center cursor-pointer"
                                                                onClick={() => console.log('Redirect to detailed order view')}
                                                            >
                                                                <svg
                                                                    width="39"
                                                                    height="20"
                                                                    viewBox="0 0 39 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
                                                                </svg>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TableView;
