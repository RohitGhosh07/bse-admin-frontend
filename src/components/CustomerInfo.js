import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';

const CustomerInfo = ({ customer }) => {
    const qrCodeRef = useRef();
    const today = new Date();
    const validThru = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;

    const handlePrint = useReactToPrint({
        content: () => qrCodeRef.current,
        documentTitle: `QR_${customer.session_id}`,
    });

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="bg-gray-200 px-2 rounded-xl font-bold">
                    {customer.membership_status}
                </div>
                <span className="ml-2">{customer.phone}</span>
            </div>
            <button
                className="ml-4 flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handlePrint}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 2a2 2 0 00-2 2v4h12V4a2 2 0 00-2-2H6zm-4 8a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5zm3 4a1 1 0 000 2h8a1 1 0 100-2H5z" />
                </svg>
                QR
            </button>

            {/* Hidden card design for printing */}
            <div style={{ display: 'none' }}>
                <div ref={qrCodeRef} style={{
                    width: '400px',
                    height: '250px',
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                    {/* Left Side - Customer Info */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingRight: '20px',
                    }}>
                        {/* Event Name */}
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            marginBottom: '10px',
                            textAlign: 'left'
                        }}>
                            BSE
                        </div>

                        {/* Customer Info */}
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '0px',
                            textAlign: 'left'
                        }}>
                            Name: {customer.name}
                        </div>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '10px',
                            textAlign: 'left'
                        }}>
                            Phone: {customer.phone}
                        </div>

                        {/* Card Design Elements */}
                        <div style={{
                            fontSize: '12px',
                            fontStyle: 'italic',
                            opacity: 0.8,
                            textAlign: 'left'
                        }}>
                            Membership Status: {customer.membership_status}
                        </div>
                        <div style={{
                            fontSize: '12px',
                            fontStyle: 'italic',
                            opacity: 0.8,
                            textAlign: 'left'
                        }}>
                            Valid Thru: {validThru}
                        </div>
                    </div>

                    {/* Right Side - QR Code */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '15px',
                            borderRadius: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}>
                            <QRCodeSVG value={customer.session_id} size={150} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CustomerInfo;