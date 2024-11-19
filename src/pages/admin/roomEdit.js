import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const RoomEdit = () => {
    const [room, setRoom] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [showType, setShowType] = useState(false);
    // useEffect(() => {
    //     const id = window.location.pathname.split('/').pop();
    //     const getRoom = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
    //             setRoom(response.data);
    //             setIsEdit(true);
    //         } catch (error) {
    //             console.error('Error fetching room data:', error);
    //         }
    //     };
    //     if (roomId) {
    //         getRoom();
    //     }
    // }, []);
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setRoom({ ...room, [name]: value });
    // };
    // const handleSelectClick = () => {
    //     setShowType(false);
    // };
    // const handleSubmit = async () => {
    //     try {
    //         if (isEdit) {
    //             await axios.put(`http://localhost:5000/api/rooms/${room.id}`, room);
    //         } else {
    //             await axios.post('http://localhost:5000/api/rooms', room);
    //         }
    //         window.location.href = '/admin-home/roomManage';
    //     } catch (error) {
    //         console.error('Error fetching room data:', error);
    //     }
    // };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Report</h1>
            <div className="mt-5 w-full bg-white h-full">
                <form className='flex flex-col space-y-10 ml-10 justify-between w-full'>
                    {/* <div className='grid grid-cols-6 gap-4 mt-10'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Full Name :</label>
                        <input
                            type="text"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            name='name'
                            // value={room.name}
                            // onChange={handleInputChange}
                            placeholder='Full name...'
                        />
                    </div> */}
                    {/* <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Type :</label>
                        <select
                            name="type"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            value={room.type}
                            onChange={handleInputChange}
                            onClick={handleSelectClick}
                            onBlur={() => setShowType(true)}
                        >
                            {!showType && (
                                <option value="" disabled>
                                    {isEdit ? room.type : 'Select type'}
                                </option>
                            )}
                            {showType && (
                                <>
                                    
                                </>
                            )}
                            <option value="">Select type room</option>
                            <option value="Adventure">Single</option>
                            <option value="Historical">Historical</option>
                            <option value="Sightseeing">Sightseeing</option>
                            <option value="Wildlife">Wildlife</option>
                            <option value="Other">Other</option>
                        </select>
                    </div> */}
                    {/* <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Capacity :</label>
                        <input
                            type="text"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            name='tours'
                            // value={room.tours}
                            // onChange={handleInputChange}
                            placeholder='Capacity...'
                        />
                    </div>
                    <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Amount bed :</label>
                        <input
                            type="text"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            name='tours'
                            // value={room.tours}
                            // onChange={handleInputChange}
                            placeholder='Amount bed...'
                        />
                    </div> */}
                    <div className='grid grid-cols-6 gap-4 pt-10'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Type room :</label>
                        <select
                            name="type"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                        >
                            <option value="">Select type room</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Date :</label>
                        <input
                            type="date"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            name='tours'
                            placeholder='Phone number...'
                        />
                    </div>
                     {/* <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>ID Card :</label>
                        <input
                            type="text"
                            className='border rounded-lg col-span-2 p-2 outline-red-300'
                            name='tours'
                            placeholder='ID Card...'
                        />
                    </div> */}
                    {/* <div className='grid grid-cols-6 gap-4'>
                        <label htmlFor="" className='text-xl font-semibold col-span-2'>Image :</label>
                        <div className='flex flex-col justify-start w-full col-span-2 space-y-2'>
                            <input type="file"/>
                            <img
                                // src={room.img}
                                alt="Selected"
                                className="col-span-3 mt-2 border rounded-lg max-w-32 max-h-32"
                            />
                        </div>

                    </div> */}
                </form>
                <button type='submit' className='ml-10 mt-10 bg-blue-400 px-6 text-white rounded-md mb-10 font-bold'>
                    {isEdit ? 'Update' : "Export to Excel"}
                </button>
                <button className='ml-10 mt-10 bg-red-400 px-6 text-white rounded-md mb-10 font-semibold'>
                    <Link to='/admin-home/roomManage'>Cancel</Link>
                </button>
            </div>
        </div>
    );
}
export default RoomEdit;