import React, { useState } from 'react';
import { FaBed, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaUsers, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Menu = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div>
            <aside className="flex-shrink-0 w-64 bg-gray-800 text-white p-4 h-full">
                <h1 className="text-2xl font-bold mb-8">Hotel Manager</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <button
                                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <FaChartBar className="mr-2" />
                                <Link to="/admin-home/dashboard">Dashboard</Link>
                            </button>
                        </li>
                        <li className="mb-4">
                            <div className="flex items-center" onClick={handleDropdown} >
                                <div className="flex items-center w-full relative p-2 rounded">
                                    <FaCalendarAlt className="mr-2 " />
                                    <button>Bookings</button>
                                </div>
                                <FaCaretDown className="text-2xl text-white cursor-pointer" />
                            </div>
                            {showDropdown && (
                                <div className="bg-gray-700 w-full text-white mt-2 rounded-lg shadow-lg p-2 flex items-start flex-col space-y-2">
                                    <button
                                        className={`w-48 text-left pl-3 py-2 hover:bg-gray-600 cursor-pointer rounded-lg ${activeTab === 'newBooked' ? 'bg-gray-600' : ''}`}
                                        onClick={() => setActiveTab('newBooked')}
                                    >
                                        <Link to="/admin-home/bookings/newBooked">New Booked</Link>
                                    </button>
                                    <button
                                        className={`w-48 text-left pl-3 py-2 hover:bg-gray-600 cursor-pointer rounded-lg ${activeTab === 'paymentConfirm' ? 'bg-gray-600' : ''}`}
                                        onClick={() => setActiveTab('paymentConfirm')}
                                    >
                                        <Link to="/admin-home/bookings/paymentConfirm">Payment Confirm</Link>
                                    </button>
                                    <button
                                        className={`w-48 text-left pl-3 py-2 hover:bg-gray-600 cursor-pointer rounded-lg ${activeTab === 'profileBookings' ? 'bg-gray-600' : ''}`}
                                        onClick={() => setActiveTab('profileBookings')}
                                    >
                                        <Link to="/admin-home/bookings/profileBookings">Profile Bookings</Link>
                                    </button>
                                </div>
                            )}
                        </li>
                        <li className="mb-4">
                            <button
                                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 ${activeTab === 'rooms' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveTab('rooms')}
                            >
                                <FaBed className="mr-2" />
                                <Link to="/admin/rooms">Rooms</Link>
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 ${activeTab === 'guests' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveTab('guests')}
                            >
                                <FaUsers className="mr-2" />
                                <Link to="/admin/guests">Guests</Link>
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-700 ${activeTab === 'reports' ? 'bg-gray-700' : ''}`}
                                onClick={() => setActiveTab('reports')}
                            >
                                <FaChartBar className="mr-2" />
                                <Link to="/admin/report">Report</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
                <button className="flex items-center w-full p-2 rounded-lg mt-auto hover:bg-gray-700">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </aside>
            {/* {renderTabContent()} */}
        </div>
    )
}
export default Menu;   