import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const HistoryBooking = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const [bookings, setBookings] = useState([]);
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bookings/${userId}`);
                setBookings(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getBookings();
    }, []);
    return (
        <div className="p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-10 mt-24">History Bookings</h1>
                <div className="">
                    <table className="w-full">
                        <thead className="">
                            <tr className="bg-gray-800 text-white border">
                                <th className="border border-gray-800 p-2">ID</th>
                                <th className="border border-gray-800 p-2">Guest Check in</th>
                                <th className="border border-gray-800 p-2">Room</th>
                                <th className="border border-gray-800 p-2">Check-in</th>
                                <th className="border border-gray-800 p-2">Check-Out</th>
                                <th className="border border-gray-800 p-2">Status</th>
                                <th className="border border-gray-800 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border">
                                    <td className="border border-gray-800 p-2">{booking.id}</td>
                                    <td className="border border-gray-800 p-2">{booking.fullName}</td>
                                    <td className="border border-gray-800 p-2">{booking.roomName}</td>
                                    <td className="border border-gray-800 p-2">{formatDate(booking.check_in)}</td>
                                    <td className="border border-gray-800 p-2">{formatDate(booking.check_out)}</td>
                                    <td className="border border-gray-800">
                                        <p className={`px-5 mx-auto w-1/2 font-semibold rounded-lg flex justify-center ${booking.status === 'completed' ? 'bg-green-500' :
                                            booking.status === 'pending' ? 'bg-yellow-500' : booking.status === 'cancelled' ? 'bg-red-500':''}`}>{booking.status}</p>
                                    </td>
                                    <td className="border border-gray-800 p-2">
                                        <div className="flex justify-center gap-2">
                                            <Link to={`/detailBooking?bookingId=${booking.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Detail</Link>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Cancel</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default HistoryBooking;