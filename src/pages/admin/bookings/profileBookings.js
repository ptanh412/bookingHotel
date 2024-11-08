import { useState, useEffect } from "react";
import axios from "axios";
const ProfileBookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getBookings();

  }, [])
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Bookings</h1>
      <div>
        <input
          type="text"
          placeholder="Search bookings..."
          className="w-full p-2 rounded-lg border border-gray-300 mb-4 outline-none"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white border">
              <th className="border border-gray-800 p-2">ID</th>
              <th className="border border-gray-800 p-2">Guest</th>
              <th className="border border-gray-800 p-2">Room</th>
              <th className="border border-gray-800 p-2">Check-in</th>
              <th className="border border-gray-800 p-2">Check-Out</th>
              <th className="border border-gray-800 p-2">Status</th>
              <th className="border border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="text-center">
                <td className="border p-2">{booking.id}</td>
                <td className="border p-2">
                  <p>{booking.fullName}</p>
                </td>
                <td className="border p-2">
                  <p>{booking.roomName}</p>
                </td>
                <td className="border p-2">{formatDate(booking.check_in)}</td>
                <td className="border p-2">{formatDate(booking.check_out)}</td>
                <td className="border">
                  <p className={`rounded-lg mx-auto px-5 w-1/2 font-semibold flex justify-center ${booking.status === 'completed' ? 'bg-green-500' :
                    booking.status === 'pending' ? 'bg-yellow-500' :
                      booking.status === 'cancelled' ? 'bg-red-500' : ''
                    }`}>
                    {booking.status?.toUpperCase()}
                  </p>
                </td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white p-2 rounded-lg mr-7 font-semibold">Update</button>
                  <button className="bg-red-500 text-white p-2 rounded-lg font-semibold">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfileBookings;