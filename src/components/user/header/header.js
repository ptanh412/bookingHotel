import { useContext } from "react";
import { AlertContext } from "../../../context/AlertMessage";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import '../../../../src/tailwind.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTER } from "../../../utils/router";
import { FaRegUser, FaHistory } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMdLogOut } from "react-icons/io";
const Header = () => {
    const { alertMessage, alertType } = useContext(AlertContext);
    const [isLogin, setIsLogin] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLogin(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate(ROUTER.LOGIN);
        setIsLogin(false);
    };
    const handleDropdown = () => {
        setDropdown(!dropdown);
    };
    return (
        <header className="fixed left-0 right-0 bg-white shadow-sm p-4 grid grid-cols-12 mx-auto px-10 items-center w-full ">
            {alertMessage && (
                <div className={`fixed top-0 mx-auto transform left-[700px] ${alertType === 'success' ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"} rounded-lg mb-4 w-60 max-w-md text-center z-50 animate-slide-down`} role="alert">
                    <span className="text-center flex justify-center w-full items-center space-x-1 px-5">
                        {alertType === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                        <p className="text-sm">{alertMessage}</p>
                    </span>
                </div>
            )}
            <div className="col-span-3">
                <h2 className="text-2xl font-semibold">Luxury Hotel</h2>
            </div>
            <div className="col-span-6">
                <nav>
                    <ul className="flex justify-between text-lg font-semibold">
                        <li>
                            <Link to={ROUTER.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link to={ROUTER.LISTROOM}>Rooms</Link>
                        </li>
                        <li>
                            <Link to={ROUTER.ABOUT}>About</Link>
                        </li>
                        <li>
                            <Link to={ROUTER.CONTACT}>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-span-3 text-right">
                {isLogin ? (
                    <div className="relavtive">
                        <button onClick={handleDropdown} className="bg-orange-100 rounded-full p-2 hover:bg-orange-200 mr-44 relative">
                            <FaRegUser />
                        </button>
                        {dropdown && (
                            <ul className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg z-20 cursor-pointer right-16">
                                <li className="py-2 px-2 hover:bg-gray-200 flex space-x-2">
                                    <LiaUserEditSolid className="mt-1" />
                                    <Link>Edit Profile</Link>
                                </li>
                                <li className="py-2 px-2 hover:bg-gray-200 flex space-x-2">
                                    <FaHistory className="mt-1" />
                                    <Link to={`/historyBooking?userId=${user.id}`}>History Booked</Link>
                                </li>
                                <li onClick={handleLogout} className="py-2 px-2 flex space-x-2 hover:bg-gray-200 hover:rounded-b-lg">
                                    <IoMdLogOut className="mt-1" />
                                    <p>
                                        Logout
                                    </p>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to={ROUTER.LOGIN} className="bg-black text-xl px-5 py-2 rounded-lg font-semibold text-white hover:bg-red-300 transition-colors duration-300">
                        Login
                    </Link>
                )}
            </div>
        </header>
    )
}
export default Header;