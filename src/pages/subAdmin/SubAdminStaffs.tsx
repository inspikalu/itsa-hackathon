import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { apiUrl } from '../../url';
import Notification from '../../components/Notification';

const SubAdminStaffs: React.FC = function () {

  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null);
  // const [orgId, setOrgId] = useState("");
  const [, setOrgId] = useState("");
  const [staffList, setStaffList] = useState<any[]>([])
  const [isErrorPopover, setIsErrorPopover] = useState(true)
  const [isNotificationShowing, setIsNotificationShowing] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const openStaffDetails = (staff: any) => {
    setSelectedStaff(staff);
  };

  const showPopover = (message: string) => {
    setIsNotificationShowing(true);
    setNotificationMessage(message);
    setTimeout(() => {
      setIsNotificationShowing(false);
    }, 3000);
  };

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
  }, [navigate]);

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
    } catch (error) {
      setIsErrorPopover(true);
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        await showPopover("Failed to fetch staff list");
        showPopover(error.response?.data?.message)
      }
    }
  };

  useEffect(() => {
    fetchStaffList()
  }, [token, navigate])

  const closeStaffDetails = () => {
    setSelectedStaff(null);
  };

  console.log(staffList)
  return (
    <>
      <Notification message={notificationMessage} isShowing={isNotificationShowing} error={isErrorPopover} />
      <div className="bg-gray-900 min-h-screen text-gray-300">
        <header className="bg-blue-950 shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-white">Staffs</h1>
          </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg p-6">
            <div className="mb-4 flex justify-between">
              <input
                type="text"
                placeholder="Search staff..."
                className="bg-gray-700 text-gray-200 border-gray-600 rounded-md p-2 mr-4 w-full sm:w-1/3"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Devices</th>
                    <th className="px-6 py-3 border-b border-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {staffList.map((staff, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.devices.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openStaffDetails(staff)}
                          className="text-blue-400 hover:text-blue-600"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedStaff && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold mb-4 text-white">Staff Details</h2>
                  <p className="text-gray-400"><strong>Name:</strong> {selectedStaff.name}</p>
                  <p className="text-gray-400"><strong>Email:</strong> {selectedStaff.email}</p>
                  <p className="text-gray-400"><strong>Devices:</strong> {selectedStaff.devices.length}</p>
                  <button
                    onClick={closeStaffDetails}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SubAdminStaffs
