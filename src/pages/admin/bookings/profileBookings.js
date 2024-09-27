import { useState, useEffect } from "react";
import axios from "axios";
const ProfileBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
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
    const getPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payment');
        setPayments(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    getPayments();
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
              {/* <th className="border border-gray-800 p-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="text-center">
                <td className="border p-2">{booking.id}</td>
                <td className="border p-2">
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
                <td className="border p-2">
                  <div className="flex items-start flex-col">
                    {rooms.find(room => room.id === booking.room_id)?.name}
                    <div className="flex space-x-2">
                      <p className="font-semibold">Price:</p>
                      <p>${rooms.find(room => room.id === booking.room_id)?.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="font-semibold">Total:</p>
                      <p>${payments.find(payment => payment.booking_id = booking.id)?.amount}</p>
                    </div>
                  </div>
                </td>
                <td className="border p-2">{formatDate(booking.check_in_date)}</td>
                <td className="border p-2">{formatDate(booking.check_out_date)}</td>
                <td className="border">
                  <p className={`rounded-lg mx-auto px-5 w-1/2 font-semibold flex justify-center ${booking.status === 'completed' ? 'bg-green-500' :
                    booking.status === 'pending' ? 'bg-yellow-500' :
                      booking.status === 'confirmed' ? 'bg-blue-500' :
                        booking.status === 'cancelled' ? 'bg-red-500' : ''
                    }`}>
                    {booking.status}
                  </p>
                </td>
                {/* <td className="border p-2">
                  <button className="bg-blue-500 text-white p-2 rounded-lg mr-7">Edit</button>
                  <button className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfileBookings;