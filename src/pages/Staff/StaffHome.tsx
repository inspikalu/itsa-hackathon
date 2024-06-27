import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from "../../ThemeContex"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import Notification from '../../components/Notification';
import { apiUrl } from '../../url';
import { useNavigate } from 'react-router-dom';

interface IRequestData {
    type: string,
    description: string,
    priority: string,
    requester: string,
    organization: string,
    isUrgent: boolean
}

const StaffHome: React.FC = function () {
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [orgId, setOrgId] = useState("");
    const [staffId, setStaffId] = useState('');

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            setToken(token);
            const role = localStorage.getItem("role")
            if (role !== "staff") {
                navigate("/")
                return;
            }
            const orgId = localStorage.getItem('orgId');
            if (orgId) setOrgId(JSON.parse(orgId))
            else {
                navigate('/');
                return;
            }
            const staffId = localStorage.getItem('staffId');
            if (staffId) setStaffId(JSON.parse(staffId))
            // else {
            //     navigate('/');
            //     return;
            // }
        } catch (error) {
            console.log(error, "getting user error");
        }
    }, [navigate]);
    console.log(orgId, staffId)

    const requestData: IRequestData = {
        type: "",
        description: "",
        priority: "low",
        requester: staffId,
        organization: orgId,
        isUrgent: false
    };

    const maintenanceData: { month: string, noOfRepairs: number }[] = [
        { month: "JAN '24", noOfRepairs: 0 },
        { month: "FEB '24", noOfRepairs: 1 },
        { month: "MAR '24", noOfRepairs: 2 },
        { month: "APR '24", noOfRepairs: 0 },
        { month: "MAY '24", noOfRepairs: 3 },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [RequestData, setRequestData] = useState(requestData);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isNotificationShowing, setIsNotificationShowing] = useState(false);
    const [isErrorPopover, setIsErrorPopover] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    console.log(RequestData)

    const { darkMode } = useContext(ThemeContext);

    const showPopover = (message: string) => {
        setIsNotificationShowing(true);
        setNotificationMessage(message);
        setTimeout(() => {
            setIsNotificationShowing(false);
        }, 3000);
    };

    const handleOpenCreateStaffModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const handleNewRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) throw new Error("No token");



        const updatedRequestData = {
            ...RequestData,
            requester: staffId,
            organization: orgId
        };

        try {
            setIsLoading(true);
            const response = await axios.post(`${apiUrl}/staff/request`, updatedRequestData, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(token)
                }
            });
            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            setIsModalOpen(false);
            setIsLoading(false);

            formRef.current?.reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false);
                setIsErrorPopover(true);
                if (error?.response?.data.message) showPopover(`${error?.response?.data?.message}`);
                else showPopover(`${error.message}`);
            }
        }
    };

    return (
        <>
            <Notification message={notificationMessage} isShowing={isNotificationShowing} error={isErrorPopover} />
            <div className="w-full h-4 p-4 mt-4 flex items-center justify-between">
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
                <button className='bg-blue-600 p-3 rounded-md cursor-pointer' onClick={handleOpenCreateStaffModal}>+ Request new repair</button>
            </div>
            <div className='flex items-center justify-center gap-3 p-5'>
                <div className="w-[25%] aspect-9-5 bg-blue-500 rounded-md flex flex-col items-start p-5 gap-1">
                    <FontAwesomeIcon icon={faHardDrive} size='2x' className='mb-2' />
                    <span className='mt-auto'>2</span>
                    <span>Assigned Devices</span>
                </div>
                <div className="w-[25%] aspect-9-5 bg-red-500 rounded-md flex flex-col items-start p-5 gap-1">
                    <FontAwesomeIcon icon={faCloudSun} size='2x' className='mb-2' />
                    <span className='mt-auto'>2</span>
                    <span>Devices at risk</span>
                </div>
                <div className="w-[25%] aspect-9-5 bg-green-500 rounded-md flex flex-col items-start p-5 gap-1">
                    <FontAwesomeIcon icon={faHourglassHalf} size='2x' className='mb-2' />
                    <span className='my-auto'>1</span>
                    <span>Pending Requests</span>
                </div>
                <div className="w-[25%] aspect-9-5 bg-blue-100 text-gray-800 rounded-md flex flex-col items-start p-5 gap-1"></div>
            </div>
            <div className='bg-blue-950 rounded-md w-[97%] mx-auto p-5'>
                <h2 className='text-2xl font-bold'>Maintenance History</h2>
                <div className="w-full bg-white rounded-md">
                    <ResponsiveContainer width="100%" height="auto" aspect={2 / 1}>
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
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={handleCloseModal}>
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create Request</h2>
                        <form ref={formRef} onSubmit={handleNewRequest}>
                            <div className="mb-4">
                                <label className='flex flex-col gap-3'>
                                    <span>Repair Type</span>
                                    <select name="requestType" id="requestType" required className='p-2 rounded-md' value={RequestData.type} onChange={(e) => setRequestData({ ...RequestData, type: e.target.value })}>
                                        <option value="">Select an option</option>
                                        <option value="repair">Repair</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className='flex flex-col gap-3 text-white'>
                                    <span>Description</span>
                                    <input className='border border-white p-3 rounded-md text-black' type="text" value={RequestData.description} onChange={(e) => setRequestData({ ...RequestData, description: e.target.value })} required />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className='flex flex-col gap-3'>
                                    <span>Priority</span>
                                    <select className='border border-white p-3 rounded-md' name="priority" id="priority" value={RequestData.priority} onChange={(e) => setRequestData({ ...RequestData, priority: e.target.value })}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Create Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default StaffHome;
