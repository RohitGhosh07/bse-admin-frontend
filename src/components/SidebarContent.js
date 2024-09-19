const SidebarContent = ({ handleCloseSidebar, children }) => (
    <div
        className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-4 z-40 transition-transform transform translate-x-0 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
    >
        <button onClick={handleCloseSidebar} className="text-red-900 mb-4 mt-24 self-start">
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
        {children}
    </div>
);
export default SidebarContent;