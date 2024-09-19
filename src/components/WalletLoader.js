import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const WalletLoader = ({ phoneNumber, isWalletModalOpen, handleCloseWalletModal, sessionid }) => {
    const [amount, setAmount] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [isValidQR, setIsValidQR] = useState(false); // State to check if QR is valid

    const handleSendOTP = () => {
        setIsOTPSent(true);
        setLoading(false);
        console.log(sessionid);
    };

    const handleLoadWallet = async () => {
        const payload = [
            {
                phone_number: phoneNumber,
                amount_loaded: parseInt(amount, 10)
            }
        ];

        try {
            const response = await fetch('http://localhost:5000/wallets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Wallet loaded successfully!');
                handleCloseWalletModal();
            } else {
                alert('Failed to load wallet. Please try again.');
            }
        } catch (error) {
            console.error('Error loading wallet:', error);
            alert('An error occurred while loading the wallet.');
        }
    };

    const handleScan = (data) => {
        if (data) {
            setQrData(data);
            // Check if QR data matches sessionid
            if (data.text === sessionid) {
                setIsValidQR(true); // Valid QR code
            } else {
                setIsValidQR(false); // Invalid QR code
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        alert('Error scanning QR code. Please try again.');
    };

    const handleRetry = () => {
        setQrData(null); // Clear the QR data
        setIsValidQR(false); // Reset the validation
    };

    return (
        <>
            {isWalletModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-2xl shadow-lg relative w-80 max-w-full">
                            <h2 className="text-2xl mb-4 text-center font-semibold">Load Wallet</h2>
                            {!isOTPSent ? (
                                <>
                                    <div className="mb-4">
                                        <input
                                            type="number"
                                            placeholder="Enter Amount"
                                            className="px-4 py-3 border border-gray-300 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="px-4 py-3 bg-red-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition"
                                        onClick={handleSendOTP}
                                    >
                                        Show QR 
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="mb-4 text-center">
                                        <p className="text-lg font-medium">Scan QR Code</p>
                                        <p className="text-xl font-bold mt-2">{phoneNumber}</p>
                                    </div>
                                    <div className="mb-4">
                                        <QrScanner
                                            delay={300}
                                            onScan={handleScan}
                                            onError={handleError}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    {qrData && (
                                        <div className="bg-gray-100 p-4 rounded-xl shadow-inner text-center mb-4">
                                            <p className="text-gray-700 font-medium">QR Data:</p>
                                            <p className="text-gray-900 font-bold">{qrData.text}</p>
                                        </div>
                                    )}
                                    {qrData && isValidQR ? (
                                        <button
                                            className="px-4 py-3 bg-green-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition"
                                            onClick={handleLoadWallet}
                                        >
                                            Load Wallet
                                        </button>
                                    ) : qrData && !isValidQR ? (
                                        <>
                                            <div className="text-red-600 font-semibold text-center mb-4">
                                                Invalid QR Code
                                            </div>
                                            <button
                                                className="px-4 py-3 bg-red-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition"
                                                onClick={handleRetry}
                                            >
                                                Try Again
                                            </button>
                                        </>
                                    ) : null}
                                </>
                            )}
                            <button
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                                onClick={handleCloseWalletModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="fixed inset-0 bg-black opacity-75 z-40"></div>
                </>
            )}
        </>
    );
};

export default WalletLoader;


// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import Webcam from 'react-webcam';
// import jsQR from 'jsqr';

// const WalletLoader = ({ phoneNumber, isWalletModalOpen, handleCloseWalletModal, sessionid }) => {
//     const [amount, setAmount] = useState('');
//     const [isOTPSent, setIsOTPSent] = useState(false);
//     const [qrData, setQrData] = useState(null);
//     const [isValidQR, setIsValidQR] = useState(false); // State to check if QR is valid
//     const webcamRef = useRef(null); // Webcam reference
//     const canvasRef = useRef(null); // Canvas reference

//     const handleSendOTP = () => {
//         setIsOTPSent(true);
//         console.log(sessionid);
//     };

//     const handleLoadWallet = async () => {
//         // Your load wallet API logic here
//         // On success:
//         alert('Wallet loaded successfully!');
//         handleCloseWalletModal();
//     };

//     const handleRetry = () => {
//         setQrData(null); // Clear the QR data
//         setIsValidQR(false); // Reset the validation
//     };

//     // Function to process the video frame and detect QR code
//     const processFrame = useCallback(() => {
//         const canvas = canvasRef.current;
//         const webcam = webcamRef.current;

//         if (webcam && webcam.video.readyState === 4) {
//             const video = webcam.video;
//             const videoWidth = video.videoWidth;
//             const videoHeight = video.videoHeight;

//             // Set canvas dimensions
//             canvas.width = videoWidth;
//             canvas.height = videoHeight;

//             const ctx = canvas.getContext('2d');
//             ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

//             const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
//             const code = jsQR(imageData.data, videoWidth, videoHeight);

//             if (code) {
//                 // Draw bounding box around the detected QR code
//                 ctx.strokeStyle = "green";
//                 ctx.lineWidth = 4;
//                 ctx.beginPath();
//                 ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
//                 ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
//                 ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
//                 ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
//                 ctx.closePath();
//                 ctx.stroke();

//                 // Set QR data if detected and check if it's valid
//                 setQrData(code.data);
//                 if (code.data === sessionid) {
//                     setIsValidQR(true); // Valid QR code
//                 } else {
//                     setIsValidQR(false); // Invalid QR code
//                 }
//             } else {
//                 setQrData(null); // No QR code detected
//             }
//         }
//     }, [sessionid]);

//     // Continuously scan for QR codes
//     useEffect(() => {
//         const interval = setInterval(() => {
//             processFrame();
//         }, 100); // Scan every 100ms
//         return () => clearInterval(interval);
//     }, [processFrame]);

//     return (
//         <>
//             {isWalletModalOpen && (
//                 <>
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                         <div className="bg-white p-6 rounded-2xl shadow-lg relative w-80 max-w-full">
//                             <h2 className="text-2xl mb-4 text-center font-semibold">Load Wallet</h2>
//                             {!isOTPSent ? (
//                                 <>
//                                     <div className="mb-4">
//                                         <input
//                                             type="number"
//                                             placeholder="Enter Amount"
//                                             className="px-4 py-3 border border-gray-300 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                                             value={amount}
//                                             onChange={(e) => setAmount(e.target.value)}
//                                         />
//                                     </div>
//                                     <button
//                                         className="px-4 py-3 bg-red-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition"
//                                         onClick={handleSendOTP}
//                                     >
//                                         Scan QR
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className="mb-4 text-center">
//                                         <p className="text-lg font-medium">Scan QR Code Of:</p>
//                                         <p className="text-xl font-bold mt-2">{phoneNumber}</p>
//                                     </div>

//                                     <div className="mb-4 relative">
//                                         <Webcam
//                                             ref={webcamRef}
//                                             style={{ width: '100%', borderRadius: '10px' }}
//                                             videoConstraints={{ facingMode: 'environment' }}
//                                         />
//                                         <canvas
//                                             ref={canvasRef}
//                                             style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
//                                         />
//                                     </div>

//                                     {qrData && isValidQR ? (
//                                         <button
//                                             className="px-4 py-3 bg-green-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-700 transition"
//                                             onClick={handleLoadWallet}
//                                         >
//                                             Load Wallet
//                                         </button>
//                                     ) : qrData && !isValidQR ? (
//                                         <>
//                                             <div className="text-red-600 font-semibold text-center mb-4">
//                                                 Invalid QR Code
//                                             </div>
//                                             <button
//                                                 className="px-4 py-3 bg-red-600 text-white rounded-lg w-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700 transition"
//                                                 onClick={handleRetry}
//                                             >
//                                                 Try Again
//                                             </button>
//                                         </>
//                                     ) : null}
//                                 </>
//                             )}
//                             <button
//                                 className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
//                                 onClick={handleCloseWalletModal}
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth="2"
//                                     stroke="currentColor"
//                                     className="w-6 h-6"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                     <div className="fixed inset-0 bg-black opacity-75 z-40"></div>
//                 </>
//             )}
//         </>
//     );
// };

// export default WalletLoader;
