import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

const PaymentCutomer = () => {
    const { id } = useParams();
    console.log(id);
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
    const [tab, setTab] = useState('paypal');
    const handleTab = (choose) => {
        if (choose === 'paypal') {
            setTab(choose);
        } else {
            setTab(choose);
        }
    }
    const [showDateForm, setShowDateForm] = useState(false);
    const [showGuestsForm, setShowGuestsForm] = useState(false);

    const handleDateClick = () => {
        setShowDateForm(!showDateForm); 
    };

    const handleGuestsClick = () => {
        setShowGuestsForm(!showGuestsForm); 
    };
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [totalGuests, setTotalGuests] = useState(0);

    const handleDecrement = (setFunction, value) => {
        if (value > 0) {
            setFunction(value - 1);
        }
    };

    const handleIncrement = (setFunction, value) => {
        setFunction(value + 1);
    };

    const saveGuests = () => {
        setTotalGuests(adults + children + infants);
        setShowGuestsForm(false);
    };
    return (
        <div className="max-w-6xl mx-auto select-none">
            <div className="grid grid-cols-9 gap-14">
                <div className="col-span-6 border-2 py-10 px-20 rounded-lg mt-32">
                    <div className="border-b-2">
                        <h1 className="font-bold text-4xl mb-3">Confirm and payment</h1>
                    </div>
                    <div>
                        <div className="border-b-2 w-1/6">
                            <h1 className="font-semibold text-xl my-3 select-none">Pay with</h1>
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
                                className={`rounded-full py-1 px-7 font-semibold select-none flex justify-between w-44 items-center ${tab === 'credit' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                                onClick={() => handleTab('credit')}
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
                    ) : (
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
                    <button className="bg-black rounded-full px-5 py-2 text-white font-bold hover:bg-indigo-950 transition-colors duration-700 mt-5">Confirm and pay</button>
                </div>
                <div className="col-span-3 border-2 rounded-lg h-1/2 px-5 py-3 mt-32">
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
                        <div className="flex justify-between mb-2">
                            <p className="text-gray-500">Number of People</p>
                            <p className="font-semibold text-gray-500">Day</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Date</p>
                            <p className="font-semibold text-gray-500">Day</p>
                        </div>
                    </div>
                    <div className="border-b-2 my-2"></div>
                    <div className="flex justify-between items-center">
                        <p className="text-base font-semibold">Total</p>
                        <p className="font-semibold">$...</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">Amount payable</p>
                        <p className="font-semibold">$...</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default PaymentCutomer;