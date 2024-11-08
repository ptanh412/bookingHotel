import { useContext } from "react";
import { AlertContext } from "../../../context/AlertMessage";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import '../../../../src/tailwind.css';
const Header = () => {
    const { alertMessage, alertType } = useContext(AlertContext);
    return (
        <header className="bg-white shadow p-4">
            {alertMessage && (
                <div className={`fixed top-0 mx-auto transform left-[700px] py-1 ${alertType === 'success' ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"} rounded-lg mb-4 w-60 max-w-md text-center z-50 animate-slide-down`} role="alert">
                    <span className="text-center flex justify-center w-full items-center space-x-1 px-5">
                        {alertType === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                        <p className="text-sm">{alertMessage}</p>
                    </span>
                </div>
            )}
            <h2 className="text-xl font-semibold">Welcome, Admin</h2>
        </header>
    )
}
export default Header;