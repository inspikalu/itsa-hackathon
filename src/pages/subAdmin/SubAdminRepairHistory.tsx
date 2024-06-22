import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SubAdminRepairHistory: React.FC = function () {
  const { darkMode } = useContext(ThemeContext);

  const [repairs, setRepairs] = useState([
    { deviceId: '1212121', staffName: 'Okereke Clement', dateReported: '20th June 2015', issue: 'Broken Screen', technician: 'Technique James', status: 'Closed', priority: 'medium' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    { deviceId: '1212122', staffName: 'John Doe', dateReported: '15th June 2015', issue: 'Battery Issue', technician: 'Technique Jane', status: 'In Progress', priority: 'high' },
    // Add more repair records as needed
  ]);

  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredRepairs = repairs.filter(repair => {
    return (
      (repair.deviceId.includes(searchTerm) || repair.staffName.toLowerCase().includes(searchTerm.toLowerCase()) || repair.issue.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || repair.status === statusFilter)
    );
  });

  const openRepairDetails = (repair: any) => {
    setSelectedRepair(repair);
  };

  const closeRepairDetails = () => {
    setSelectedRepair(null);
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

      <table className={`w-full ${darkMode ? "bg-blue-900" : ""} text-left border-collapse my-3`}>
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
      </table>

      {/* Repair Details Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Repair Details</h2>
            <p className="text-gray-400"><strong>Device ID:</strong> {selectedRepair.deviceId}</p>
            <p className="text-gray-400"><strong>Staff Name:</strong> {selectedRepair.staffName}</p>
            <p className="text-gray-400"><strong>Date Reported:</strong> {selectedRepair.dateReported}</p>
            <p className="text-gray-400"><strong>Issue:</strong> {selectedRepair.issue}</p>
            <p className="text-gray-400"><strong>Technician:</strong> {selectedRepair.technician}</p>
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