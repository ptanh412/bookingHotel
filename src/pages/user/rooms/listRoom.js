import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ListRoom = () => {
    const [value, setValue] = useState(0);
    const [rooms, setRooms] = useState([]);
    const [typeRoom, setTypeRoom] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLogin(true);
        }
    }, []);
    const handleBooking = (id) => {
        if (isLogin) {
            navigate(`/bookingRoom/${id}`);
        } else {
            navigate('/login');
        }
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const getTypeRoom = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/typeRoom');
                setTypeRoom(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getTypeRoom();
        getRooms();
    }, []);
    return (
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-3 mt-40 shadow-lg p-5 rounded-lg h-fit">
                    <h1 className="mb-4 text-2xl font-bold">Search room</h1>
                    <form action="" className="p-5 bg-gray-300 rounded-lg space-y-5">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Check date</h2>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="">Check in</label>
                                <input type="date" className="px-2 py-1 rounded-md" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="">Check out</label>
                                <input type="date" className="px-2 py-1 rounded-md" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="">Type room</label>
                            <select name="" id="" className="px-2 py-1 rounded-md">
                                <option value="">Single</option>
                                <option value="">Double</option>
                                <option value="">Triple</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="">Amount</label>
                            <input type="text" class="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block mb-2 text-gray-700">Giá</label>
                            <div className="flex flex-col w-full mt-3">
                                <div className="flex justify-between w-full">
                                    <p className="text-gray-700">${value}</p>
                                    <p className="text-gray-700">$1000</p>
                                </div>
                                <input
                                    type="range"
                                    className="w-40 mx-4 h-2 rounded-lg appearance-none cursor-pointer"
                                    min="0"
                                    max="1000"
                                    value={value}
                                    onChange={handleChange}
                                    style={{
                                        background: `linear-gradient(to right, #000000 0%, #000000 ${(value / 1000) * 100}%, #e5e7eb ${(value / 1000) * 100}%, #e5e7eb 100%)`
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center w-full mt-20">
                            <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Search</button>
                        </div>
                    </form>
                </div>
                <div className="col-span-9 rounded-lg mt-40 space-y-10">
                    {rooms.map((room, index) => (
                        <div className='grid grid-cols-9 shadow-lg rounded-lg' key={index}>
                            <div className='col-span-3'>
                                <img src={room.image} alt="" className='rounded-l-lg h-full' />
                            </div>
                            <div className='col-span-6 flex flex-col p-5 space-y-3'>
                                <div className='flex flex-row justify-between'>
                                    <div className='space-y-3'>
                                        <div>
                                            <h1 className='text-3xl font-bold'>{room.name}</h1>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='font-semibold'>Type</p>
                                            <p className='bg-slate-200 rounded-lg px-5 ml-4 w-fit'>
                                                {typeRoom.find(type => type.id === room.type_room_id)?.name}
                                            </p>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='font-semibold'>Capacity</p>
                                            <p className='bg-slate-200 rounded-lg px-5 ml-4 w-fit'>{room.capacity}</p>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='font-semibold'>Amenities</p>
                                            <div className='flex space-x-4 text-sm justify-between'> {/* Sử dụng flex để căn chỉnh các thẻ p nằm ngang */}
                                                {room.amenities_list ? (
                                                    room.amenities_list.split(', ').map((amenity, index) => (
                                                        <p key={index} className='bg-slate-200 rounded-lg px-5 py-1 w-fit'>
                                                            {amenity}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <p className='bg-slate-200 rounded-lg px-5 w-fit'>
                                                        No amenities available
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col w-1/5 space-y-3 justify-center'>
                                        <button
                                            className='bg-black py-1 text-white rounded-lg font-semibold hover:opacity-70 transition-all duration-500 text-center'
                                            onClick={() => handleBooking(room.id)}
                                        >
                                            Book
                                        </button>
                                        <Link
                                            to={``}
                                            className='bg-red-400 py-1 text-white rounded-lg font-semibold hover:opacity-70 transition-all duration-500 text-center'
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                                <p className='bg-black font-semibold text-white px-10 rounded-lg ml-64 text-xl w-fit text-center'>${room.price}/day</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ListRoom;