import React, { useState } from 'react';
import { FaUserCircle, FaBars, FaPen } from 'react-icons/fa';

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
         {/* Navbar */}
         <div className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-50">
                <div className="flex items-center">
                    <img src="https://i.ibb.co/gPPqZfg/bse-demo-logo.png" alt="Logo" className="object-cover w-20 h-auto ml-2 sm:ml-8" />
                </div>
                <div className="relative ">

                    {/* Profile Icon with Shadow */}
                    <div className="shadow-md rounded-full p-1 bg-white">
                        <FaUserCircle className="text-2xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)} />
                    </div>
                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-100 shadow-lg rounded-md z-50">
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Profile</div>
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Settings</div>
                            <div className="p-2 cursor-pointer hover:bg-gray-100">Logout</div>
                        </div>
                    )}
                </div>
            </div>
    </div>
  )
}

export default NavBar