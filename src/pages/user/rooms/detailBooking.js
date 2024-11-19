import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";

const DetailBooking = () => {
    const [booking, setBooking] = useState([]);
    const [room, setRoom] = useState({});
    const [typeRoom, setTypeRoom] = useState([]);
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get('bookingId');
    const isCancel = searchParams.get('isCancel');
    const [reasonOpen, setReasonOpen] = useState(false);
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/detailBooking?bookingId=${bookingId}`);
                setBooking(response.data);
            } catch (error) {
                console.log('error', error);
            }
        };

        const getTypeRoom = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/typeRoom');
                setTypeRoom(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getTypeRoom();
        fetchBooking();
    }, [bookingId]);

    useEffect(() => {
        if (booking.room_id) {
            const getRoomById = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/rooms/${booking.room_id}`);
                    setRoom(response.data);
                } catch (error) {
                    console.error('Error fetching room data:', error);
                }
            };

            getRoomById();
        }
    }, [booking]);
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
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
                                            <IoCheckmark />
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
                        <div className='space-y-5 w-full'>
                            <div className="flex justify-between">
                                <div className='space-y-1'>
                                    <p className='font-semibold'>Full Name</p>
                                    <input className='rounded-md py-2 px-5 border-none w-full'
                                        placeholder='Enter your full name'
                                        value={booking.fullName}
                                        readOnly
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <p className='font-semibold'>Phone Number</p>
                                    <input className='rounded-md py-2 px-5 w-full border-none'
                                        placeholder='Enter your phone number'
                                        value={booking.phone}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold'>ID Card Number</p>
                                <input className='rounded-md py-2 px-5 w-full border-none'
                                    placeholder='Enter your ID card number'
                                    value={booking.idCard}
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className='space-y-1 mt-3'>
                                    <p className='font-semibold'>Check-In</p>
                                    <input className='rounded-md py-2 px-5 w-[220px]'
                                        value={formatDate(booking.check_in)}
                                    />
                                </div>
                                <div className='space-y-1 mt-3'>
                                    <p className='font-semibold'>Check-Out</p>
                                    <input className='rounded-md py-2 px-5 w-[220px]'
                                        value={formatDate(booking.check_out)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className='space-y-1'>
                                    <p className='font-semibold'>Mehthod</p>
                                    <input className='rounded-md py-2 px-5 border-none w-full'
                                        placeholder='Please continue the booking'
                                        value={booking.method}
                                        readOnly
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <p className='font-semibold'>Form</p>
                                    <input className='rounded-md py-2 px-5 w-full border-none'
                                        placeholder='Please continue the booking'
                                        value={booking.form}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold'>Amount Paid</p>
                                <input className='rounded-md py-2 px-5 border-none w-full'
                                    placeholder='Please continue the booking'
                                    value={'$' + booking.amount_paid}
                                    readOnly
                                />
                            </div>
                        </div>
                        {isCancel ? (
                            <div className='space-y-3'>
                                <p className='font-semibold text-3xl'>Reason Cancel</p>
                                <select
                                    className="rounded-full py-2 px-5 outline-none w-full font-bold text-center bg-gray-200"
                                    onBlur={() => setReasonOpen(false)}
                                    onFocus={() => setReasonOpen(true)}
                                // value={booking.cancelReason || ''}
                                // onChange={handleReasonChange}
                                >
                                    <option value="" hidden={reasonOpen}>Select cancel reason</option>
                                    <option value="Personal reasons">Personal reasons</option>
                                    <option value="Booking error">Booking error</option>
                                    <option value="Change of plans">Change of plans</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                <p className='font-semibold text-3xl'>Status</p>
                                <p className={`rounded-full py-2 px-5 border-none w-full font-bold text-center ${booking.status == 'completed' ? 'bg-green-500' : booking.status === 'pending' ? 'bg-yellow-500' : booking.status === 'cancelled' ? 'bg-red-500' : ''}`}>
                                    {booking.status}
                                </p>
                            </div>
                        )}
                        <div className='col-span-2 mt-5'>
                            {booking.status === 'pending' ? (
                                <div className="flex justify-between">
                                    <Link
                                        type="button"
                                        className="bg-black text-white px-4 py-2 rounded-lg font-bold"
                                        to={`/paymentCustomer?roomId=${booking.room_id}&bookingId=${booking.id}&customerId=${booking.customer_id}`}
                                    >
                                        Continue the booking
                                    </Link>
                                    <Link
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold"
                                        to={`/historyBooking?userId=${booking.user_id}`}
                                    >
                                        Back to history booked
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    type="button"
                                    className="bg-black text-white py-2 text-lg w-full block rounded-lg font-bold text-center"
                                    to={`/historyBooking?userId=${booking.user_id}`}
                                >
                                    {isCancel ? 'Confirm cancel booked' : 'Back to history booked'}
                                </Link>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
export default DetailBooking;