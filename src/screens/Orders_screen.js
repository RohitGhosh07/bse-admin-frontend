import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import SideMenu from '../components/SideMenu';
import OrderView from '../components/OrderView';
import TableView from '../components/TableView';
import UserView from '../components/UserView';
import NavBar from '../components/NavBar';

const OrdersScreen = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [view, setView] = useState('order'); // Default view
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (rowIndex) => {
        setSelectedRow(rowIndex);
    };

    const handleCloseSidebar = () => {
        setSelectedTable(null);
        setSelectedRow(null);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleTableClick = (table) => {
        setSelectedTable(table);
    };

    return (
        <div className="relative">
            <NavBar />
            <div className="flex h-screen bg-gray-200">
                {/* Sidebar */}
                <SideMenu />
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
                                {/* "Create Order" button */}
                                <button
                                    className="mb-4 px-6 py-2 bg-red-900 border-2 border-red-900 text-white rounded-md self-end"
                                    onClick={() => handleViewChange('ordbetweener')}
                                >
                                    Create Order
                                </button>
                                {/* "Add Customer" button */}
                                <button
                                    className="mb-4 ml-2 px-10 py-2 border-2 border-red-900 text-black rounded-lg self-end bg-transparent shadow-lg"
                                    onClick={() => handleViewChange('user')}
                                >
                                    Add Guest
                                </button>
                            </div>
                            {/* View Selection Buttons */}
                            <div className="bg-white p-4 sm:p-8 shadow-md rounded-md w-full">
                                <div className="flex  mb-4">
                                    <button
                                        onClick={() => handleViewChange('order')}
                                        className={`px-4 sm:px-8 py-1 border text-sm rounded-l-md ${view === 'order' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                    >
                                        Order View
                                    </button>
                                    <button
                                        onClick={() => handleViewChange('table')}
                                        className={`px-4 sm:px-8 py-1 border text-sm ${view === 'table' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                    >
                                        Table View
                                    </button>
                                    <button
                                        onClick={() => handleViewChange('user')}
                                        className={`px-4 sm:px-8 py-1 border text-sm rounded-r-md ${view === 'user' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                    >
                                        User View
                                    </button>
                                </div>
                                {/* Divider */}
                                <hr className="my-4 border-gray-300" />
                                {view === 'order' && (
                                    <OrderView
                                        selectedRow={selectedRow}
                                        selectedTable={selectedTable}
                                        handleRowClick={handleRowClick}
                                        handleCloseSidebar={handleCloseSidebar}
                                        handleTableClick={handleTableClick}
                                    />
                                )}
                                {view === 'table' && (
                                    <TableView selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
                                )}
                                {view === 'user' &&
                                    <UserView
                                        selectedRow={selectedRow}
                                        selectedTable={selectedTable}
                                        handleRowClick={handleRowClick}
                                        handleCloseSidebar={handleCloseSidebar}
                                        handleTableClick={handleTableClick}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersScreen;
