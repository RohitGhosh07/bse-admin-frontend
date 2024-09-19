import React, { useState } from 'react';
import SidebarOverlay from './SidebarOverlay';
import SidebarContent from './SidebarContent';
import CustomerDetails from './CustomerDetails';
import OrderBrandDetailed from './OrderBrandDetailed';

import OrderTable from './OrderTable';

// State and Function Definitions
const OrderSidebar = ({ selectedTable, customers, orderLogs, isLoading, walletData, handleCloseSidebar, handleCreateOrderClick, handleWalletClick, isCreatingOrder }) => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [showOrderBrandDetailed, setShowOrderBrandDetailed] = useState(false);

    const handleBrandDetailedOrderClick = (orderId, brandId) => {
        setSelectedOrderId(orderId);
        setSelectedBrandId(brandId);
        setShowOrderBrandDetailed(true);
    };

    const handleCloseOrderBrandDetailed = () => {
        setShowOrderBrandDetailed(false);
    };

    if (selectedTable === null) return null;

    const customer = customers[selectedTable];
    const orders = orderLogs[customer.id] || [];

    return (
        <>
            <SidebarOverlay handleCloseSidebar={handleCloseSidebar} />
            <SidebarContent handleCloseSidebar={handleCloseSidebar}>
                <CustomerDetails
                    customer={customer}
                    walletData={walletData}
                    isLoading={isLoading}
                    handleWalletClick={handleWalletClick}
                />
                <OrderTable
                    orders={orders}
                    isCreatingOrder={isCreatingOrder}
                    handleCreateOrderClick={handleCreateOrderClick}
                    handleRowClick={handleBrandDetailedOrderClick}
                    customer_id={customer.id}
                />

                {/* Conditionally render OrderBrandDetailed */}
                {showOrderBrandDetailed && (
                    <OrderBrandDetailed
                        selectedOrderId={selectedOrderId}
                        selectedBrandId={selectedBrandId}
                        handleCloseSidebar={handleCloseOrderBrandDetailed}
                        orderItems={orders.find(order => order.order_id === selectedOrderId).items}
                    />
                )}
            </SidebarContent>
        </>
    );
};
export default OrderSidebar;
