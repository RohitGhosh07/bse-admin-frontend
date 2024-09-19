import React from 'react';
const SidebarOverlay = ({ handleCloseSidebar }) => (
    <>
        <div className="fixed inset-0 bg-gray-200 opacity-50 z-30" onClick={handleCloseSidebar}></div>
    </>
);
export default SidebarOverlay;