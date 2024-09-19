import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AddGuestModal = ({ isOpen, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [name, setName] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [role, setRole] = useState('guest'); // Default to guest
    const [customerId, setCustomerId] = useState(null);
    const [otpVerified, setOtpVerified] = useState(false);
    const [amount, setAmount] = useState(''); // State to hold wallet amount
    const inputRefs = useRef([]);
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;

        // Ensure that only numeric input is allowed and limit it to 10 digits
        if (value.length <= 10 && /^\d*$/.test(value)) {
            setPhoneNumber(value);

            // Validate the phone number length
            if (value.length === 10 || value.length === 0) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        const value = e.target.value;

        if (value.length === 1 && /^[0-9]$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 5) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleSendOtp = async () => {
        try {
            const response = await fetch('http://localhost:5000/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone: phoneNumber,
                    membership_status: role === 'member' ? 'MEMBER' : 'GUEST',
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCustomerId(data.id);
            setOtpSent(true);
        } catch (error) {
            console.error("There was an error sending the OTP request!", error);
        }
    };

    const handleSubmitOtp = async () => {
        try {
            const response = await fetch('http://localhost:5000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: `${customerId}`,
                    otp: otp.join(''),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Set OTP as verified and move to the wallet loading form
            setOtpVerified(true);
        } catch (error) {
            console.error("There was an error verifying the OTP!", error);
        }
    };

    const handleLoadWallet = async () => {
        const payload = [
            {
                phone_number: phoneNumber,
                amount_loaded: parseInt(amount, 10),
            },
        ];

        try {
            const response = await fetch('http://localhost:5000/wallets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Wallet loaded successfully!');
                onClose(); // Close modal after successful wallet load
            } else {
                alert('Failed to load wallet. Please try again.');
            }
        } catch (error) {
            console.error('Error loading wallet:', error);
            alert('An error occurred while loading the wallet.');
        }
    };

    const handleBack = () => {
        if (otpVerified) {
            setOtpVerified(false);
        } else {
            setOtpSent(false);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div id="modal-overlay" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
            <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    {(otpSent || otpVerified) && (
                        <button
                            onClick={handleBack}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                    )}
                    <h2 className="text-xl font-semibold text-gray-700">
                        {otpVerified ? 'Load Wallet' : otpSent ? 'Enter OTP' : 'Add Guest'}
                    </h2>
                    <div className="w-6"></div> {/* Placeholder for alignment */}
                </div>

                {!otpSent && !otpVerified ? (
                    <>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter Name"
                            className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="Enter Phone Number"
                                className={`w-full p-3 mb-2 border rounded-md ${isValid ? 'focus:ring-2 focus:ring-green-500' : 'border-red-500'}`}
                            />
                            {!isValid && phoneNumber.length > 0 && (
                                <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number.</p>
                            )}
                        </div>

                        <div className="flex items-center mb-6">
                            <label className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    value="member"
                                    checked={role === 'member'}
                                    onChange={handleRoleChange}
                                    className="form-radio text-red-600"
                                />
                                <span className="ml-2 text-gray-700">Be Member</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="guest"
                                    checked={role === 'guest'}
                                    onChange={handleRoleChange}
                                    className="form-radio text-red-600"
                                />
                                <span className="ml-2 text-gray-700">Guest</span>
                            </label>
                        </div>

                        <button
                            onClick={handleSendOtp}
                            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                        >
                            Send OTP
                        </button>
                    </>
                ) : otpSent && !otpVerified ? (
                    <>
                        <div className="flex justify-between mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    maxLength="1"
                                    onChange={(e) => handleOtpChange(e, index)}
                                    className="w-12 h-12 text-center border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleSubmitOtp}
                            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                        >
                            Submit OTP
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to load wallet"
                            className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <button
                            onClick={handleLoadWallet}
                            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                        >
                            Load Wallet
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddGuestModal;
