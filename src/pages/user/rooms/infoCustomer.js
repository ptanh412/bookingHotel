import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoCheckmark } from "react-icons/io5";

const InfoCustomer = () => {
    const { id } = useParams();
    const [room, setRoom] = useState({});
    const [typeRoom, setTypeRoom] = useState([]);

    useEffect(() => {
        const getRoomById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room data:', error);
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
        if (id) {
            getTypeRoom();
            getRoomById();
        }
    }, [id]);
    return (
        <div className='max-w-7xl mx-auto mb-64'>
            <div className='grid grid-cols-12 gap-20'>
                <div className='col-span-6 mt-28 shadow-xl rounded-lg p-7 space-y-3'>
                    <h1 className='text-2xl font-bold'>Room Details - {room.name}</h1>
                    <img src={room.image} alt="" className='rounded-lg h-80 w-full' />
                    <div className='grid grid-cols-2 mt-5'>
                        <div className='space-y-1'>
                            <p className='font-bold'>Room Type</p>
                            <p className=''>{typeRoom.find(type => type.id === room.type_room_id)?.name}</p>
                        </div>
                        <div className='space-y-1'>
                            <p className='font-semibold'>Capacity</p>
                            <p>{room.capacity}</p>
                        </div>
                        <div className='space-y-1 mt-3'>
                            <p className='font-bold'>Room Size</p>
                            <p className=''>{room.acreage}</p>
                        </div>
                        <div className='space-y-1 mt-3'>
                            <p className='font-semibold'>Amount Bed</p>
                            <p>{room.amount_bed}</p>
                        </div>
                        <div className='space-y-1 mt-3'>
                            <p className='font-bold'>Amenities</p>
                            <div className='flex flex-col text-sm justify-between'>
                                {room.amenities_list ? (
                                    room.amenities_list.split(', ').map((amenity, index) => (
                                        <p key={index} className='flex items-center gap-2'>
                                            <IoCheckmark/>
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
                        <div className='space-y-1 mt-3'>
                            <p className='font-semibold'>Price</p>
                            <p>{room.price} $/night</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-6 mt-28 px-10 py-5 shadow-lg rounded-lg'>
                    <form action="" className='p-5 space-y-10 w-full'>
                        <h1 className='text-2xl font-bold'>Your Information</h1>
                        <div className='space-y-8 w-full'>
                            <div className='space-y-4'>
                                <p className='font-semibold'>Full Name</p>
                                <input className='rounded-md py-2 px-5 border-none w-[500px]'
                                    placeholder='Enter your full name'
                                />
                            </div>
                            <div className='space-y-4'>
                                <p className='font-semibold'>Phone Number</p>
                                <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                    placeholder='Enter your phone number'
                                />
                            </div>
                            <div className='space-y-4'>
                                <p className='font-semibold'>ID Card Number</p>
                                <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                    placeholder='Enter your ID card number'
                                />
                            </div>
                            <div className='space-y-4'>
                                <p className='font-semibold'>Gender</p>
                                <select className="rounded-md py-1 px-5 border-none w-[500px]">
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">Another</option>
                                </select>
                            </div>
                        </div>
                        <div classaNme='col-spna-2 mt-5 text-left'>
                            <Link to={`/paymentCustomer/${room.id}`} className='bg-black text-white px-[230px] py-2 text-lg w-full rounded-lg font-bold'>Next</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default InfoCustomer;