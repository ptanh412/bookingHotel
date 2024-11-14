import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertMessage';
const BookingRoom = () => {
    const { showAlert } = useContext(AlertContext);
    const [room, setRoom] = useState({});
    const [user, setUser] = useState({});
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [typeRoom, setTypeRoom] = useState([]);
    const [guest, setGuest] = useState(1);
    const [service, setService] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const id = window.location.pathname.split('/').pop();

        const getRoomById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        const getUser = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData) setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
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

        getRoomById();
        getUser();
        getTypeRoom();
    }, []);

    const calculateTotalPrice = async (checkIn, checkOut, service) => {
        if (!checkIn || !checkOut || !service.length) return;
    
        try {
            const response = await axios.post("http://localhost:5000/api/calculateTotalPrice", {
                checkIn,
                checkOut,
                room_id: room.id,
                user_id: user.id,
                selectedServices: service,
            });
            
            setTotalPrice(response.data.totalPrice);
        } catch (error) {
            console.error("Error calculating total price:", error);
        }
    };
    

    // Gọi hàm tính toán mỗi khi check-in, check-out hoặc dịch vụ được chọn thay đổi
    useEffect(() => {
        calculateTotalPrice(checkIn, checkOut, service);
    }, [checkIn, checkOut, service]);
    

    const handleSubmit = async () => {
        if (!checkIn || !checkOut) {
            showAlert("Please select check-in and check-out dates.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/checkRoomAvailability`, {
                params: {
                    room_id: room.id,
                    checkIn,
                    checkOut,
                },
            });

            if (response.data.hasBooking) {
                showAlert('This room is already booked for the selected dates.', 'error');
                return; // Dừng lại nếu đã có đơn đặt phòng
            }
        } catch (error) {
            console.error('Error checking existing bookings:', error);
            showAlert('This room is already booked for the selected dates. Please try again.', 'error');
            return;
        }
        const data = {
            user_id: user.id,
            room_id: room.id,
            checkIn,
            checkOut,
            guest_count: guest,
            totalPrice,
            service_id: service
        };
        try {
            const response = await axios.post('http://localhost:5000/api/createBooking', data);
            const bookingId = response.data.bookingId;
            if (service) {
                await axios.post('http://localhost:5000/api/createBookingService', {
                    booking_id: bookingId,
                    service_id: service
                });
            }
            showAlert("Booking successful!", 'success');
            navigate(`/booking/infoCustomer?roomId=${room.id}&bookingId=${bookingId}`);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };
    const handleAmountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > room.capacity) {
            showAlert(`The maximum number of guests is ${room.capacity}`, 'error');
            setGuest(room.capacity);
        } else {
            setGuest(value);
        }
    }
    const handleCheckInChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Đặt giờ phút giây của ngày hiện tại về 0 để so sánh chính xác
    
        if (selectedDate >= currentDate) {
            setCheckIn(e.target.value);
            
            // Nếu đã có ngày check-out mà ngày check-in thay đổi, kiểm tra tính hợp lệ
            if (checkOut && new Date(checkOut) <= selectedDate) {
                setCheckOut(""); // Xóa ngày check-out nếu nó không còn hợp lệ
                showAlert('Check-out date must be greater than check-in date', 'warning');
            }
        } else {
            showAlert('Check-in date must be greater than or equal to the current date', 'error');
        }
    };
    
    const handleCheckOutChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const checkInDate = new Date(checkIn);
    
        if (!checkIn) {
            showAlert('Please select a check-in date first', 'error');
            return;
        }
    
        if (selectedDate > checkInDate) {
            setCheckOut(e.target.value);
        } else {
            showAlert('Check-out date must be greater than check-in date', 'error');
        }
    };
    
    const handleServiceChange = (e) => {
        const selectedService = e.target.value;
        setService([selectedService]); // Đảm bảo `service` là một mảng ngay cả khi chỉ có một phần tử
    
        // Gọi lại calculateTotalPrice với mảng `service`
        calculateTotalPrice(checkIn, checkOut, [selectedService]);
    };
    return (
        <div className='max-w-7xl mx-auto mb-64'>
            <div className='grid grid-cols-12 gap-20'>
                <div className='col-span-6 mt-40 shadow-xl rounded-lg'>
                    <img src={room.image} alt="" className='rounded-lg h-full' />
                </div>
                <div className='col-span-6 mt-40 p-5 shadow-lg rounded-lg'>
                    <form className='p-5'>
                        <h1 className='text-2xl font-bold'>Book Details</h1>
                        <div className='grid grid-cols-2 mt-10'>
                            <div className='space-y-1'>
                                <p className='font-semibold'>Room Name</p>
                                <input className='rounded-md py-1 px-5 border-none' value={room.name} readOnly />
                            </div>
                            <div className='space-y-1'>
                                <p className='font-semibold'>Type</p>
                                <input className='rounded-md py-1 px-5 w-fit border-none'
                                    value={typeRoom.find(type => type.id === room.type_room_id)?.name}
                                    readOnly
                                />
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Capacity</p>
                                <input className='rounded-md py-1 px-5 w-fit border-none' value={room.capacity} readOnly />
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Acreage</p>
                                <input className='rounded-md py-1 px-5 w-fit border-none' value={room.acreage} readOnly />
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Beds</p>
                                <input className='rounded-md py-1 px-5 w-fit border-none' value={room.amount_bed} readOnly />
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Service</p>
                                <select
                                    className="rounded-md py-1 px-5 border-none w-[220px]"
                                    value={service}
                                    onChange={handleServiceChange}
                                >
                                    <option value="">Select service</option>
                                    <option value="1">Room Cleaning</option>
                                    <option value="2">Spa</option>
                                    <option value="3">Airport Pickup</option>
                                </select>
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Check-In</p>
                                <input className='rounded-md py-1 px-5 w-[220px]'
                                    type='date'
                                    value={checkIn}
                                    onChange={handleCheckInChange}
                                />
                            </div>
                            <div className='space-y-1 mt-3'>
                                <p className='font-semibold'>Check-Out</p>
                                <input className='rounded-md py-1 px-5 w-[220px]'
                                    type='date'
                                    value={checkOut}
                                    onChange={handleCheckOutChange}
                                />
                            </div>
                            <div className='col-span-2 mt-3'>
                                <p className='font-semibold'>Amount</p>
                                <input className='rounded-md py-1 px-2 w-[480px]' type='number' min='1' value={guest} onChange={handleAmountChange} />
                            </div>
                            <div className='col-span-2 my-5'>
                                <p className='font-semibold'>Total Price: ${totalPrice}</p>
                            </div>
                            <div className='col-span-2 text-left'>
                                <button type="button" className='bg-black text-white px-[220px] py-2 text-lg w-full rounded-lg font-bold' onClick={handleSubmit}>
                                    Book
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookingRoom;
