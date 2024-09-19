import React, { useState } from 'react';
import { FaPen, FaCheck } from 'react-icons/fa';
import CustomerInfo from './CustomerInfo';

const CustomerDetails = ({ customer, walletData, isLoading, handleWalletClick }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(customer.name || 'N/A');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmitClick = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customers/${customer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setIsEditing(false);
        } catch (error) {
            console.error("There was an error updating the name!", error);
        }
    };

    return (
        <div>
            <div className="bg-white px-4 rounded-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            {isEditing ? (
                                <>
                                    <FaCheck
                                        className="cursor-pointer text-green-500 mr-2"
                                        onClick={handleSubmitClick}
                                    />
                                    <input
                                        className="text-4xl font-bold mb-1 border-b-2 focus:outline-none"
                                        type="text"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <FaPen
                                        className="cursor-pointer text-gray-500 mr-2"
                                        onClick={handleEditClick}
                                    />
                                    <h2 className="text-4xl font-bold mb-1">
                                        {name}
                                    </h2>
                                </>
                            )}
                        </div>
                        <CustomerInfo customer={customer} />

                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            {isLoading ? (
                                <div className="loader">Loading...</div>
                            ) : (
                                <span className="ml-2 text-xl font-bold">
                                    ₹{walletData !== null ? walletData.toLocaleString('en-IN') : '0.00'}
                                </span>
                            )}
                        </div>
                        <button
                            className="mb-4 mt-2 ml-2 px-10 py-1 border-2 border-red-900 text-black rounded-lg self-end bg-transparent shadow-xl"
                            onClick={handleWalletClick}
                        >
                            Load Wallet
                        </button>
                    </div>
                </div>
                <hr className="border-gray-300 mb-4" />
            </div>
        </div>
    );
};
export default CustomerDetails;