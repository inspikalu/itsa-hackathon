import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiUrl } from "../../url";
import { useNavigate } from 'react-router-dom';

enum Days{
  "Monday" = 1,
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
}

enum Months{
  "Janruary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}

const SubAdminRepairHistory: React.FC = function () {
  const { darkMode } = useContext(ThemeContext);


  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationShowing, setIsNotificationShowing] = useState(false);
  const [isErrorPopover, setIsErrorPopover] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [requestList, setRequestList] = useState<any[]>([])

  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null);
  const [orgId, setOrgId] = useState("");

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Full name of the day of the week
    day: 'numeric',  // Day of the month as a numeric value
    month: 'long',   // Full name of the month
  };

  // Format the date according to the options
  const dateFormatter = new Intl.DateTimeFormat('en-GB', options);
  const fetchRequestListforEdit = async function () {
    try {
      const response = await axios.get(`${apiUrl}/subadmin/requests`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
  
      setIsErrorPopover(false);
      showPopover(`${response.data.message}`);
  
      // Convert dateReported strings to Date objects
      const requests = response.data.requests.map((request: any) => ({
        ...request,
        dateReported: new Date(request.timeRequested)
      }));

      console.log(requests, "In Requests")
  
      setRequestList(requests);
    } catch (error) {
      setIsErrorPopover(true);
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        await showPopover("Failed to fetch request List");
        showPopover(error.response?.data?.message)
      }
    }
  }
  

  const formatThatDate = function (dateString: string ){
      const dateValue = new Date(dateString)

     return `${Days[dateValue.getDay()]}, ${dateValue.getDate()} ${Months[dateValue.getMonth()]}, ${dateValue.getFullYear()}`
  }

  React.useEffect(() => {
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
  }, [navigate])

  React.useEffect(() => {
    fetchRequestListforEdit()
  }, [navigate, token])

  console.log(requestList, "Request List")

  // const filteredRepairs = requestList.filter(repair => {
  //   return (
  //     (repair.deviceId.includes(searchTerm) || repair.staffName.toLowerCase().includes(searchTerm.toLowerCase()) || repair.issue.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (statusFilter === "" || repair.status === statusFilter)
  //   );
  // });

  const filteredRepairs = requestList.filter(repair => {
    return (
      (repair.description.includes(searchTerm) || repair.priority.toLowerCase().includes(searchTerm.toLowerCase()) || repair.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || repair.status === statusFilter)
    );
  });

  const openRepairDetails = (repair: any) => {
    setSelectedRepair(repair);
  };

  const closeRepairDetails = () => {
    setSelectedRepair(null);
  };

  const showPopover = (message: string) => {
    setIsNotificationShowing(true);
    setNotificationMessage(message);
    setTimeout(() => {
      setIsNotificationShowing(false);
    }, 3000);
  };



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Repairs and Management History</h2>

      <div className={`search ${darkMode ? "text-black" : ""} bg-white max-w-[25%] flex justify-start items-center gap-3 p-3 rounded-md my-3`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="search"
          placeholder="Search Request"
          className="bg-transparent w-full focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-end my-3">
        <select
          className="bg-white text-black p-2 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by status</option>
          <option value="Submitted">Submitted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* <table className={`w-full ${darkMode ? "bg-blue-900" : ""} text-left border-collapse my-3`}>
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-3 border-b border-gray-600">Device ID</th>
            <th className="p-3 border-b border-gray-600">Staff Name</th>
            <th className="p-3 border-b border-gray-600">Date Reported</th>
            <th className="p-3 border-b border-gray-600">Issue/Problem Description</th>
            <th className="p-3 border-b border-gray-600">Technician Assigned</th>
            <th className="p-3 border-b border-gray-600">Status</th>
            <th className="p-3 border-b border-gray-600">Priority Level</th>
            <th className="p-3 border-b border-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {filteredRepairs.map((repair, index) => (
            <tr key={index} className="bg-gray-800 text-gray-200">
              <td className="p-3 border-b border-gray-600">{repair.deviceId}</td>
              <td className="p-3 border-b border-gray-600">{repair.staffName}</td>
              <td className="p-3 border-b border-gray-600">{repair.dateReported}</td>
              <td className="p-3 border-b border-gray-600">{repair.issue}</td>
              <td className="p-3 border-b border-gray-600">{repair.technician}</td>
              <td className={`p-3 border-b border-gray-600 ${repair.status === 'Closed' ? 'text-green-400' : repair.status === 'In Progress' ? 'text-yellow-400' : 'text-red-400'}`}>
                {repair.status}
              </td>
              <td className="p-3 border-b border-gray-600">{repair.priority}</td>
              <td className="p-3 border-b border-gray-600 text-right">
                <button
                  onClick={() => openRepairDetails(repair)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="overflow-x-auto">
       {requestList.length> 0?( <table className="w-full bg-gray-800">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date Reported</th>
              <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Is Urgent</th>
              <th className="px-6 py-3 border-b border-gray-700"></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredRepairs.map((staff, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.priority}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{dateFormatter.format(staff.timeRequested)}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{formatThatDate(staff.timeRequested)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{staff.isUrgent ? "True" : "False"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openRepairDetails(staff)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>):(
          <div className="w-full flex justify-center items-center"> No Request Found</div>
        )}
      </div>
      {/* Repair Details Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Repair Details</h2>
            <p className="text-gray-400"><strong>Request Id:</strong> {selectedRepair.requestId}</p>
            {/* <p className="text-gray-400"><strong>Staff Name:</strong> {selectedRepair.staffName}</p> */}
            <p className="text-gray-400"><strong>Date Reported:</strong> {selectedRepair.timeRequested}</p>
            <p className="text-gray-400"><strong>Issue:</strong> {selectedRepair.description}</p>
            {/* <p className="text-gray-400"><strong>Technician:</strong> {selectedRepair.technician}</p> */}
            <p className="text-gray-400"><strong>Status:</strong> {selectedRepair.status}</p>
            <p className="text-gray-400"><strong>Priority:</strong> {selectedRepair.priority}</p>
            <button
              onClick={closeRepairDetails}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdminRepairHistory;

// Status (e.g., Submitted, In progress, Resolved, Closed)
// TODO add a place where users can filter