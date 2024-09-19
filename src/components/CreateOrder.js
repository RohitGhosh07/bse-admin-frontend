import React, { useState, useEffect, useRef } from 'react';

const CreateOrder = ({ handleExitCreateOrder, customer_id }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [itemCounts, setItemCounts] = useState({});
    const [itemDetails, setItemDetails] = useState({});
    const [notification, setNotification] = useState(null); // State for notification
    const dropdownRef = useRef(null);

    // Load items from localStorage and fetch their details on component mount
    useEffect(() => {
        const storedItems = {};
        const itemIdsToFetch = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('item_') && key.endsWith('_count')) {
                const itemData = JSON.parse(localStorage.getItem(key));
                storedItems[itemData.id] = itemData.count;

                // Add itemId to fetch list
                itemIdsToFetch.push(itemData.id);
            }
        }

        setItemCounts(storedItems);

        // Fetch item details for items in the cart
        if (itemIdsToFetch.length > 0) {
            Promise.all(itemIdsToFetch.map((itemId) => fetchItemDetails(itemId))).then((detailsArray) => {
                const combinedDetails = detailsArray.reduce((acc, detail) => {
                    return { ...acc, ...detail };
                }, {});
                setItemDetails(combinedDetails);
            });
        }

        // Close dropdown on outside click
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch item details whenever itemCounts change
    useEffect(() => {
        const itemIds = Object.keys(itemCounts);
        const itemIdsToFetch = itemIds.filter((itemId) => !itemDetails[itemId]);

        if (itemIdsToFetch.length > 0) {
            Promise.all(itemIdsToFetch.map((itemId) => fetchItemDetails(itemId))).then((detailsArray) => {
                const combinedDetails = detailsArray.reduce((acc, detail) => {
                    return { ...acc, ...detail };
                }, {});
                setItemDetails((prevDetails) => ({ ...prevDetails, ...combinedDetails }));
            });
        }
    }, [itemCounts]);

    const fetchItems = async (query) => {
        try {
            const response = await fetch(`http://localhost:5000/items?search=${query}`);
            const data = await response.json();
            setSearchResults(Array.isArray(data.items) ? data.items : []);
            const details = data.items.reduce((acc, item) => {
                acc[item.item_id] = item;
                return acc;
            }, {});
            setItemDetails((prevDetails) => ({ ...prevDetails, ...details }));
        } catch (error) {
            console.error('Error fetching items:', error);
            setSearchResults([]);
        }
    };

    const fetchItemDetails = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:5000/items?item_id=${itemId}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const item = data.items[0]; // Assuming API returns an array of items
                setItemDetails((prevDetails) => ({
                    ...prevDetails,
                    [itemId]: item,
                }));
                return { [itemId]: item };
            } else {
                console.error('No item found for itemId:', itemId);
                return {};
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
            return {};
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            fetchItems(query);
        } else {
            setSearchResults([]);
        }
    };

    const handleItemClick = (item) => {
        const itemKey = `item_${item.item_id}_count`;
        const existingItem = JSON.parse(localStorage.getItem(itemKey)) || { id: item.item_id, count: 0 };
        const updatedItem = { ...existingItem, count: existingItem.count + 1 };
        localStorage.setItem(itemKey, JSON.stringify(updatedItem));

        setItemCounts((prevCounts) => ({ ...prevCounts, [item.item_id]: updatedItem.count }));

        // Fetch the item details whenever an item is clicked
        fetchItemDetails(item.item_id);
        setSearchResults([]);
    };

    const handleCountChange = (itemId, change) => {
        const itemKey = `item_${itemId}_count`;
        const existingItem = JSON.parse(localStorage.getItem(itemKey)) || { id: itemId, count: 0 };
        const newCount = Math.max(existingItem.count + change, 0);
        const updatedItem = { ...existingItem, count: newCount };
        localStorage.setItem(itemKey, JSON.stringify(updatedItem));
        setItemCounts((prevCounts) => ({ ...prevCounts, [itemId]: updatedItem.count }));
    };

    const handleOrder = async () => {
        const items = Object.entries(itemCounts)
            .filter(([itemId, count]) => count > 0)
            .map(([itemId, count]) => ({
                id: itemId,
                count,
            }));

        const orderData = {
            customer_id,
            items,
        };

        try {
            const response = await fetch('http://localhost:5000/order_logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setNotification('Order successfully placed!');
                setItemCounts({}); // Clear item counts after successful order
                localStorage.clear(); // Clear localStorage after order
            } else {
                setNotification('Failed to place order.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setNotification('Error placing order.');
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleExitCreateOrder} className="text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="relative mb-4" ref={dropdownRef}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-md"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                </div>

                {searchResults.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                        {searchResults.map((item) => (
                            <li
                                key={item.item_id}
                                onClick={() => handleItemClick(item)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item.item_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {Object.keys(itemCounts).filter((itemId) => itemCounts[itemId] > 0).length > 0 && (
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
                        {Object.entries(itemCounts)
                            .filter(([itemId, count]) => count > 0) // Filter items with count > 0
                            .map(([itemId, count]) => {
                                const item = itemDetails[itemId] || {};
                                return (
                                    <tr key={itemId} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{item.item_name || `Item ${itemId}`}</td>
                                        <td className="px-4 py-2 border-b text-center"></td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <div className="flex items-center justify-center">
                                                <button className="focus:outline-none text-red-500" onClick={() => handleCountChange(itemId, -1)}>
                                                    ➖
                                                </button>
                                                <span className="mx-3">{count}</span>
                                                <button className="focus:outline-none text-green-500" onClick={() => handleCountChange(itemId, 1)}>
                                                    ➕
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            INR {item.base_price ? item.base_price.toFixed(2) : '00.00'}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="px-4 py-2 border-t text-right" colSpan="3">
                                Total Price:
                            </td>
                            <td className="px-4 py-2 border-t text-center">
                                INR{' '}
                                {Object.entries(itemCounts)
                                    .filter(([itemId, count]) => count > 0)
                                    .reduce((acc, [itemId, count]) => {
                                        const item = itemDetails[itemId] || {};
                                        return acc + (item.base_price ? item.base_price * count : 0);
                                    }, 0)
                                    .toFixed(2)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}

            <div className="flex justify-center mt-4">
                <button
                    onClick={handleOrder}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-150"
                >
                    Place Order
                </button>
            </div>

            {notification && (
                <div className="mt-4">
                    <div className="p-4 text-center text-white bg-green-500 rounded-md shadow-md">
                        {notification}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateOrder;
