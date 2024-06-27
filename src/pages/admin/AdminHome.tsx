import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { apiUrl } from '../../url';
import Notification from '../../components/Notification';

const AdminHome: React.FC = () => {
    const { darkMode } = useContext(ThemeContext);
    const [showOrgModal, setShowOrgModal] = useState(false);
    const [orgFormData, setOrgFormData] = useState({
        companyName: '',
        contactPersonName: '',
        email: '',
        location: '',
        phoneNumber: '',
        password: '',
    });
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")
    const [isErrorModal, setIsErrorModal] = useState(true)
    const [loadingOrg, setLoadingOrg] = useState(false);


    const showError = (message: string) => {
        setIsErrorModal(true)
        setNotificationOpen(true);
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationOpen(false);
        }, 3000);
    }

    const showSuccess = (message: string) => {
        setIsErrorModal(false)
        setNotificationOpen(true);
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationOpen(false);
        }, 3000);
    }

    const handleOrgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrgFormData({
            ...orgFormData,
            [e.target.name]: e.target.value,
        });
    };



    const handleOrgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingOrg(true);
        try {
            await axios.post(`${apiUrl}/organization/create`, orgFormData);
            setShowOrgModal(false);
            showSuccess("Organization created successfully");
        } catch (error) {
            console.error('Error creating organization:', error);
            if (axios.isAxiosError(error)) {
                if (error?.response?.data.message) showError(`${error?.response?.data?.message}`)
                else showError(`${error.message}`)
            }
        } finally {
            setLoadingOrg(false);
        }
    };

    /**
     * 
     *  useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/organizations`);
                setOrganizations(response.data.organizations);
                setTotalOrganizations(response.data.total);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        fetchOrganizations();
    }, []);
     */


    return (
        <>
            <Notification isShowing={isNotificationOpen} message={notificationMessage} error={isErrorModal} />
            <div className="w-full h-4 p-7 mt-4 flex items-center justify-between">
                <div className={`search ${darkMode && "text-black"} bg-white max-w-[25%] flex justify-start items-center gap-3 p-2 rounded-md`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="search" placeholder='Search Organization' className={`bg-transparent w-full focus:outline-none`} />
                </div>

                <div className="icons flex items-center justify-center gap-3">
                    <FontAwesomeIcon icon={faBell} />
                    <span>Admin Name</span>
                    <div className='flex justify-center items-center gap-2 cursor-pointer'>
                        <div className="w-8 h-8 rounded-[50%] bg-white"></div>
                        <FontAwesomeIcon icon={faSquareCaretDown} />
                    </div>
                </div>
            </div>
            <div className='welcomeToDash grid w-full px-5 my-8 gap-2'>
                <h2 className='text-xl font-bold'>Welcome to your Admin Dashboard</h2>
                <span>Manage your organizations, users, devices, and more</span>
                <button className='bg-blue-600 p-3 rounded-md cursor-pointer' onClick={() => setShowOrgModal(true)}>+ Add New Organization</button>
            </div>

            {/* Organizational Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Organizational Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg" onClick={() => setShowOrgModal(true)} disabled={loadingOrg}>Create New Organization</button>
                    {/*TODO Implement Remove and Edit functionalities */}
                </div>
            </div>

            {/* Maintenance Request Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Maintenance Request Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg" disabled={loadingOrg}>View Requests</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg" disabled={loadingOrg}>Edit Request</button>
                    <button className="bg-gray-600 text-white p-2 rounded-lg" disabled={loadingOrg}>Assign Technicians</button>
                </div>
            </div>

            {/* Finance Management Section */}
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-gray-300">Finance Management</h2>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <button className="bg-blue-600 text-white p-2 rounded-lg" disabled={loadingOrg}>View Invoices</button>
                    <button className="bg-green-600 text-white p-2 rounded-lg" disabled={loadingOrg}>Generate Reports</button>
                </div>
            </div>

            {/* Device Inventory Section */}
            <div className='bg-gray-800 rounded-md w-[97%] mx-auto p-5'>
                <h2 className='text-2xl font-bold'>Device Inventory</h2>
                <div className="w-full bg-white rounded-md">
                    <table className={`w-full ${darkMode && "bg-blue-900"} text-left border-collapse my-3`}>
                        <thead className='bg-gray-700 text-white'>
                            <tr>
                                <th className='p-3 border-b border-gray-600'>Device Name</th>
                                <th className='p-3 border-b border-gray-600'>Device ID</th>
                                <th className='p-3 border-b border-gray-600'>Category</th>
                                <th className='p-3 border-b border-gray-600'>IP Address</th>
                                <th className='p-3 border-b border-gray-600'>MAC Address</th>
                                <th className='p-3 border-b border-gray-600'>Device Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John's Laptop</td>
                                <td>12345678</td>
                                <td>Laptop</td>
                                <td>192.168.1.1</td>
                                <td>00:1A:2B:3C:4D:5E</td>
                                <td><span>Active</span></td>
                            </tr>
                            <tr>
                                <td>Mary's Desktop</td>
                                <td>87654321</td>
                                <td>Desktop</td>
                                <td>192.168.1.2</td>
                                <td>00:1A:2B:3C:4D:5F</td>
                                <td><span>Inactive</span></td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>

            {
                showOrgModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
                            <form onSubmit={handleOrgSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={orgFormData.companyName}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Contact Person Name</label>
                                    <input
                                        type="text"
                                        name="contactPersonName"
                                        value={orgFormData.contactPersonName}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={orgFormData.email}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={orgFormData.location}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={orgFormData.phoneNumber}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={orgFormData.password}
                                        onChange={handleOrgInputChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2" onClick={() => setShowOrgModal(false)} disabled={loadingOrg}>Cancel</button>
                                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" disabled={loadingOrg}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* {showUserModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create New User</h2>
                        <form onSubmit={handleUserSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userFormData.name}
                                    onChange={handleUserInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userFormData.email}
                                    onChange={handleUserInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={userFormData.phoneNumber}
                                    onChange={handleUserInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userFormData.password}
                                    onChange={handleUserInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2" onClick={() => setShowUserModal(false)} disabled={loadingUser}>Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" disabled={loadingUser}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </>
    );
}

export default AdminHome;


// import React, { useContext } from 'react';
// import { ThemeContext } from '../../ThemeContex';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faBell, faSquareCaretDown, faHardDrive, faCloudSun, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

// const AdminHome: React.FC = () => {
//     const { darkMode } = useContext(ThemeContext);
//     return (
//         <>
//             <div className="w-full h-4 p-7 mt-4 flex items-center justify-between">
//                 <div className={`search ${darkMode && "text-black"} bg-white max-w-[25%] flex justify-start items-center gap-3 p-2 rounded-md`}>
//                     <FontAwesomeIcon icon={faMagnifyingGlass} />
//                     <input type="search" placeholder='Search Organization' className={`bg-transparent w-full focus:outline-none`} />
//                 </div>

//                 <div className="icons flex items-center justify-center gap-3">
//                     <FontAwesomeIcon icon={faBell} />
//                     <span>Admin Name</span>
//                     <div className='flex justify-center items-center gap-2 cursor-pointer'> 
//                         <div className="w-8 h-8 rounded-[50%] bg-white"></div> 
//                         <FontAwesomeIcon icon={faSquareCaretDown} />
//                     </div>
//                 </div>
//             </div>
//             <div className='welcomeToDash grid w-full px-5 my-8 gap-2'>
//                 <h2 className='text-xl font-bold'>Welcome to your Admin Dashboard</h2>
//                 <span>Manage your organizations, users, devices, and more</span>
//                 <button className='bg-blue-600 p-3 rounded-md cursor-pointer'>+ Add New Organization</button>
//             </div>

//             {/* Organizational Management Section */}
//             <div className="p-4 space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-300">Organizational Management</h2>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
//                     <button className="bg-blue-600 text-white p-2 rounded-lg">Create New Organization</button>
//                     <button className="bg-gray-600 text-white p-2 rounded-lg">Remove Organization</button>
//                     <button className="bg-green-600 text-white p-2 rounded-lg">Edit Organization</button>
//                 </div>
//             </div>

//             {/* User Management Section */}
//             <div className="p-4 space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-300">User Management</h2>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
//                     <button className="bg-blue-600 text-white p-2 rounded-lg">Create New User</button>
//                     <button className="bg-gray-600 text-white p-2 rounded-lg">Remove User</button>
//                     <button className="bg-green-600 text-white p-2 rounded-lg">Edit User</button>
//                 </div>
//             </div>

//             {/* Device Management Section */}
//             <div className="p-4 space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-300">Device Management</h2>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
//                     <button className="bg-blue-600 text-white p-2 rounded-lg">Add New Device</button>
//                     <button className="bg-green-600 text-white p-2 rounded-lg">Edit Device</button>
//                     <button className="bg-gray-600 text-white p-2 rounded-lg">Assign Devices</button>
//                 </div>
//             </div>

//             {/* Maintenance Request Management Section */}
//             <div className="p-4 space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-300">Maintenance Request Management</h2>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
//                     <button className="bg-blue-600 text-white p-2 rounded-lg">View Requests</button>
//                     <button className="bg-green-600 text-white p-2 rounded-lg">Edit Request</button>
//                     <button className="bg-gray-600 text-white p-2 rounded-lg">Assign Technicians</button>
//                 </div>
//             </div>

//             {/* Finance Management Section */}
//             <div className="p-4 space-y-4">
//                 <h2 className="text-xl font-semibold text-gray-300">Finance Management</h2>
//                 <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
//                     <button className="bg-blue-600 text-white p-2 rounded-lg">View Transactions</button>
//                     <button className="bg-green-600 text-white p-2 rounded-lg">Handle Claims</button>
//                 </div>
//             </div>

//             {/* Reporting and Analytics Section */}
//             <div className='p-5'>
//                 <h2 className="text-2xl font-bold my-2">Reporting and Analytics</h2>
//                 <div className='flex items-center justify-center gap-3'>
//                     <div className="w-[25%] aspect-9-5 bg-blue-500 rounded-md flex flex-col items-start p-5 gap-1">
//                         <FontAwesomeIcon icon={faHardDrive} size='2x' className='mb-2' />
//                         <span className='mt-auto'>5</span>
//                         <span>All Devices</span>
//                     </div>
//                     <div className="w-[25%] aspect-9-5 bg-red-500 rounded-md flex flex-col items-start p-5 gap-1">
//                         <FontAwesomeIcon icon={faCloudSun} size='2x' className='mb-2' />
//                         <span className='mt-auto'>3</span>
//                         <span>Devices at Risk</span>
//                     </div>
//                     <div className="w-[25%] aspect-9-5 bg-green-500 rounded-md flex flex-col items-start p-5 gap-1">
//                         <FontAwesomeIcon icon={faHourglassHalf} size='2x' className='mb-2' />
//                         <span className='my-auto'>2</span>
//                         <span>Users</span>
//                     </div>
//                     <div className={`w-[25%] aspect-9-5 bg-blue-100 text-gray-800 rounded-md flex flex-col items-start p-5 gap-1 ${darkMode && 'text-black'}`}>
//                         <div className='flex flex-row justify-between items-center gap-2'><span>Device Reports</span> <span>This Week</span></div>
//                     </div>
//                 </div>
//             </div>

//             {/* Device Inventory Section */}
//             <div className='bg-gray-800 rounded-md w-[97%] mx-auto p-5'>
//                 <h2 className='text-2xl font-bold'>Device Inventory</h2>
//                 <div className="w-full bg-white rounded-md">
//                     <table className={`w-full ${darkMode && "bg-blue-900"} text-left border-collapse my-3`}>
//                         <thead className='bg-gray-700 text-white'>
//                             <tr>
//                                 <th className='p-3 border-b border-gray-600'>Device Name</th>
//                                 <th className='p-3 border-b border-gray-600'>Device ID</th>
//                                 <th className='p-3 border-b border-gray-600'>Category</th>
//                                 <th className='p-3 border-b border-gray-600'>IP Address</th>
//                                 <th className='p-3 border-b border-gray-600'>MAC Address</th>
//                                 <th className='p-3 border-b border-gray-600'>Device Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>John's Laptop</td>
//                                 <td>12345678</td>
//                                 <td>Laptop</td>
//                                 <td>192.168.1.1</td>
//                                 <td>00:1A:2B:3C:4D:5E</td>
//                                 <td><span>Active</span></td>
//                             </tr>
//                             <tr>
//                                 <td>Mary's Desktop</td>
//                                 <td>87654321</td>
//                                 <td>Desktop</td>
//                                 <td>192.168.1.2</td>
//                                 <td>00:1A:2B:3C:4D:5F</td>
//                                 <td><span>Inactive</span></td>
//                             </tr>
//                             {/* Add more rows as needed */}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AdminHome;
