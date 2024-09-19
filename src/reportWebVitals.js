const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
// {
//   selectedTable !== null && (
//       customers.map((customer, rowIndex) => {
//           const orders = orderLogs[customer.id] || [];
//           const { totalItems, totalInvoice } = calculateTotalItemsAndInvoice(orders);
//           return (
//               <>
//                   <div
//                       className="fixed inset-0 bg-gray-200 opacity-50 z-30"
//                       onClick={handleCloseSidebar}
//                   ></div>
//                   <div
//                       className="fixed top-0 right-0 h-full w-6/12 bg-white shadow-lg p-4 z-40 transition-transform transform translate-x-0 overflow-y-auto"
//                       onClick={(e) => e.stopPropagation()}
//                   >
//                       <div className="flex flex-col mt-20">
//                           <button
//                               onClick={handleCloseSidebar}
//                               className="text-red-900 mb-4 self-start"
//                           >
//                               <svg
//                                   width="51"
//                                   height="30"
//                                   viewBox="0 0 51 30"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                               >
//                                   <path
//                                       d="M19.8182 1L2 15M2 15L19.8182 29M2 15H51"
//                                       stroke="black"
//                                       strokeWidth="2"
//                                   />
//                               </svg>
//                           </button>

//                           <div className="bg-white px-4 rounded-md w-full">
//                               <div className="flex justify-between items-center mb-4">
//                                   <div className="flex flex-col">
//                                       <div className="flex items-center mb-2">
//                                           <FaPen className="cursor-pointer text-gray-500 mr-2" />
//                                           <h2 className="text-4xl font-bold mb-1">
//                                               {customer.name || 'N/A'}
//                                           </h2>
//                                       </div>
//                                       <div className="flex items-center">
//                                           <div className="bg-gray-200 px-2 rounded-xl font-bold">
//                                               G
//                                           </div>
//                                           <span className="ml-2">{customer.phone}</span>
//                                           {/* <span className="ml-1">+4</span> */}
//                                       </div>
//                                   </div>
//                                   <div className="flex flex-col items-center">
//                                       <div className="flex items-center">
//                                           <span className="ml-2 text-xl font-bold">₹5,000</span>
//                                       </div>
//                                       <div>
//                                           <button
//                                               className="mb-4 mt-2 ml-2 px-10 py-1 border-2 border-red-900 text-black rounded-lg self-end bg-transparent shadow-xl"
//                                               onClick={handleWalletClick}
//                                           >
//                                               Load Wallet
//                                           </button>
//                                       </div>
//                                   </div>
//                               </div>

//                               <hr className="border-gray-300 mb-4" />

//                               {isCreatingOrder ? (
//                                   <div>
//                                       <div className="overflow-x-auto mb-4">
//                                           <div className="relative">
//                                               <input
//                                                   type="text"
//                                                   placeholder="Search items..."
//                                                   className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-md"
//                                               />
//                                               <div className="absolute inset-y-0 left-0 flex items-center pl-3">
//                                                   <svg
//                                                       xmlns="http://www.w3.org/2000/svg"
//                                                       className="h-5 w-5 text-gray-500"
//                                                       viewBox="0 0 20 20"
//                                                       fill="currentColor"
//                                                   >
//                                                       <path
//                                                           fillRule="evenodd"
//                                                           d="M12.9 14.32a8 8 0 111.42-1.42l4.7 4.7a1 1 0 11-1.42 1.42l-4.7-4.7zM8 14a6 6 0 100-12 6 6 0 000 12z"
//                                                           clipRule="evenodd"
//                                                       />
//                                                   </svg>
//                                               </div>
//                                           </div>

