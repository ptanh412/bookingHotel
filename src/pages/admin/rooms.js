import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    getRooms();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">List Room</h1>
      <div>
        <input
          type="text"
          placeholder="Search room..."
          className="w-full p-2 rounded-lg border border-gray-300 mb-4 outline-none"
        />
        <div className="flex justify-between my-5">
          <button className="bg-red-300 text-white px-5 py-2 rounded-lg text-lg font-bold hover:bg-red-400">Add Room</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white border">
              <th className="border border-gray-800 p-2">ID</th>
              <th className="border  border-gray-800 p-2">Name</th>
              <th className="border border-gray-800 p-2">Type Room</th>
              <th className="border border-gray-800 p-2">Price</th>
              <th className="border border-gray-800 p-2">Image</th>
              <th className="border  border-gray-800 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index} className="text-center">
                <td className="border p-1">{index + 1}</td>
                <td className="border">
                  <p className="p-2">{room.name}</p>
                </td>
                <td className="border p-1">
                  <p>{room.type_name}</p>
                </td>
                <td className="border p-1">
                  <p>${room.price}</p>
                </td>
                <td className="border p-1 flex justify-center">
                  <img src={room.image} alt={room.name} className="w-20 h-20 object-cover rounded-lg" />
                </td>
                <td className="border p-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded-lg mr-7 font-semibold" >Edit</button>
                  <button className="bg-red-500 text-white p-1 rounded-lg font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Rooms;