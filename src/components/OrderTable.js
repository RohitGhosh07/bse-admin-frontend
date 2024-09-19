
import React, { useState, useEffect, useRef } from 'react';
import OrderRow from './OrderRow';
import CreateOrder from './CreateOrder';

const OrderTable = ({ orders, handleRowClick,customer_id }) => {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const handleCreateOrderClick = () => {
        setIsCreatingOrder(true);
    };

    const handleExitCreateOrder = () => {
        setIsCreatingOrder(false);
    };

    return (
        <>
            {isCreatingOrder ? (
                <CreateOrder handleExitCreateOrder={handleExitCreateOrder}
                    customer_id={customer_id}

                />
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
                                {orders
                                    .filter(order => order.status === 'Ongoing')
                                    .map((order, index) => (
                                        <OrderRow
                                            key={order.id}
                                            order={order}
                                            index={index}
                                            handleRowClick={handleRowClick}
                                        />
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
                                    <th className="px-4 py-2 border-b">Order #</th>
                                    <th className="px-4 py-2 border-b">Total Items</th>
                                    <th className="px-4 py-2 border-b">Invoice Value</th>
                                    <th className="px-4 py-2 border-b"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders
                                    .filter(order => order.status === 'Completed')
                                    .map((order, index) => (
                                        <OrderRow
                                            key={order.id}
                                            order={order}
                                            index={index}
                                            handleRowClick={handleRowClick}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    );
};
export default OrderTable;