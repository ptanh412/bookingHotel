import React, { useContext, useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../context/AlertMessage';
import {FaExclamationCircle } from 'react-icons/fa';
const Login = () => {
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const {alertMessage, alertType, showAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const handleTab = (index) => {
        setTab(index);
        if (index === 0) {
            setEmail('');
            setPassword('');
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });
            console.log('Full response:', response);
            if (response) {
                const user = response.data;
                console.log('User role:', user.role);
                if (user.role === 'user') {
                    navigate('/');
                    showAlert('Login successfully', 'success');
                } else if (user.role === 'admin') {
                    navigate('/admin-home/dashboard');
                    showAlert('Login successfully', 'success');
                }
            } else {
                showAlert('Login failed', 'error');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                showAlert('Invalid email or password', 'error');
            } else {
                showAlert('Something went wrong', 'error');
            }
            console.error('Error fetching data:', error);
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                email,
                fullName,
                phoneNumber,
                password
            });
            console.log(response.data);
            if (response.data) {
                setTab(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            {alertMessage && (
                <div className={`fixed top-0 mx-auto transform position ${alertType === 'error' ? "bg-red-100 border border-red-400 text-red-700" : ""} py-3 rounded-lg mb-4 w-60 max-w-md text-center z-50 animate-slide-down`} role="alert">
                    <span className="text-center flex justify-center w-full items-center space-x-2">
                        {alertType === 'error' ? <FaExclamationCircle /> : ''}
                        <p className="text-sm">{alertMessage}</p>
                    </span>
                </div>
            )}
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg">
                <div className="grid grid-cols-2 text-lg w-full bg-gray-300 rounded-t-lg">
                    <button
                        className={`${tab === 0 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'
                            } rounded-t-lg py-2`}
                        onClick={() => handleTab(0)}
                    >
                        Login
                    </button>
                    <button
                        className={`${tab === 1 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'
                            } rounded-t-lg py-2`}
                        onClick={() => handleTab(1)}
                    >
                        Register
                    </button>
                </div>

                {tab === 0 ?
                    <form action="" className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                        <p className="text-gray-400 text-center">Enter your account information to log in</p>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Email</label>
                            <div className='w-full relative'>
                                <MdOutlineEmail className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Password</label>
                            <div className='w-full relative'>
                                <CiLock className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="password"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="py-2 bg-slate-950 text-white w-full rounded-xl font-semibold text-lg hover:bg-slate-900"
                            onClick={handleLogin}
                        >
                            <p>Log in</p>
                        </button>
                    </form>
                    :
                    <form action="" className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                        <p className="text-gray-400 text-center">Create a new account to use our services</p>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Full Name</label>
                            <div className='w-full relative'>
                                <CiUser className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl" />
                                <input
                                    type="text"
                                    placeholder="Pham Anh"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Phone Number</label>
                            <div className='w-full relative'>
                                <FiPhone className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl" />
                                <input
                                    type="text"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Email</label>
                            <div className='w-full relative'>
                                <MdOutlineEmail className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 my-3">
                            <label htmlFor="" className="text-xl font-semibold">Password</label>
                            <div className='w-full relative'>
                                <CiLock className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="password"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            className="py-2 bg-slate-950 text-white w-full rounded-xl font-semibold text-lg hover:bg-slate-900"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </form>
                }
            </div>
        </div>
    );
}
export default Login;