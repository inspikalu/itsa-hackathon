import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';


const SubAdminHome: React.FC = () => {
    const { darkMode } = useContext(ThemeContext)
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
                    <div className='flex justify-center items-center gap-2 cursor-pointer'> <div className="w-8 h-8 rounded-[50%] bg-white"></div> <FontAwesomeIcon icon={faSquareCaretDown} /></div>
                </div>
            </div>
            <div className='welcomeToDash grid w-full px-5 my-8 gap-2'>
                <h2 className='text-xl font-bold'>Welcome to your dashboard</h2>
                <span>Get an overview of your device health and status</span>
                <button className='bg-blue-600 p-3 rounded-md cursor-pointer'>+ Add New Device</button>
            </div>

            {/* <!-- User Management Section --> */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">User Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg">Create new staff account</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg">Remove staff account</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg">Edit staff account</button>
                </div>
            </div>

            {/* <!-- Device Management Section --> */}
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
                        <div className='flex flex-row justify-between items-center gap-2'><span>Device Reports</span> <span>This week</span></div>
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
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
                            <tr>
                                <td>Clements' Hp</td>
                                <td>23323323</td>
                                <td>Desktop</td>
                                <td>127.0.0.1</td>
                                <td>abcd:abcd::0</td>
                                <td><span>fixed</span></td>

                            </tr>
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
        </>

    )
}

export default SubAdminHome
