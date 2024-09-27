import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NewBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/newBooked');
        setBookings(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    const getRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
    getBookings();
    getRooms();
  }, [])
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0'); // Chuyển số thành chuỗi
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Chuyển số thành chuỗi
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const handleConfirm = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/${id}/confirmBooking`);
      if (response.status === 200) {
        alert('Booking confirmed');
        setTimeout(() => {
          navigate('/admin/bookings/profileBookings');
        }, 2000);
      } else {
        alert('Failed to confirm booking');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('An error occurred while confirming the booking.');
    }
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Newly Booked</h1>
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
              <th className="border  border-gray-800 p-2">Guest</th>
              <th className="border border-gray-800 p-2">Room</th>
              <th className="border border-gray-800 p-2">Check-in</th>
              <th className="border border-gray-800 p-2">Check-Out</th>
              <th className="border  border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border">
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2 bg-blue-500 text-white rounded-lg font-semibold px-2 text-sm">
                      <p>Oder ID: </p>
                      <p>{booking.order_id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="font-semibold">Name:</p>
                      <p>{users.find(user => user.id === booking.user_id)?.fullName}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="font-semibold">Phone Number:</p>
                      <p> {users.find(user => user.id === booking.user_id)?.phoneNumber}</p>
                    </div>

                  </div>
                </td>
                <td className="border p-2 flex justify-center items-center flex-col">
                  {rooms.find(room => room.id === booking.room_id)?.name}
                  <div className="flex space-x-2">
                    <p className="font-semibold">Price:</p>
                    <p>${rooms.find(room => room.id === booking.room_id)?.price}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="font-semibold">Total:</p>
                    <p>${booking.total_price}</p>
                  </div>
                </td>
                <td className="border p-2">{formatDate(booking.check_in_date)}</td>
                <td className="border p-2">{formatDate(booking.check_out_date)}</td>
                <td className="border p-2">
                  <button className="bg-green-500 text-white p-2 rounded-lg mr-7" onClick={() => handleConfirm(booking.id)}>Confirm</button>
                  <button className="bg-red-500 text-white p-2 rounded-lg">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default NewBooked;