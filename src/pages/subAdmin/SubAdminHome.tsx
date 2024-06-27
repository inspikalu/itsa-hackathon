import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../ThemeContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { apiUrl } from '../../url';
import Notification from '../../components/Notification';

const SubAdminHome: React.FC = function () {
    const [token, setToken] = useState<string | null>(null); // Initialize token state
    const [orgId, setOrgId] = useState("");
    const [staffList, setStaffList] = useState<any[]>([]);
    const [requestList, setRequestList] = useState<any[]>([]);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditRequestModal, setIsEditRequestModal] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [, setSelectedStaff] = useState<any>(null);
    const [editStaffData, setEditStaffData] = useState({
        name: "",
        email: ""
    });

    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [editRequestData, setEditRequestData] = useState(selectedRequest);

    const [isRequestEditingModalOpen, setRequestEditingModalOpen] = useState(false)

    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isNotificationShowing, setIsNotificationShowing] = useState(false);
    const [isErrorPopover, setIsErrorPopover] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [newStaffData, setNewStaffData] = useState({
        name: "",
        email: ""

    });

    const [unAssignedDevice, setUnAssignedDevices] = useState<any[]>([])
    const [viewUnAssignedDevice, setViewUnassignedDevice] = useState(false)
    const [viewingStaffs, setViewingStaffs] = useState(false)
    const [deviceToAssign, setDeviceToAssign] = useState<any | null>(null)
    const [staffToAssign, setStaffToAssign] = useState<any | null>(null)

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            let parsedToken: string = JSON.parse(token);
            setToken(parsedToken);
            const role = localStorage.getItem("role")
            if (role !== "sub-admin") {
                navigate("/")
                return;
            }
            const orgId = localStorage.getItem('orgId');
            if (orgId) setOrgId(JSON.parse(orgId))
            else {
                navigate('/');
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }, [navigate, token]);

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
            setIsRemoveModalOpen(false);
            setIsEditModalOpen(false);
            setIsEditUserModalOpen(false);
            setIsEditRequestModal(false)
            setRequestEditingModalOpen(false)
            setViewUnassignedDevice(false)
            setViewingStaffs(false)
        }
    };

    const handleAddStaff = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const datatosend = {
                ...newStaffData,
                organizationId: orgId
            };
            const response = await axios.post(`${apiUrl}/subadmin/create`, datatosend, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            setIsErrorPopover(false);
            showPopover(`${response.data.message}, Check email for password`);
            setIsLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            setIsErrorPopover(true);
            showPopover("Failed to add staff");
            setIsLoading(false);
        }
    };



    const fetchStaffList = async () => {
        console.log("Fetching staff list");
        try {
            const response = await axios.get(`${apiUrl}/subadmin/all`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log("Done staff list");
            console.log(response.data);
            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            setStaffList(response.data.staffs);
            setIsRemoveModalOpen(true);
        } catch (error) {
            setIsErrorPopover(true);
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                await showPopover("Failed to fetch staff list");
                showPopover(error.response?.data?.message)
            }
        }
    };

    const handleAssignDevice = async function (id: any) {
        fetchStaffList()
        setDeviceToAssign(id)
        setViewingStaffs(true)
        console.log(id)
    }
    const handleAssignDeviceToStaffMain = async function (id: any) {
        setStaffToAssign(id)
        try {
            const response = await axios.put(`${apiUrl}/subadmin/assign-device`, {
                deviceId: deviceToAssign,
                staffId: staffToAssign
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log("Done staff list");
            console.log(response.data);
            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            handleCloseModal(id)
        } catch (error) {
            setIsErrorPopover(true);
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                await showPopover("Failed to fetch staff list");
                showPopover(error.response?.data?.message)
            }
        }
    }

    const fetchStaffListforEdit = async () => {
        console.log("Fetching staff list");
        try {
            const response = await axios.get(`${apiUrl}/subadmin/all`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log("Done staff list");
            console.log(response.data);
            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            setStaffList(response.data.staffs);
            setIsEditModalOpen(true);
        } catch (error) {
            setIsErrorPopover(true);
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                await showPopover("Failed to fetch staff list");
                showPopover(error.response?.data?.message)
            }
        }
    };

    const fetchRequestListforEdit = async function () {
        try {
            const response = await axios.get(`${apiUrl}/subadmin/requests`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            setRequestList(response.data.requests);
            setIsEditRequestModal(true);
        } catch (error) {
            setIsErrorPopover(true);
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                await showPopover("Failed to fetch request List");
                showPopover(error.response?.data?.message)
            }
        }
    }

    const fetchUnAssingedDevices = async function () {
        try {
            const response = await axios.get(`${apiUrl}/subadmin/device/unassigned`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setIsErrorPopover(false);
            showPopover(`${response.data.message}`);
            setUnAssignedDevices(response.data.devices)
            setViewUnassignedDevice(true);
        } catch (error) {
            setIsErrorPopover(true);
            if (axios.isAxiosError(error)) {
                console.log(error.message);
                await showPopover("Failed to Get Unassigned Devices try again");
                showPopover(error.response?.data?.message)
            }
        }
    }

    const handleRemoveStaff = async (email: string) => {
        try {
            await axios.delete(`${apiUrl}/subadmin/${email}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setIsErrorPopover(false);
            showPopover("Staff account removed successfully");
            setStaffList(staffList.filter(staff => staff.email !== email)); // Update state to remove the deleted staff
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false);
                setIsErrorPopover(true);
                if (error?.response?.data.message) showPopover(`Failed to remove staff account, ${error?.response?.data?.message}`);
                else showPopover(`${error.message}`);
            }
        }
    };

    const handleEditStaff = (staff: any) => {
        setSelectedStaff(staff);
        setEditStaffData(staff);
        setIsEditUserModalOpen(true);
    };

    const handleEditRequest = (request: any) => {
        setSelectedRequest(request);
        setEditRequestData(request);
        setRequestEditingModalOpen(true);


    };


    const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.put(`${apiUrl}/subadmin/edit/${editStaffData.email}`, editStaffData, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setIsErrorPopover(false);
            showPopover("Staff account updated successfully");
            setIsEditUserModalOpen(false);
            setIsLoading(false);
            fetchStaffListforEdit();
        } catch (error) {
            console.log(error);
            setIsErrorPopover(true);
            showPopover("Failed to edit staff");
            setIsLoading(false);
        }
    };

    const handleEditRequests = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(editRequestData)
        try {
            setIsLoading(true);
            await axios.put(`${apiUrl}/subadmin/request/${editRequestData.requestId}`, editRequestData, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setIsErrorPopover(false);
            showPopover("Request updated successfully");
            setRequestEditingModalOpen(false)
            setIsLoading(false);
            fetchRequestListforEdit();
        } catch (error) {
            console.log(error);
            setIsErrorPopover(true);
            showPopover("Failed to edit request");
            setIsLoading(false);
        }
    }


   /* const handleDownloadDriver = async () => {
        const userAgent = navigator.userAgent;
        let os = '';

        if (userAgent.indexOf('Win') !== -1) os = 'Windows';
        else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
        else if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
        else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';

        try {
            const token = localStorage.getItem('token'); // Assume token is stored in localStorage
            const organizationId = localStorage.getItem('organizationId'); // Assume organizationId is stored in localStorage


            const response = await axios.get(`/api/subadmin/download-driver?os=${os}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'X-Organization-Id': organizationId,
                },
                responseType: 'blob', // Specify response type as blob
              });
              const url = window.URL.createObjectURL(response.data);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'ITSA_Driver.exe'; // Adjust filename based on your driver
              document.body.appendChild(link);
              link.click();
              link.remove();
        } catch (error) {
            console.error('Error downloading driver:', error);
        }
    };*/





    return (
        <>
            <Notification message={notificationMessage} isShowing={isNotificationShowing} error={isErrorPopover} />
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
                    <button className="bg-blue-600 text-white p-2 rounded-lg" onClick={handleOpenCreateStaffModal}>Create new staff account</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg" onClick={fetchStaffList}>Remove staff account</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg" onClick={fetchStaffListforEdit}>Edit staff account</button>
                </div>
            </div>

            {/* Device Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Device Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg">Add New Device</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg" onClick={fetchRequestListforEdit}>Edit Repair Request</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg" onClick={fetchUnAssingedDevices}>Assign Devices to Staff</button>
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
            {/* Create Staff Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 text-white flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-bold mb-4">Create Staff Account</h2>
                        <form onSubmit={handleAddStaff}>
                            <div className="mb-2">
                                <label className="block ">Name</label>
                                <input
                                    type="text"
                                    value={newStaffData.name}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block ">Email</label>
                                <input
                                    type="email"
                                    value={newStaffData.email}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                    {isLoading ? 'Adding...' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Remove Staff Modal */}
            {isRemoveModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg max-h-[90%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Remove Staff Account
                            <span onClick={handleCloseModal} className='cursor-pointer'>X Close</span>
                        </h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map(staff => (
                                    <tr key={staff.email}>
                                        <td className="px-4 py-2 border-b">{staff.name}</td>
                                        <td className="px-4 py-2 border-b">{staff.email}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="bg-red-600 text-white p-2 rounded-lg"
                                                onClick={() => handleRemoveStaff(staff.email)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Edit Staff Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className={`bg-blue-950 p-4 rounded-lg max-h-[90%] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                        {/* <h2 className="text-lg font-bold mb-4">Edit Staff Account</h2> */}
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Edit Staff Account
                            <span onClick={handleCloseModal} className='cursor-pointer'>X Close</span>
                        </h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map(staff => (
                                    <tr key={staff.email}>
                                        <td className="px-4 py-2 border-b">{staff.name}</td>
                                        <td className="px-4 py-2 border-b">{staff.email}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="bg-green-600 text-white p-2 rounded-lg"
                                                onClick={() => handleEditStaff(staff)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditUserModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Edit Staff Account
                            <span onClick={handleCloseModal}>Close</span>
                        </h2>

                        <form onSubmit={handleEditUser}>
                            <div className="mb-2">
                                <label className="block text-white">Name</label>
                                <input
                                    type="text"
                                    value={editStaffData.name}
                                    onChange={(e) => setEditStaffData({ ...editStaffData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded"
                                    onClick={() => setIsEditUserModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                    {isLoading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Requst Modal */}
            {isEditRequestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg max-h-[90%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* <h2 className="text-lg font-bold mb-4">Edit Staff Account</h2> */}
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Edit Request
                            <span onClick={handleCloseModal} className='cursor-pointer'>X Close</span>
                        </h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Type</th>
                                    <th className="px-4 py-2 border-b">Description</th>
                                    <th className="px-4 py-2 border-b">Priority</th>
                                    <th className="px-4 py-2 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requestList.map(request => (
                                    <tr key={request._id}>
                                        <td className="px-4 py-2 border-b capitalize">{request.type}</td>
                                        <td className="px-4 py-2 border-b capitalize">{request.description}</td>
                                        <td className="px-4 py-2 border-b capitalize">{request.priority}</td>
                                        <td className="px-4 py-2 border-b">{request.status}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="bg-green-600 text-white p-2 rounded-lg"
                                                // onClick={() => handleEditStaff(staff)}
                                                onClick={() => handleEditRequest(request)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isRequestEditingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Edit Request
                            <span onClick={handleCloseModal}>Close</span>
                        </h2>

                        <form onSubmit={handleEditRequests}>
                            <div className="mb-2 w-full">
                                <label className="block text-white" htmlFor='typ'><span>Type</span></label>
                                {/* <input
                                    type="text"
                                    value={editStaffData.name}
                                    onChange={(e) => setEditStaffData({ ...editStaffData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                /> */}
                                <select className='w-full p-2 text-black' name="typ" id="typ" value={editRequestData.type} onChange={(e) => { setEditRequestData({ ...editRequestData, type: e.target.value }) }}>
                                    <option value="request">Request</option>
                                    <option value="maintenace">Maintenace</option>
                                </select>
                            </div>
                            <div className="mb-2 w-full">
                                <label className="block text-white" htmlFor='desc'><span>Description</span></label>
                                <input
                                    type="text"
                                    value={editRequestData.description}
                                    onChange={(e) => setEditRequestData({ ...editRequestData, description: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />

                            </div>
                            <div className="mb-2 w-full">
                                <label className="block text-white" htmlFor='priority'><span>Priority</span></label>
                                {/* <input
                                    type="text"
                                    value={editStaffData.name}
                                    onChange={(e) => setEditStaffData({ ...editStaffData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                /> */}
                                <select className='w-full p-2 text-black' name="priority" id="priority" value={editRequestData.priority} onChange={(e) => { setEditRequestData({ ...editRequestData, priority: e.target.value }) }}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded"
                                    onClick={() => setRequestEditingModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                    {isLoading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {viewUnAssignedDevice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-950 p-4 rounded-lg max-h-[90%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* <h2 className="text-lg font-bold mb-4">Edit Staff Account</h2> */}
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Device List
                            <span onClick={handleCloseModal} className='cursor-pointer'>X Close</span>
                        </h2>
                        {unAssignedDevice.length > 0 ? (<table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unAssignedDevice.map(device => (
                                    <tr key={device._id}>
                                        <td className="px-4 py-2 border-b capitalize">{device.name}</td>
                                        <td className="px-4 py-2 border-b capitalize">{device.type}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="bg-green-600 text-white p-2 rounded-lg"
                                                onClick={() => handleAssignDevice(device._id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>) : (<div className='w-full min-w-[50vw] flex flex-row justify-center items-center'>No UnAssigned Device found</div>)}
                    </div>
                </div>
            )}
            {viewingStaffs && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-blue-900 p-4 rounded-lg max-h-[90%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* <h2 className="text-lg font-bold mb-4">Edit Staff Account</h2> */}
                        <h2 className="text-lg font-bold mb-4 w-full flex justify-between items-center">Edit Staff Account
                            <span onClick={handleCloseModal} className='cursor-pointer'>X Close</span>
                        </h2>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map(staff => (
                                    <tr key={staff.email}>
                                        <td className="px-4 py-2 border-b">{staff.name}</td>
                                        <td className="px-4 py-2 border-b">{staff.email}</td>
                                        <td className="px-4 py-2 border-b">
                                            <button
                                                className="bg-green-600 text-white p-2 rounded-lg"
                                                onClick={() => handleAssignDeviceToStaffMain(staff._id)}
                                            >
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default SubAdminHome;

