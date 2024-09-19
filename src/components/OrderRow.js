// OrderRow Component
const OrderRow = ({ order, index, handleRowClick }) => (
    <>
        {order.brands.map((brand, idx) => (
            <tr
                key={idx}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(order.order_id, brand.brand_id)}
            >
                {/* Index and Brand Image */}
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b flex items-center space-x-2">
                    <img
                        src={brand.brand_image}
                        alt={`Brand ${brand.brand_name}`}
                        className="h-10 w-10 object-cover rounded-full"
                    />
                    <span className="font-semibold">{brand.brand_name}</span>
                </td>

                {/* Order ID */}
                <td className="px-4 py-2 border-b text-center">{order.order_id}</td>

                {/* Total Items for this Brand */}
                <td className="px-4 py-2 border-b text-center">{brand.total_items}</td>

                {/* Total Invoice for this Brand */}
                <td className="px-4 py-2 border-b text-center">
                    INR {brand.total_invoice ? brand.total_invoice.toFixed(2) : '0.00'}
                </td>

                {/* Arrow Icon for Navigation */}
                <td className="px-4 py-2 border-b text-center cursor-pointer">
                    <svg
                        width="39"
                        height="20"
                        viewBox="0 0 39 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M23.5455 1L37 10M37 10L23.5455 19M37 10H0" stroke="black" strokeWidth="2" />
                    </svg>
                </td>
            </tr>
        ))}
    </>
);
export default OrderRow;