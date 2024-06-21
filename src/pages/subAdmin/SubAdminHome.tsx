import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';


const SubAdminHome:React.FC = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        
            
            <>
                <div className="w-full h-4 p-4 mt-4 flex items-center justify-between">
                    <div className={`search ${darkMode && "text-black"} bg-white max-w-[25%] flex justify-start items-center gap-3 p-2 rounded-md`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="search" placeholder='Search Device' className={`bg-transparent w-full`} />
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

                <div className='flex items-center justify-center  gap-3 p-5'>
                    <div className="w-[25%] aspect-9-5 bg-blue-400 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faHardDrive} size='2x' className='mb-2'/>
                        <span className='mt-auto'>2</span>
                        <span>All Devices</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-pink-400 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faCloudSun} size='2x' className='mb-2'/>
                        <span className='mt-auto'>2</span>
                        <span>Devices at risk</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-purple-400 rounded-md flex flex-col items-start p-5 gap-1">
                    <FontAwesomeIcon icon={faHourglassHalf} size='2x'  className='mb-2'/>
                        <span className='my-auto'>1</span>
                        <span>Users</span>
                    </div>
                    <div className={`w-[25%] aspect-9-5 bg-white rounded-md flex flex-col items-start p-5 gap-1 ${darkMode && 'text-black'}`}>
                        <div className='flex flex-row justify-between items-center gap-2'><span>Device Reports</span> <span>This week</span></div>
                    </div>
                </div>

                <div className='bg-blue-950 rounded-md w-[97%] mx-auto p-5'>
                    <h2 className='text-2xl font-bold'>Device Inventory</h2>
                    <div className="w-full bg-white rounded-md">
                       <table className={`w-full ${darkMode && "bg-blue-950"}`}>
                        <thead>
                            <tr>
                                <td>Device Name</td>
                                <td>Device ID</td>
                                <td>Category</td>
                                <td>Ip Address</td>
                                <td>Mac Address</td>
                                <td>Device Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                       </table>
                    </div>
                </div>
                </>
     
    )
}

export default SubAdminHome
