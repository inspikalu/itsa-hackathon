import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SubAdminHome: React.FC = () => {
    const [token, setToken] = useState<string | null>(null); // Initialize token state

    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStaffData, setNewStaffData] = useState({
        staffName: "",
        email: ""
    });

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (localStorageToken) {
            setToken(localStorageToken);
        } else {
            alert("Please Log in first");
            navigate('/'); // Redirect to '/' if token is not found
        }
    }, [navigate]); // Only run this effect once on component mount

    const handleOpenCreateStaffModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const handleAddStaff = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            console.log("Sending respone")
            const response = await axios.post("https://itsa.onrender.com/staff", newStaffData, {
                headers: {
                    Authorization: `JWT ${token}`
                }
            });
            
            console.log("Response sent")
            console.log(response.data)
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full h-4 p-7 mt-4 flex items-center justify-between">
                <div className={`search ${darkMode && "text-black"} bg-white max-w-[25%] flex justify-start items-center gap-3 p-2 rounded-md`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="search" placeholder='Search Device' className={`bg-transparent w-full focus:outline-none`} />
                </div>

                <div className="icons flex items-center justify-center gap-3">
                    <FontAwesomeIcon icon={faBell} />
                    <span>John Doe</span>
                    <div className='flex justify-center items-center gap-2 cursor-pointer'>
                        <div className="w-8 h-8 rounded-[50%] bg-white"></div>
                        <FontAwesomeIcon icon={faSquareCaretDown} />
                    </div>
                </div>
            </div>
            <div className='welcomeToDash grid w-full px-5 my-8 gap-2'>
                <h2 className='text-xl font-bold'>Welcome to your dashboard</h2>
                <span>Get an overview of your device health and status</span>
                <button className='bg-blue-600 p-3 rounded-md cursor-pointer'>+ Add New Device</button>
            </div>

            {/* User Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">User Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg" onClick={() => handleOpenCreateStaffModal()}>Create new staff account</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg">Remove staff account</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg">Edit staff account</button>
                </div>
            </div>

            {/* Device Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Device Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg">Add New Device</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg">Edit Repair Request</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg">Assign Devices to Staff</button>
                </div>
            </div>

            <div className='p-5'>
                <h2 className="text-2xl font-bold my-2">Device Status and Reports</h2>
                <div className='flex items-center justify-center  gap-3 '>
                    <div className="w-[25%] aspect-9-5 bg-blue-500 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faHardDrive} size='2x' className='mb-2' />
                        <span className='mt-auto'>2</span>
                        <span>All Devices</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-red-500 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faCloudSun} size='2x' className='mb-2' />
                        <span className='mt-auto'>2</span>
                        <span>Devices at risk</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-green-500 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faHourglassHalf} size='2x' className='mb-2' />
                        <span className='my-auto'>1</span>
                        <span>Users</span>
                    </div>
                    <div className={`w-[25%] aspect-9-5 bg-blue-100 text-gray-800 rounded-md flex flex-col items-start p-5 gap-1 ${darkMode && 'text-black'}`}>
                        <div className='flex flex-row justify-between items-center gap-2'>
                            <span>Device Reports</span>
                            <span>This week</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gray-800 rounded-md w-[97%] mx-auto p-5'>
                <h2 className='text-2xl font-bold'>Device Inventory</h2>
                <div className="w-full bg-white rounded-md">
                    <table className={`w-full ${darkMode && "bg-blue-900"} text-left border-collapse my-3`}>
                        <thead className='bg-gray-700 text-white'>
                            <tr>
                                <th className='p-3 border-b border-gray-600'>Device Name</th>
                                <th className='p-3 border-b border-gray-600'>Device ID</th>
                                <th className='p-3 border-b border-gray-600'>Category</th>
                                <th className='p-3 border-b border-gray-600'>Ip Address</th>
                                <th className='p-3 border-b border-gray-600'>Mac Address</th>
                                <th className='p-3 border-b border-gray-600'>Device Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample table rows */}
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding/Editing Staff */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={(e) => { handleCloseModal(e) }}>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create New Staff</h2>
                        <form onSubmit={(e) => handleAddStaff(e)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Staff Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newStaffData.staffName}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, staffName: e.target.value })}
                                    className="border border-gray-300 p-2 w-full rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    required
                                    type="email"
                                    value={newStaffData.email}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                                    className="border border-gray-300 p-2 w-full rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Add Staff
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubAdminHome;