//                                           <table className="min-w-full bg-white">
//                                               <thead>
//                                                   <tr>
//                                                       <th className="px-4 py-2 border-b">Item Name</th>
//                                                       <th className="px-4 py-2 border-b"></th>
//                                                       <th className="px-4 py-2 border-b">Quantity</th>
//                                                       <th className="px-4 py-2 border-b">Price</th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   {Array.from({ length: 4 }).map((_, itemIndex) => (
//                                                       <tr key={itemIndex} className="hover:bg-gray-100">
//                                                           <td className="px-4 py-2 border-b text-center">Item #{itemIndex + 1}</td>
//                                                           <td className="px-4 py-2 border-b text-center"></td>
//                                                           <td className="px-4 py-2 border-b text-center">{1 + itemIndex}</td>
//                                                           <td className="px-4 py-2 border-b text-center">INR 100.00</td>
//                                                       </tr>
//                                                   ))}
//                                               </tbody>
//                                               <tfoot>
//                                                   <tr>
//                                                       <td className="px-4 py-2 border-b font-bold text-center">Total</td>
//                                                       <td className="px-4 py-2 border-b"></td>
//                                                       <td className="px-4 py-2 border-b font-bold text-center">10</td>
//                                                       <td className="px-4 py-2 border-b font-bold text-center">INR 400.00</td>
//                                                   </tr>
//                                               </tfoot>
//                                           </table>
//                                           <a href="/items">
//                                               <div className="flex justify-between items-center py-2 px-4 mt-1 bg-white hover:bg-gray-100">
//                                                   <span className="text-gray-800 text-xs font-medium">Add more items</span>
//                                                   <svg
//                                                       xmlns="http://www.w3.org/2000/svg"
//                                                       fill="none"
//                                                       viewBox="0 0 24 24"
//                                                       stroke="currentColor"
//                                                       strokeWidth={2}
//                                                       className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer"
//                                                   >
//                                                       <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
//                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
//                                                   </svg>
//                                               </div>
//                                           </a>
//                                       </div>
//                                   </div>
//                               ) : (
//                                   <>
//                                       <div className="flex justify-between items-center mb-4">
//                                           <h3 className="text-xl">Ongoing Orders</h3>
//                                           <button
//                                               className="flex items-center bg-red-900 text-white px-4 py-2 rounded-2xl shadow-lg"
//                                               onClick={handleCreateOrderClick}
//                                           >
//                                               <svg
//                                                   width="13"
//                                                   height="13"
//                                                   viewBox="0 0 13 13"
//                                                   fill="none"
//                                                   xmlns="http://www.w3.org/2000/svg"
//                                               >
//                                                   <path d="M6.52889 0V6.5M6.52889 13V6.5M6.52889 6.5H0H13" stroke="white" />
//                                               </svg>
//                                               <span className="ml-2">Create Order</span>
//                                           </button>
//                                       </div>
//                                       <div className="overflow-x-auto mb-4">
//                                           <table className="min-w-full bg-white">
//                                               <thead>
//                                                   <tr>
//                                                       <th className="px-4 py-2 border-b"></th>
//                                                       <th className="px-4 py-2 border-b">Restaurant</th>
//                                                       <th className="px-4 py-2 border-b">Order #</th>
//                                                       <th className="px-4 py-2 border-b">Total Items</th>
//                                                       <th className="px-4 py-2 border-b">Invoice Value</th>
//                                                       <th className="px-4 py-2 border-b"></th>
//                                                   </tr>
//                                               </thead>
//                                               <tbody>
//                                                   {Array.from({ length: 4 }).map((_, rowIndex) => (
//                                                       <tr key={rowIndex} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(rowIndex)}>
//                                                           <td className="px-4 py-2 border-b text-center">{rowIndex + 1}</td>
//                                                           <td className="px-4 py-2 border-b flex justify-center">
//                                                               <img
//                                                                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOFQwx2U_2AmJJN5O1Zje5XXQv4QnOp3lvg&usqp=CAU"
//                                                                   alt="Restaurant Logo"
//                                                                   className="rounded-full w-12 h-12 object-cover"
//                                                               />
//                                                           </td>
//                                                           <td className="px-4 py-2 border-b text-center">#{100 + rowIndex}</td>
//                                                           <td className="px-4 py-2 border-b text-center">{2 + rowIndex}</td>
//                                                           <td className="px-4 py-2 border-b text-center">INR 200.00</td>
//                                                           <td className="px-4 py-2 border-b text-center text-red-900 font-bold">View</td>
//                                                       </tr>
//                                                   ))}
//                                               </tbody>
//                                           </table>
//                                       </div>
//                                   </>
//                               )}
//                           </div>
//                       </div>
//                   </div>
//               </>
//           );
//       })
//   )
// }