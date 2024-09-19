import React, { useState } from 'react';
import { FaBars, FaSync } from 'react-icons/fa'; // Import FaSync for the refresh icon
import { ImSpinner2 } from 'react-icons/im'; // Import a spinner icon
import SideMenu from '../components/SideMenu';
import OrderView from '../components/OrderView';
import TableView from '../components/TableView';
import UserView from '../components/UserView';
import NavBar from '../components/NavBar';
import AddGuestModal from '../components/AddGuestModal';

const OrdersScreen = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [view, setView] = useState('user'); // Default view
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); // State to force re-render
    const [loading, setLoading] = useState(false); // State for loading

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
        setRefreshKey((prevKey) => prevKey + 1); // Reset refreshKey to trigger re-render on view change
    };

    const handleTableClick = (table) => {
        setSelectedTable(table);
    };

    const handleRefresh = () => {
        setLoading(true); // Set loading state to true
        setTimeout(() => {
            setRefreshKey((prevKey) => prevKey + 1); // Trigger re-render when refresh button is clicked
            setLoading(false); // Set loading state to false after refresh
        }, 2000); // Simulate a 2-second loading time (adjust as needed)
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddGuestClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                            {/* <div>
                                <button
                                    className="mb-4 px-6 py-2 bg-red-900 border-2 border-red-900 text-white rounded-md self-end"
                                    onClick={() => handleViewChange('ordbetweener')}
                                >
                                    Create Order
                                </button>
                                <button
                                    className="mb-4 ml-2 px-10 py-2 border-2 border-red-900 text-black rounded-lg self-end bg-transparent shadow-lg"
                                    onClick={() => handleViewChange('user')}
                                >
                                    Add Guest
                                </button>
                            </div> */}
                            {/* View Selection Buttons with Refresh */}
                            <div className="bg-white p-4 sm:p-8 shadow-md rounded-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    {/* Left-aligned buttons */}
                                    <div className="flex items-center">
                                        {/* <button
                                            onClick={() => handleViewChange('order')}
                                            className={`px-4 sm:px-8 py-1 border text-sm rounded-l-md ${view === 'order' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                        >
                                            Order View
                                        </button> */}
                                        {/* <button
                                            onClick={() => handleViewChange('table')}
                                            className={`px-4 sm:px-8 py-1 border text-sm ${view === 'table' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                        >
                                            Table View
                                        </button> */}
                                        <button
                                            onClick={() => handleViewChange('user')}
                                            className={`px-4 sm:px-8 py-1 border text-sm rounded-r-md ${view === 'user' ? 'bg-black text-white' : 'bg-white text-black border-black'}`}
                                        >
                                            User View
                                        </button>
                                    </div>

                                    {/* Right-aligned buttons */}
                                    <div className="flex items-center">
                                        {/* <button
                                            className="px-6 py-1 bg-red-900 border-2 border-red-900 text-white rounded-md"
                                            onClick={() => console.log('Create Order')

                                            }
                                        >
                                            Create Order
                                        </button> */}
                                        <button
                                            className="ml-2 px-10 py-1 border-2 border-red-900 text-black rounded-lg bg-transparent shadow-lg"
                                            onClick={handleAddGuestClick}
                                        >
                                            Add Guest
                                        </button>
                                        <AddGuestModal isOpen={isModalOpen} onClose={handleCloseModal} />

                                        <button
                                            className="ml-4 px-4 sm:px-6 py-1 hover:bg-gray-400 text-black rounded-md flex items-center"
                                            onClick={handleRefresh}
                                            disabled={loading} // Disable button when loading
                                        >
                                            {loading ? (
                                                <ImSpinner2 className="mr-2 animate-spin" /> // Spinner icon when loading
                                            ) : (
                                                <FaSync className="mr-2" /> // Refresh icon when not loading
                                            )}
                                        </button>
                                    </div>
                                </div>



                                {/* Divider */}
                                <hr className="my-4 border-gray-300" />
                                {/* Render the views with a key to trigger re-render */}
                                {view === 'order' && (
                                    <OrderView
                                        key={refreshKey}
                                        selectedRow={selectedRow}
                                        selectedTable={selectedTable}
                                        handleRowClick={handleRowClick}
                                        handleCloseSidebar={handleCloseSidebar}
                                        handleTableClick={handleTableClick}
                                    />
                                )}
                                {view === 'table' && (
                                    <TableView
                                        key={refreshKey}
                                        selectedTable={selectedTable}
                                        setSelectedTable={setSelectedTable}
                                    />
                                )}
                                {view === 'user' &&
                                    <UserView
                                        key={refreshKey}
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
