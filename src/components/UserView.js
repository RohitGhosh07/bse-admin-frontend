import React, { useState, useEffect } from 'react';
import WalletLoader from './WalletLoader';
import OrderSidebar from './orderSidebar';

const UserView = ({ selectedRow, selectedTable, handleRowClick, handleCloseSidebar, handleTableClick }) => {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [isOTPSent, setIsOTPSent] = useState(false);

    const [customers, setCustomers] = useState([]);
    const [orderLogs, setOrderLogs] = useState({});
    const [itemPrices, setItemPrices] = useState({});

    useEffect(() => {
        // Fetch today's customers
        fetch('http://localhost:5000/todaycustomers')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.customers);
                data.customers.forEach(customer => {
                    // Fetch order logs for each customer
                    fetch('http://localhost:5000/order_logs')
                        .then(orderResponse => orderResponse.json())
                        .then(orderData => {
                            const customerOrders = orderData.order_logs.filter(order => order.customer_id === customer.id);
                            const itemIds = customerOrders.flatMap(order => order.items.map(item => item.item_id));
                            fetch(`http://localhost:5000/items?item_id=${itemIds.join(',')}`)
                                .then(itemResponse => itemResponse.json())
                                .then(itemData => {
                                    const prices = itemData.items.reduce((acc, item) => {
                                        acc[item.item_id] = item.base_price;
                                        return acc;
                                    }, {});
                                    setItemPrices(prevPrices => ({ ...prevPrices, ...prices }));
                                    setOrderLogs(prevOrderLogs => ({
                                        ...prevOrderLogs,
                                        [customer.id]: customerOrders
                                    }));
                                })
                                .catch(error => console.error('Error fetching item prices:', error));
                        })
                        .catch(error => console.error('Error fetching order logs:', error));
                });
            })
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const calculateTotalItemsAndInvoice = (orders) => {
        let totalItems = 0;
        let totalInvoice = 0;
        orders.forEach(order => {
            order.items.forEach(item => {
                totalItems += item.quantity;
                totalInvoice += item.quantity * (itemPrices[item.item_id] || 0);
            });
        });
        return { totalItems, totalInvoice };
    };

    const handleSendOTP = () => {
        // Logic to send OTP
        setIsOTPSent(true);
    };

    const handleWalletClick = () => {
        setIsWalletModalOpen(true);
    };

    const handleCloseWalletModal = () => {
        setIsWalletModalOpen(false);
    };

    const handleCreateOrderClick = () => {
        setIsCreatingOrder(true);

        
    };

    const [walletData, setWalletData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const customerId = customers[selectedTable]?.id;
        setIsLoading(true); // Start loading
        fetch(`http://localhost:5000/wallets?customer_id=${customerId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.wallets && data.wallets.length > 0) {
                    setWalletData(data.wallets[0].current_amount);
                } else {
                    setWalletData(null);
                }
                setIsLoading(false); // Stop loading
            })
            .catch((error) => {
                console.error("Error fetching wallet data:", error);
                setWalletData(null);
                setIsLoading(false); // Stop loading
            });
    }, [selectedTable]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">#</th>
                        <th className="px-4 py-2 border-b">User Name</th>
                        <th className="px-4 py-2 border-b">Phone</th>
                        <th className="px-4 py-2 border-b">Membership</th>
                        <th className="px-4 py-2 border-b">KOT #</th>
                        <th className="px-4 py-2 border-b">Total Elapsed</th>
                        <th className="px-4 py-2 border-b">Total Items</th>
                        <th className="px-4 py-2 border-b">Invoice Value</th>
                        <th className="px-4 py-2 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, rowIndex) => {
                        const orders = orderLogs[customer.id] || [];
                        const { totalItems, totalInvoice } = calculateTotalItemsAndInvoice(orders);

                        return (
                            <tr key={customer.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleTableClick(rowIndex)}>
                                <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
                                <td className="px-4 py-2 border-b text-center">{customer.name || 'N/A'}</td>
                                <td className="px-4 py-2 border-b text-center">{customer.phone}</td>
                                <td className="px-4 py-2 border-b text-center">{customer.membership_status}</td>
                                <td className="px-4 py-2 border-b text-center">{orders.length ? orders[0].order_id : 'N/A'}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <div className="px-2 bg-gray-200 rounded-xl text-center">20 min</div>
                                </td>
                                <td className="px-4 py-2 border-b text-center">{totalItems}</td>
                                <td className="px-4 py-2 border-b text-center">INR {totalInvoice.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
                                    </svg>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <OrderSidebar
                selectedTable={selectedTable}
                customers={customers}
                orderLogs={orderLogs} // Ensure this includes brand info
                isLoading={isLoading}
                walletData={walletData}
                handleCloseSidebar={handleCloseSidebar}
                handleCreateOrderClick={handleCreateOrderClick}
                handleWalletClick={handleWalletClick}
                isCreatingOrder={isCreatingOrder}
                handleRowClick={handleRowClick}
            />


            <WalletLoader
                phoneNumber={customers[selectedTable]?.phone}
                sessionid={customers[selectedTable]?.session_id}
                isWalletModalOpen={isWalletModalOpen}
                handleCloseWalletModal={handleCloseWalletModal}
            />
            

        </div>
    );
};

export default UserView;
// import React, { useState, useEffect } from 'react';
// import WalletLoader from './WalletLoader';
// import OrderSidebar from './orderSidebar';

// const UserView = ({ selectedRow, selectedTable, handleRowClick, handleCloseSidebar, handleTableClick }) => {
//     const [isCreatingOrder, setIsCreatingOrder] = useState(false);
//     const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
//     const [isOTPSent, setIsOTPSent] = useState(false);

//     const [customers, setCustomers] = useState([]);
//     const [orderLogs, setOrderLogs] = useState({});
//     const [itemPrices, setItemPrices] = useState({});

//     const fetchOrders = () => {
//         fetch('http://localhost:5000/todaycustomers')
//             .then(response => response.json())
//             .then(data => {
//                 setCustomers(data.customers);
//                 data.customers.forEach(customer => {
//                     fetch('http://localhost:5000/order_logs')
//                         .then(orderResponse => orderResponse.json())
//                         .then(orderData => {
//                             const customerOrders = orderData.order_logs.filter(order => order.customer_id === customer.id);
//                             const itemIds = customerOrders.flatMap(order => order.items.map(item => item.item_id));
//                             fetch(`http://localhost:5000/items?item_id=${itemIds.join(',')}`)
//                                 .then(itemResponse => itemResponse.json())
//                                 .then(itemData => {
//                                     const prices = itemData.items.reduce((acc, item) => {
//                                         acc[item.item_id] = item.base_price;
//                                         return acc;
//                                     }, {});
//                                     setItemPrices(prevPrices => ({ ...prevPrices, ...prices }));
//                                     setOrderLogs(prevOrderLogs => ({
//                                         ...prevOrderLogs,
//                                         [customer.id]: customerOrders
//                                     }));
//                                 })
//                                 .catch(error => console.error('Error fetching item prices:', error));
//                         })
//                         .catch(error => console.error('Error fetching order logs:', error));
//                 });
//             })
//             .catch(error => console.error('Error fetching customers:', error));
//     };

//     // Fetch orders on mount
//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const calculateTotalItemsAndInvoice = (orders) => {
//         let totalItems = 0;
//         let totalInvoice = 0;
//         orders.forEach(order => {
//             order.items.forEach(item => {
//                 totalItems += item.quantity;
//                 totalInvoice += item.quantity * (itemPrices[item.item_id] || 0);
//             });
//         });
//         return { totalItems, totalInvoice };
//     };

//     const handleSendOTP = () => {
//         // Logic to send OTP
//         setIsOTPSent(true);
//     };

//     const handleWalletClick = () => {
//         setIsWalletModalOpen(true);
//     };

//     const handleCloseWalletModal = () => {
//         setIsWalletModalOpen(false);
//     };

//     const handleCreateOrderClick = () => {
//         setIsCreatingOrder(true);
//     };

//     const [walletData, setWalletData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const customerId = customers[selectedTable]?.id;
//         setIsLoading(true); // Start loading
//         fetch(`http://localhost:5000/wallets?customer_id=${customerId}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 if (data.wallets && data.wallets.length > 0) {
//                     setWalletData(data.wallets[0].current_amount);
//                 } else {
//                     setWalletData(null);
//                 }
//                 setIsLoading(false); // Stop loading
//             })
//             .catch((error) => {
//                 console.error("Error fetching wallet data:", error);
//                 setWalletData(null);
//                 setIsLoading(false); // Stop loading
//             });
//     }, [selectedTable]);

//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2 border-b">#</th>
//                         <th className="px-4 py-2 border-b">User Name</th>
//                         <th className="px-4 py-2 border-b">Phone</th>
//                         <th className="px-4 py-2 border-b">Membership</th>
//                         <th className="px-4 py-2 border-b">KOT #</th>
//                         <th className="px-4 py-2 border-b">Total Elapsed</th>
//                         <th className="px-4 py-2 border-b">Total Items</th>
//                         <th className="px-4 py-2 border-b">Invoice Value</th>
//                         <th className="px-4 py-2 border-b"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map((customer, rowIndex) => {
//                         const orders = orderLogs[customer.id] || [];
//                         const { totalItems, totalInvoice } = calculateTotalItemsAndInvoice(orders);

//                         return (
//                             <tr key={customer.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleTableClick(rowIndex)}>
//                                 <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
//                                 <td className="px-4 py-2 border-b text-center">{customer.name || 'N/A'}</td>
//                                 <td className="px-4 py-2 border-b text-center">{customer.phone}</td>
//                                 <td className="px-4 py-2 border-b text-center">{customer.membership_status}</td>
//                                 <td className="px-4 py-2 border-b text-center">{orders.length ? orders[0].order_id : 'N/A'}</td>
//                                 <td className="px-4 py-2 border-b text-center">
//                                     <div className="px-2 bg-gray-200 rounded-xl text-center">20 min</div>
//                                 </td>
//                                 <td className="px-4 py-2 border-b text-center">{totalItems}</td>
//                                 <td className="px-4 py-2 border-b text-center">INR {totalInvoice.toFixed(2)}</td>
//                                 <td className="px-4 py-2 border-b text-center">
//                                     <svg width="39" height="20" viewBox="0 0 39 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
//                                     </svg>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             <OrderSidebar
//                 selectedTable={selectedTable}
//                 customers={customers}
//                 orderLogs={orderLogs} // Ensure this includes brand info
//                 isLoading={isLoading}
//                 walletData={walletData}
//                 handleCloseSidebar={handleCloseSidebar}
//                 handleCreateOrderClick={handleCreateOrderClick}
//                 handleWalletClick={handleWalletClick}
//                 isCreatingOrder={isCreatingOrder}
//                 handleRowClick={handleRowClick}
//             />


//             <WalletLoader
//                 phoneNumber={customers[selectedTable]?.phone}
//                 sessionid={customers[selectedTable]?.session_id}
//                 isWalletModalOpen={isWalletModalOpen}
//                 handleCloseWalletModal={handleCloseWalletModal}
//             />
            

//         </div>
//     );
// };

// export default UserView;
