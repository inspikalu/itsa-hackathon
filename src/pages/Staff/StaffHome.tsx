import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const StaffHome: React.FC = function () {
    const maintenanceData: { month: string, noOfRepairs: number }[] = [
        {
            month: "JAN '24",
            noOfRepairs: 0
        },
        {
            month: "FEB '24",
            noOfRepairs: 1
        },
        {
            month: "MAR '24",
            noOfRepairs: 2
        },
        {
            month: "APR '24",
            noOfRepairs: 0
        },
        {
            month: "MAY '24",
            noOfRepairs: 3
        },
    ]
    const { darkMode } = useContext(ThemeContext)
    return (
        
            
            <>
                <div className="w-full h-4 p-4 mt-4 flex items-center justify-between">
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
                    <button className='bg-blue-600 p-3 rounded-md cursor-pointer'>+ Request new repair</button>
                </div>

                <div className='flex items-center justify-center  gap-3 p-5'>
                    <div className="w-[25%] aspect-9-5 bg-blue-500 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faHardDrive} size='2x' className='mb-2'/>
                        <span className='mt-auto'>2</span>
                        <span>Assigned Devices</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-red-500 rounded-md flex flex-col items-start p-5 gap-1">
                        <FontAwesomeIcon icon={faCloudSun} size='2x' className='mb-2'/>
                        <span className='mt-auto'>2</span>
                        <span>Devices at risk</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-green-500 rounded-md flex flex-col items-start p-5 gap-1">
                    <FontAwesomeIcon icon={faHourglassHalf} size='2x'  className='mb-2'/>
                        <span className='my-auto'>1</span>
                        <span>Pending Requests</span>
                    </div>
                    <div className="w-[25%] aspect-9-5 bg-blue-100 text-gray-800 rounded-md flex flex-col items-start p-5 gap-1"></div>
                </div>

                <div className='bg-blue-950 rounded-md w-[97%] mx-auto p-5'>
                    <h2 className='text-2xl font-bold'>Maintenance History</h2>
                    <div className="w-full bg-white rounded-md">
                        <ResponsiveContainer width="100%" height="auto" aspect={2/1}>
                            <LineChart
                                width={500}
                                height={300}
                                data={maintenanceData}
                                margin={{
                                    top: 15,
                                    right: 30,
                                    left: 20,
                                    bottom: 15,
                                }}
                                
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="noOfRepairs" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                </>
     
    )
}

export default StaffHome


