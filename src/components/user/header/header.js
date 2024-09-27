import { useContext } from "react";
import { AlertContext } from "../../../context/AlertMessage";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import '../../../../src/tailwind.css';
import { Link } from "react-router-dom";
const Header = () => {
    const { alertMessage, alertType } = useContext(AlertContext);
    return (
        <header className="fixed left-0 right-0 bg-white shadow-sm p-4 grid grid-cols-12 mx-auto px-10 items-center w-full ">
            {alertMessage && (
                <div className={`fixed top-0 mx-auto transform position ${alertType === 'success' ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"} py-3 rounded-lg mb-4 w-60 max-w-md text-center z-50 animate-slide-down`} role="alert">
                    <span className="text-center flex justify-center w-full items-center space-x-2">
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
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to = {'/about'}>Rooms</Link>
                        </li>
                        <li>
                            <Link to = {'/about'}>About</Link>
                        </li>
                        <li>
                            <Link to={'/contact'}>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="col-span-3 text-right">
                <button className="bg-black text-white py-2 px-4 rounded-lg font-semibold">Logout</button>
            </div>
        </header>
    )
}
export default Header;