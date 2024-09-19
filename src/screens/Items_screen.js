import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import SideMenu from '../components/SideMenu';
import NavBar from '../components/NavBar';

const ItemsScreen = () => {
    const [items, setItems] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        // Fetch items and brands from the API
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/items');
                const data = await response.json();
                setItems(data.items);
                setBrands([...new Set(data.items.map(item => item.brand_name))]);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const handleRowClick = (rowIndex) => {
        setSelectedRow(rowIndex);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBrandFilter = (event) => {
        setSelectedBrand(event.target.value);
    };

    const filteredItems = items.filter(item =>
        (selectedBrand === '' || item.brand_name === selectedBrand) &&
        (item.item_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    return (
        <div className="relative">
            <NavBar />
            <div className="flex h-full bg-gray-200">
                {/* Sidebar */}
                <SideMenu />
                {/* Main Content */}
                <div className="flex-grow p-10">
                    {/* Top Items in Action */}
                    <div className="mb-4">
                        <div className="bg-white p-6 rounded-3xl shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                 {/* Search Bar */}
                                 <div className="relative mr-4">
                                    <input 
                                        type="text" 
                                        placeholder="Search Items" 
                                        className="border-2 border-gray-300 rounded-lg px-4 py-2 w-80" 
                                        value={searchTerm}
                                        onChange={handleSearch}
                                    />
                                    {/* <FaPen className="absolute right-4 top-3 text-gray-400" /> */}
                                </div>

                                {/* Filter Button */}
                                <div className="relative">
                                    <button 
                                        className="flex items-center bg-gray-100 border-2 border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg"
                                        onClick={() => setFilterOpen(!filterOpen)}
                                    >
                                        <FaFilter className="mr-2" />
                                        Filter
                                    </button>
                                    {filterOpen && (
                                        <div 
                                            className="absolute top-full left-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-2"
                                        >
                                            <select 
                                                className="w-full"
                                                value={selectedBrand}
                                                onChange={handleBrandFilter}
                                            >
                                                <option value="">All Brands</option>
                                                {brands.map((brand, index) => (
                                                    <option key={index} value={brand}>{brand}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                                {/* <button className="bg-red-900 border-2 border-red-900 text-white px-4 py-2 rounded-lg shadow-lg">
                                    Create Order
                                </button>
                                <button className="px-10 py-2 border-2 border-red-900 text-black rounded-lg bg-transparent shadow-lg">
                                    Upload Items
                                </button> */}
                            </div>
                            <div className="border-b border-gray-300 mb-4"></div>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b">ID</th>
                                        <th className="px-4 py-2 border-b">Brand</th>
                                        <th className="px-4 py-2 border-b">Image</th>
                                        <th className="px-4 py-2 border-b">Name</th>
                                        <th className="px-4 py-2 border-b">Status</th>
                                        <th className="px-4 py-2 border-b">Price</th>
                                        <th className="px-4 py-2 border-b">Inventory</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                                            <td className="px-4 py-2 border-b text-center">{item.item_id}</td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <img src={item.brand_img} alt={item.brand_name} className="h-16 w-16 object-cover mx-auto" />
                                                <div>{item.brand_name}</div>
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <img src={item.image} alt={item.item_name} className="h-16 w-16 object-cover mx-auto" />
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">{item.item_name}</td>
                                            <td className="px-4 py-2 border-b text-center">
                                                <div className="px-2 py-1 bg-gray-200 rounded-xl inline-block">{item.active_slot}</div>
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">{item.base_price}</td>
                                            <td className="px-4 py-2 border-b text-center">{item.inventory}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsScreen;
