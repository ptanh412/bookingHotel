import React from 'react';
import { FaArrowUp, FaFacebook, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo(
            {
                top: 0,
                behavior: 'smooth'
            }
        )
    }
    return (
        <footer className="bg-black mt-28">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-4 py-20">
                <div className="col-span-3 flex flex-col items-start text-white">
                    <img src='' alt="" className="filter stroke-pink-50 brightness-50" />
                    <p className="mt-2">Welcome to our Trip and Tour Agency. Lorem simply text amet cing elit.</p>
                </div>
                <div className="pl-20 flex">
                    <div className="col-span-1 items-center text-white mx-2 pr-10">
                        <h1 className="text-white font-bold pb-3">Company</h1>
                        <ul className="pt-3 text-gray-400 w-max">
                            <li className="py-2 animation-info ">About Us</li>
                            <li className="py-2 animation-info">Community Blog</li>
                            <li className="py-2 animation-info">Rewards</li>
                            <li className="py-2 animation-info">Work with Us</li>
                            <li className="py-2 animation-info">Meet the Team</li>
                        </ul>
                    </div>
                    <div className="col-span-1 items-center text-white pl-10">
                        <h1 className="text-white font-bold pb-3">Explore</h1>
                        <ul className="pt-3 text-gray-400 w-max">
                            <li className="py-2 animation-info">Account</li>
                            <li className="py-2 animation-info">Legal</li>
                            <li className="py-2 animation-info">Contact</li>
                            <li className="py-2 animation-info">Affilitate Program</li>
                            <li className="py-2 animation-info">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-8 flex flex-row justify-end items-center ml-4">
                    <div>
                        <h1 className="text-white font-bold pb-14">Newsletter</h1>
                        <div className="py-1 pb-4">
                            <input type="text" placeholder="Email Address" className="py-6 px-20 rounded-lg text-center outline-none" />
                        </div>
                        <div className="pb-4">
                            <button className="uppercase  transition-all duration-700 bg-red-500 font-bold text-white rounded-lg py-6 w-full hover:bg-white hover:text-red-500 animation-btn">Subcribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl bg-slate-200 mx-auto flex h-24">
                <div>
                    <button
                        onClick={scrollToTop}
                        className="bg-red-400 px-14 py-5 h-full btn-animation hover:bg-red-300 hover:text-white transition-colors duration-300 hover:transform">
                        <FaArrowUp />
                    </button>
                </div>
                <div className="w-full">
                    <ul className="flex justify-center pt-7 space-x-10 pl-10 ">
                        <li className="bg-yellow-50 p-3 rounded-full cursor-pointer  transition-all duration-700 hover:bg-red-400 hover:text-white"><FaFacebook /></li>
                        <li className="bg-yellow-50 p-3 rounded-full cursor-pointer  transition-all duration-700 hover:bg-red-400 hover:text-white"><FaInstagram /></li>
                        <li className="bg-yellow-50 p-3 rounded-full cursor-pointer  transition-all duration-700 hover:bg-red-400 hover:text-white"><IoLogoTwitter /></li>
                        <li className="bg-yellow-50 p-3 rounded-full cursor-pointer  transition-all duration-700 hover:bg-red-400 hover:text-white"><FaPinterestP /></li>
                    </ul>
                </div>
            </div>
        </footer>


    );
}
export default Footer;