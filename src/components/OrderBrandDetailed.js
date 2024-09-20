import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderBrandDetailed = ({ selectedOrderId, selectedBrandId, orderItems, handleCloseSidebar }) => {
    const [brandDetails, setBrandDetails] = useState(null);
    const [itemDetails, setItemDetails] = useState({});
    const [status, setStatus] = useState('In Progress'); // Initial state for the dropdown status

    // Fetch Brand Details
    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/brands/${selectedBrandId}`);
                const data = await response.json();
                setBrandDetails(data);
            } catch (error) {
                console.error("Error fetching brand details:", error);
            }
        };

        if (selectedBrandId) {
            fetchBrandDetails();
        }
    }, [selectedBrandId]);

    // Fetch Item Details for each order item
    useEffect(() => {
        const fetchItemDetails = async () => {
            const itemDetailPromises = orderItems.map(async (item) => {
                try {
                    const response = await fetch(`http://localhost:5000/items?item_id=${item.item_id}`);
                    const data = await response.json();
                    return data.items[0]; // Assuming the API returns an array under `items`
                } catch (error) {
                    console.error("Error fetching item details:", error);
                    return null;
                }
            });

            // Wait for all item details to be fetched
            const itemDetailsArray = await Promise.all(itemDetailPromises);

            // Create a mapping of item_id to item details for easy lookup
            const itemDetailsMap = {};
            itemDetailsArray.forEach((itemDetail) => {
                if (itemDetail) {
                    itemDetailsMap[itemDetail.item_id] = itemDetail;
                }
            });

            setItemDetails(itemDetailsMap);
        };

        if (orderItems.length > 0) {
            fetchItemDetails();
        }
    }, [orderItems]);

    // Function to update the order status using the API
    const updateStatus = async (orderId, itemId) => {
        try {
            const response = await fetch('http://localhost:5000/order_logs/update_status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: orderId,
                    item_id: itemId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const result = await response.json();
            console.log('Status update response:', result);

            // Show success notification
            toast.success(`Order ${orderId} completed successfully!`);
        } catch (error) {
            console.error('Error updating status:', error);
            // Show error notification
            toast.error('Failed to complete the order.');
        }
    };


    // Handle dropdown change and send the correct item ID
    const handleStatusChange = (event, itemId) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        if (newStatus === 'Completed') {
            updateStatus(selectedOrderId, [itemId]); // Send itemId as an array
            console.log(`Updating status for order ${selectedOrderId} and item ${itemId} to Completed`);
        }
    };


    if (selectedOrderId === null || selectedBrandId === null || !brandDetails) return null;

    // Filter order items by selectedBrandId
    const filteredItems = orderItems.filter(item => item.brand_id === selectedBrandId);

    return (
        <>
            <div className="fixed inset-0 bg-gray-200 opacity-50 z-30" onClick={handleCloseSidebar}></div>
            <div className="fixed top-0 right-0 h-full w-full bg-white shadow-lg p-8 z-40 transition-transform transform translate-x-0 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col mt-20">
                    <button onClick={handleCloseSidebar} className="text-red-900 mb-4 self-start">
                        <svg width="51" height="30" viewBox="0 0 51 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51" stroke="black" strokeWidth="2" />
                        </svg>
                    </button>
                    <div className="flex items-center mb-4 justify-around">
                        <div className="flex flex-col">
                            <h2 className="text-4xl font-bold mb-4">Order {selectedOrderId}</h2>
                            <div className="bg-gray-200 px-4 py-2 rounded-xl font-bold">{brandDetails.name}</div>
                        </div>
                        <div className="border-r h-20 px-2"></div>
                        <div className="ml-2 w-1/3">
                            <img src={brandDetails.image} alt={brandDetails.name} className="h-20 object-contain" />
                        </div>
                        <div className="flex-1 flex items-center justify-end">
                            <div className="flex w-2/3 px-2">


                            </div>
                            <FaPen className="w-6 h-6 text-gray-600 ml-2" />
                        </div>
                    </div>
                    <hr className="border-gray-300 mb-4" />
                    <div className="overflow-x-auto mb-4">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b"></th>
                                    <th className="px-4 py-2 border-b">Item Name</th>
                                    <th className="px-4 py-2 border-b">Quantity</th>
                                    <th className="px-4 py-2 border-b">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item, itemIndex) => {
                                    const itemDetail = itemDetails[item.item_id];
                                    return (
                                        <tr key={itemIndex} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border-b text-center">
                                                <img src={itemDetail ? itemDetail.image : 'Loading...'} alt={itemDetail ? itemDetail.item_name : 'Loading...'} className="h-16 w-16 object-cover mx-auto" />
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                {itemDetail ? itemDetail.item_name : 'Loading...'}
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                INR {itemDetail ? itemDetail.base_price : 'Loading...'}
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <select value={status} onChange={(e) => handleStatusChange(e, item.item_id)} className="w-full px-4 py-2 border rounded-md">
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="px-4 py-2 border-b font-bold text-center"></td>
                                    <td className="px-4 py-2 border-b font-bold text-center">Total</td>
                                    <td className="px-4 py-2 border-b font-bold text-center">
                                        {filteredItems.reduce((total, item) => total + item.quantity, 0)}
                                    </td>
                                    <td className="px-4 py-2 border-b font-bold text-center">
                                        INR {filteredItems.reduce((total, item) => {
                                            const itemDetail = itemDetails[item.item_id];
                                            return total + (itemDetail ? itemDetail.base_price * item.quantity : 0);
                                        }, 0).toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-center"  // You can use "bottom-right" or "bottom-left" as well
                    autoClose={5000}  // Auto close after 5 seconds (optional)
                    hideProgressBar={false}  // Show or hide progress bar (optional)
                    newestOnTop={false}  // Whether to display newest toast on top
                    closeOnClick
                    rtl={false}  // Set to true for RTL support
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>
        </>
    );
};

export default OrderBrandDetailed;
