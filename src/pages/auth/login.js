import React, { useContext, useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../context/AlertMessage';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const Login = () => {
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { alertMessage, alertType, showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleTab = (index) => {
        setTab(index);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showAlert('Please enter complete information', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Email is not in correct format.', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showAlert('Password must be at least 8 characters, including uppercase, lowercase, numbers and special characters', 'error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });

            if (response) {
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));

                if (user.role === 'customer') {
                    navigate('/');
                    showAlert('Login succesfully', 'success');
                } else if (user.role === 'admin' || user.role === 'staff') {
                    navigate('/admin-home/dashboard');
                    showAlert('Login succesfully', 'success');
                } else {
                    showAlert('Not permitted to access', 'error');
                    navigate('/');
                }
            } else {
                showAlert('Login failed', 'error');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                showAlert('Email of password incorrect', 'error');
            } else {
                showAlert('Error', 'error');
            }
            console.error('Error:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password || !confirmPassword) {
            showAlert('Please enter complete information', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Email is not in correct format.', 'error');
            return;
        }

        if (!validatePassword(password)) {
            showAlert('Password must be at least 8 characters, including uppercase, lowercase, numbers and special characters', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Confirm password does not match', 'error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                email,
                password
            });

            if (response.data && response.data.message) {
                showAlert('Register succesfully', 'success');
                setTab(0);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                showAlert('Register failed', 'error');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showAlert(error.response.data.message, 'error');
            } else {
                showAlert('Error', 'error');
            }
            console.error('Error:', error);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {alertMessage && (
                <div className={`fixed top-0 mx-auto transform left-[650px] py-1 ${alertType === 'success' ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"} rounded-lg mb-4 w-60 max-w-md text-center z-50 animate-slide-down`} role="alert">
                    <span className="text-center flex justify-center w-full items-center space-x-1 px-5">
                        {alertType === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                        <p className="text-sm">{alertMessage}</p>
                    </span>
                </div>
            )}
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg">
                <div className="grid grid-cols-2 text-lg w-full bg-gray-300 rounded-t-lg">
                    <button
                        className={`${tab === 0 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'} rounded-t-lg py-2`}
                        onClick={() => handleTab(0)}
                    >
                        Login
                    </button>
                    <button
                        className={`${tab === 1 ? 'bg-slate-950 text-white' : 'bg-gray-300 text-black'} rounded-t-lg py-2`}
                        onClick={() => handleTab(1)}
                    >
                        Register
                    </button>
                </div>

                {tab === 0 ? (
                    <form className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                        <p className="text-gray-400 text-center">Enter your account information to log in</p>
                        <div className="flex flex-col space-y-3 my-3">
                            <label className="text-xl font-semibold">Email</label>
                            <div className="w-full relative">
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
                            <label className="text-xl font-semibold">Password</label>
                            <div className="w-full relative">
                                <CiLock className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="password"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                        <button
                            className="py-2 bg-slate-950 text-white w-full rounded-xl font-semibold text-lg hover:bg-slate-900"
                            onClick={handleLogin}
                        >
                            Log in
                        </button>
                    </form>
                ) : (
                    <form className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                        <p className="text-gray-400 text-center">Create a new account to use our services</p>
                        <div className="flex flex-col space-y-3 my-3">
                            <label className="text-xl font-semibold">Email</label>
                            <div className="w-full relative">
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
                            <label className="text-xl font-semibold">Password</label>
                            <div className="w-full relative">
                                <CiLock className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Password must be at least 8 characters, including uppercase, lowercase, numbers and special characters"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 my-3">
                            <label className="text-xl font-semibold">Confirm Password</label>
                            <div className="w-full relative">
                                <CiLock className="absolute top-3.5 left-2 h-4 w-4 bottom-0 text-2xl text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="Re-enter password"
                                    className="border pl-7 py-2 rounded-lg w-full"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                )}
            </div>
        </div>
    );
};

export default Login;