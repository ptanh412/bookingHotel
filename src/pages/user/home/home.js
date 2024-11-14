import image from '../../../assets/1920x1080_px_architecture_Hotels_Marina_Bay_reflection_Singapore-1199381.jpg';

const Home = () => {
    
    return (
        <div className="max-w-6xl mx-auto  pt-32">
            <div className="grid grid-cols-2">
                <div className="space-y-5">
                    <h1 className="text-4xl font-bold">Welcome to Luxury hotel</h1>
                    <p className="text-gray-500">Experience 5-star luxury in the heart of the city with impeccable service and modern amenities.</p>
                    <button className="bg-black text-white rounded-lg px-10 py-3 font-semibold">Book Now</button>
                </div>
                <div>
                    <img
                        src={image}
                        alt="Home"
                        className="w-full h-full rounded-lg"
                    />
                </div>
            </div>
            <div className="my-10">
                <h1 className="text-4xl font-bold py-10 text-center">Our Services</h1>
                <div className="grid grid-cols-3 gap-32">
                    <div>
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731494727/pexels-photo-6129967_qulfa1.jpg"
                            alt=""
                            className="w-full h-60 rounded-full"
                        />
                        <h1 className="text-2xl font-semibold py-2 text-center">Luxury Rooms</h1>
                        <p className="text-gray-500 text-center text-lg">Experience a classy living space with high-end furniture and stunning city views.</p>
                    </div>
                    <div>
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731494819/cac-dich-vu-trong-khach-san_ppqyoi.jpg"
                            alt=""
                            className="w-full h-60 rounded-full"
                        />
                        <h1 className="text-2xl font-semibold py-2 text-center">Restaurants 5 star</h1>
                        <p className="text-gray-500 text-center text-lg">Enjoy world-class cuisine from renowned chefs in luxurious surroundings.</p>
                    </div>
                    <div>
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731494706/sa-loai-hinh-thu-gian-pho-bien_quuk6o.webp"
                            alt=""
                            className="w-full h-60 rounded-full"
                        />
                        <h1 className="text-2xl font-semibold py-2 text-center">Spa & Wellness</h1>
                        <p className="text-gray-500 text-center text-lg">Relax and rejuvenate with our premium spa treatments in a tranquil setting.</p>
                    </div>
                </div>
                <div className=" text-center mt-20">
                    <button className="bg-black text-white rounded-lg px-10 py-3 font-semibold">View All Services</button>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold py-10 text-center">Our Gallery</h1>
                <div className="grid grid-cols-3 gap-20">
                    <div className="shadow-xl rounded-lg">
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731495025/pexels-photo-6434634_suho8a.webp"
                            alt=""
                            className="w-full h-60 rounded-t-lg"
                        />
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Deluxe Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                    <div className="shadow-xl rounded-lg">
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731495132/59464668_mlyjnp.jpg"
                            alt=""
                            className="w-full h-60 rounded-t-lg"
                        />
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Single Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                    <div className="shadow-xl rounded-lg">
                        <img
                            src="https://res.cloudinary.com/doruhcyf6/image/upload/v1731495194/5bf8a789-2234-4321-921d-da46e0660d3b_rgallery_vvckfc.jpg"
                            alt=""
                            className="w-full h-60 rounded-t-lg"
                        />
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Suite Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                </div>
                <div className=" text-center mt-20">
                    <button className="bg-black text-white rounded-lg px-10 py-3 font-semibold">View All Gallery</button>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold py-10 text-center">Our Reviews</h1>
                <div className="grid grid-cols-3 gap-20">
                    <div className="shadow-xl rounded-lg">
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Deluxe Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                    <div className="shadow-xl rounded-lg">
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Deluxe Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                    <div className="shadow-xl rounded-lg">
                        <div className="p-5">
                            <h1 className="text-2xl font-semibold">Deluxe Rooms</h1>
                            <p className="text-gray-400">Spacious room with beautiful city view, fully equipped with modern amenities.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-bold py-10 text-center">Contact Us</h1>
                <div className="grid grid-cols-2 gap-20">
                    <div>
                        <h1 className="text-2xl font-semibold">Contact Information</h1>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                        <div className="flex items-center space-x-3 mt-5">
                            <img
                                src="https://res.cloudinary.com/doruhcyf6/image/upload/v1726802637/homestay-quy-nhon-4588-1592910-1801-3454-1655448395_nos8q5.jpg"
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h1 className="text-lg font-semibold">John Doe</h1>
                                <p className="text-gray-400">CEO</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">Send us a message</h1>
                        <form action="" className="space-y-5">
                            <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            <textarea name="" id="" cols="30" rows="10" placeholder="Message" className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                            <button className="bg-black text-white rounded-lg px-10 py-3 font-semibold">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;