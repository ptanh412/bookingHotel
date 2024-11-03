import axios from "axios";
import { useEffect, useState, useContext} from "react";
import { FaStar } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../context/AlertMessage";


const PaymentCutomer = () => {
    const { showAlert } = useContext(AlertContext);
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    const bookingId = searchParams.get('bookingId');
    const [room, setRoom] = useState({});
    const [booking, setBooking] = useState({});
    const [typeRoom, setTypeRoom] = useState([]);
    const [form, setForm] = useState('');
    const [amountPaid, setAmountPaid] = useState(room.price);
    const navigate = useNavigate();
    useEffect(() => {
        const getNewBooked = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/newBooked?roomId=${roomId}&bookingId=${bookingId}`);
                console.log(response.data);
                setBooking(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
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
        if (roomId && bookingId) {
            getNewBooked();
            getTypeRoom();
            getRoomById();
        }
    }, [roomId, bookingId]);
    useEffect(() => {
        if (room.price && booking.total_amount) {
            if (form === '1_night') {
                setAmountPaid(room.price);
            } else {
                setAmountPaid(booking.total_amount);
            }
        }
    }, [form, room.price, booking.total_amount]);
    
    const [tab, setTab] = useState('paypal');
    const handleTab = (choose) => {
        if (choose === 'paypal') {
            setTab(choose);
        } else {
            setTab(choose);
        }
    }
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/createPayment', {
                booking_id: bookingId,
                payment_method: tab,
                amount_paid: amountPaid,
                form
            });
            showAlert('Payment successful', 'success');
            navigate(`/historyBooking?userId=${booking.user_id}`)
            console.log(response.data);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    }
    return (
        <div className="max-w-6xl mx-auto select-none">
            <div className="grid grid-cols-9 gap-14">
                <div className="col-span-6 border-2 py-10 px-20 rounded-lg mt-32">
                    <div className="border-b-2">
                        <h1 className="font-bold text-4xl mb-3">Confirm and payment</h1>
                    </div>
                    <div>
                        <div className="">
                            <h1 className="font-semibold text-2xl my-3 select-none">What form do you want to pay?</h1>
                            <select value={form} onChange={(e) => setForm(e.target.value)} className="w-full p-2 rounded-xl">
                                <option>Select form</option>
                                <option value="1_night">One night</option>
                                <option value="payfull">Pay full</option>
                            </select>
                        </div>
                        <div className="border-b-2 w-[100px]">
                            <h1 className="font-semibold text-2xl my-3 select-none">Pay with</h1>
                        </div>
                        <div className="flex space-x-3 my-3">
                            <button
                                className={`rounded-full py-1 px-7 font-semibold select-none ${tab === 'paypal' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                                onClick={() => handleTab('paypal')}
                            >
                                Paypal
                            </button>
                            <button
                                className={`rounded-full py-1 px-7 font-semibold select-none flex justify-between w-44 items-center ${tab === 'credit_card' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                                onClick={() => handleTab('credit_card')}
                            >
                                <span>Credit card</span>
                                <RiVisaLine className="text-3xl text-blue-950" />
                            </button>
                        </div>
                    </div>
                    {tab === 'paypal' ? (
                        <form action="">
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Card number</label>
                                <div className=" rounded-lg">
                                    <input type="text" placeholder="Enter your card number..." className="outline-none border-2 w-full select-none px-5 py-1 rounded-lg" />
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Card holder</label>
                                <div className=" rounded-lg">
                                    <input type="text" placeholder="Enter name..." className="outline-none w-full select-none px-5 py-1 rounded-lg border-2" />
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex flex-col">
                                    <label htmlFor="" className="font-semibold mb-3 select-none">Expiration date</label>
                                    <div className=" rounded-lg">
                                        <input type="date" placeholder="" className=" w-48 outline-none select-none px-5 py-1 rounded-lg border-2" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className="font-semibold mb-3 select-none">CVC</label>
                                    <div className=" rounded-lg">
                                        <input type="text" className=" w-48 outline-none select-none px-5 py-1 rounded-lg border-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Message for author</label>
                                <div className="rounded-lg">
                                    <textarea name="" id="" placeholder="...." className="outline-none w-full px-5 py-1 rounded-lg select-none border-2"></textarea>
                                </div>
                                <p className="text-gray-400 my-2 select-none">Write a few sentences about yourself</p>
                            </div>
                        </form>
                    ) :(
                        <form action="">
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Email</label>
                                <div className="rounded-lg">
                                    <input type="email" placeholder="Enter your email..." className="outline-none w-full select-none py-1 px-5 rounded-lg border-2" />
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Password</label>
                                <div className="rounded-lg">
                                    <input type="password" placeholder="Enter your password..." className="outline-none w-full  select-none py-1 px-5 rounded-lg border-2" />
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <label htmlFor="" className="font-semibold mb-2 select-none">Message for author</label>
                                <div className="">
                                    <textarea name="" id="" placeholder="...." className="outline-none w-full select-none py-1 px-5 rounded-lg border-2"></textarea>
                                </div>
                                <p className="text-gray-400 my-2 select-none">Write a few sentences about yourself</p>
                            </div>
                        </form>
                    )}
                    <button className="bg-black rounded-full px-5 py-2 text-white font-bold hover:bg-indigo-950 transition-colors duration-700 mt-5" onClick={handleSubmit}>Confirm and pay</button>
                </div>
                <div className="col-span-3 border-2 rounded-lg px-5 py-3 mt-32 space-y-5 h-[500px]">
                    <div className="flex">
                        <img src={room.image} alt="" className="rounded-xl w-1/2 h-40" />
                        <div className="ml-3">
                            <h1 className="font-semibold text-base my-3">Room Name</h1>
                            <div className="border-b-2 w-1/2">{room.name}</div>
                            <div className="flex items-center space-x-2">
                                <FaStar className="text-yellow-300" />
                                <p className="font-semibold">4.5</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h1 className="font-semibold text-xl mb-3">Detail</h1>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <p className="text-gray-500">Number of People</p>
                                <p className="font-semibold text-gray-500">{booking.guest_count}person</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500">Check In</p>
                                <p className="font-semibold text-gray-500">{new Date(booking.check_in).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500">Check Out</p>
                                <p className="font-semibold text-gray-500">{new Date(booking.check_out).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-b-2 my-2"></div>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">Total</p>
                        <p className="font-semibold">${booking.total_amount}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Amount Payable</p>
                        <p className="font-semibold">${amountPaid}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default PaymentCutomer;