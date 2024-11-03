import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertMessage';
import { useContext } from 'react';

const InfoCustomer = () => {
    const { showAlert } = useContext(AlertContext);
    const [user, setUser] = useState({});
    const [room, setRoom] = useState({});
    const [typeRoom, setTypeRoom] = useState([]);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [idCard, setIdCard] = useState('');
    const [sex, setSex] = useState('');
    const [isPrimary, setIsPrimary] = useState(true);
    const [existCustomer, setExistCustomer] = useState([]);
    const [tab, setTab] = useState(0);
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    const bookingId = searchParams.get('bookingId');
    const navigate = useNavigate();
    const getExistCustomer = async (userId) => {
        if (!userId) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/customerByPrimary`, {
                params: {
                    userId: userId,
                    is_primary: 1
                }
            });
            if (response.data) {
                setExistCustomer(response.data);
                setFullName(response.data.fullName || '');
                setPhone(response.data.phoneNumber || '');
                setIdCard(response.data.idCard || '');
                setSex(response.data.sex || '');
            }
            console.log("Existing customer data:", response.data);
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                console.error('Error fetching customer data:', error);
            }
        }

    };
    useEffect(() => {
        const getRoomById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
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
        const getUser = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                if (userData && userData.id) {
                    setUser(userData);
                    await getExistCustomer(userData.id);
                }
            } catch (error) {
                console.error('Error initializing user data:', error);
            }
        };
        if (roomId, bookingId) {
            getTypeRoom();
            getRoomById();
        }
        getUser();
    }, [roomId, bookingId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.id) {
            showAlert("User information not found. Please log in again.", "error");
            return;
        }

        if (!sex) {
            showAlert("Please select a gender.", "error");
            return;
        }

        const data = {
            user_id: user.id,
            fullName,
            phone,
            idCard,
            sex,
            is_primary: isPrimary ? 1 : 0, // Sử dụng isPrimary để xác định giá trị
            bookingId,
            ...(tab === 0 && existCustomer?.id ? { existingCustomerId: existCustomer.id } : {})
        };

        console.log("Submitting data:", data.existingCustomerId ? { ...data, existingCustomerId: data.existingCustomerId } : data);

        try {
            const response = await axios.post('http://localhost:5000/api/createOrUpdateCustomer', data);
            const customerId = response.data.customerId;
            console.log("Customer created successfully:", customerId);
            showAlert(response.data.message, 'success');
            navigate(`/paymentCustomer?roomId=${roomId}&bookingId=${bookingId}&customerId=${customerId}`);
        } catch (error) {
            console.error('Error processing customer:', error);
            console.error('Error response:', error.response); // Log error response for debugging
            const errorMessage = error.response?.data?.message || "Error processing customer information";
            showAlert(errorMessage, "error");
        }
    };


    const handleTab = (index) => {
        setTab(index);
        if (index === 0) {
            setIsPrimary(true);
            if (existCustomer) {
                setFullName(existCustomer.fullName || '');
                setPhone(existCustomer.phone || '');
                setIdCard(existCustomer.idCard || '');
                setSex(existCustomer.sex || '');
            }
        } else {
            setIsPrimary(false);
            setFullName('');
            setPhone('');
            setIdCard('');
            setSex('');
        }
    };
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
                    <div className="grid grid-cols-2 text-lg w-full bg-gray-300 rounded-lg font-semibold">
                        <button
                            className={`${tab === 0 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'
                                } rounded-l-lg py-2`}
                            onClick={() => handleTab(0)}
                        >
                            Your Information
                        </button>
                        <button
                            className={`${tab === 1 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'
                                } rounded-r-lg py-2`}
                            onClick={() => handleTab(1)}
                        >
                            Book For Somone Else
                        </button>
                    </div>
                    {tab === 0 ?
                        <form action="" className='p-5 space-y-10 w-full'>
                            <div className='space-y-8 w-full'>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Full Name</p>
                                    <input className='rounded-md py-2 px-5 border-none w-[500px]'
                                        placeholder='Enter your full name'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={!!existCustomer}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Phone Number</p>
                                    <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                        placeholder='Enter your phone number'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={!!existCustomer}

                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>ID Card Number</p>
                                    <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                        placeholder='Enter your ID card number'
                                        value={idCard}
                                        onChange={(e) => setIdCard(e.target.value)}
                                        disabled={!!existCustomer}

                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Gender</p>
                                    <select className="rounded-md py-1 px-5 border-none w-[500px]"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        disabled={!!existCustomer}

                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Another">Another</option>
                                    </select>
                                </div>
                            </div>
                            <div classaNme='col-spna-2 mt-5 text-left'>
                                <button type="button" className='bg-black text-white px-[220px] py-2 text-lg w-full rounded-lg font-bold' onClick={handleSubmit}>
                                    Next
                                </button>
                            </div>
                        </form>
                        :
                        <form action="" className='p-5 space-y-10 w-full'>
                            <div className='space-y-8 w-full'>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Full Name</p>
                                    <input className='rounded-md py-2 px-5 border-none w-[500px]'
                                        placeholder='Enter your full name'
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Phone Number</p>
                                    <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                        placeholder='Enter your phone number'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>ID Card Number</p>
                                    <input className='rounded-md py-2 px-5 w-[500px] border-none'
                                        placeholder='Enter your ID card number'
                                        value={idCard}
                                        onChange={(e) => setIdCard(e.target.value)}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='font-semibold'>Gender</p>
                                    <select className="rounded-md py-1 px-5 border-none w-[500px]"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Another">Another</option>
                                    </select>
                                </div>
                            </div>
                            <div classaNme='col-spna-2 mt-5 text-left'>
                                <button type="button" className='bg-black text-white px-[220px] py-2 text-lg w-full rounded-lg font-bold' onClick={handleSubmit}>
                                    Next
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
};
export default InfoCustomer;