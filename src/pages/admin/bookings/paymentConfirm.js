import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PaymentConfirm = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsRes, usersRes, bookingsRes, roomsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/paymentPending'),
          axios.get('http://localhost:5000/api/users'),
          axios.get('http://localhost:5000/api/bookings'),
          axios.get('http://localhost:5000/api/rooms')
        ]);
        setPayments(paymentsRes.data);
        setUsers(usersRes.data);
        setBookings(bookingsRes.data);
        setRooms(roomsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleConfirm = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/${id}/confirmPayment`);
      if (response.status === 200) {
        alert('Booking confirmed');
      } else {
        alert('Failed to confirm booking');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('An error occurred while confirming the booking.');
    }
  }
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Confirm</h1>
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
            {payments.map((payment, index) => (
              <tr key={payment.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <div className="flex flex-col items-start">
                    <div className="flex space-x-2 bg-blue-500 text-white rounded-lg font-semibold px-2 text-sm">
                      <p>Oder ID: </p>
                      <p>{bookings.find(booking => booking.id === payment.booking_id)?.order_id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="font-semibold">Name:</p>
                      <p>{users.find(user => user.id === payment.user_id)?.fullName}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="font-semibold">Phone Number:</p>
                      <p> {users.find(user => user.id === payment.user_id)?.phoneNumber}</p>
                    </div>
                  </div>
                </td>
                {(() => {
                  const booking = bookings.find(booking => booking.id === payment.booking_id);
                  if (booking) {
                    return (
                      <>
                        <td className="border p-2">
                          <div className="flex items-start flex-col">
                            {rooms.find(room => room.id === booking.room_id)?.name}
                            <div className="flex space-x-2">
                              <p className="font-semibold">Price:</p>
                              <p>${rooms.find(room => room.id === booking.room_id)?.price}</p>
                            </div>
                            <div className="flex space-x-2">
                              <p className="font-semibold">Total:</p>
                              <p>${payment.amount}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border p-2">{formatDate(booking.check_in_date)}</td>
                        <td className="border p-2">{formatDate(booking.check_out_date)}</td>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <td className="border p-2">No booking found</td>
                        <td className="border p-2">No booking found</td>
                        <td className="border p-2">No booking found</td>
                      </>
                    );
                  }
                })()}
                <td className="border">
                  <p className={`rounded-lg mx-auto px-5 w-1/2 font-semibold flex justify-center ${payment.status === 'completed' ? 'bg-green-500' :
                    payment.status === 'pending' ? 'bg-yellow-500' : ''}`}>
                    {payment.status}
                  </p>
                </td>
                <td className="border p-2">
                  <button className="bg-green-500 text-white p-2 rounded-lg mr-7" onClick={() => handleConfirm(payment.id)}>Confirm</button>
                  <button className="bg-red-500 text-white p-2 rounded-lg">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};
export default PaymentConfirm;