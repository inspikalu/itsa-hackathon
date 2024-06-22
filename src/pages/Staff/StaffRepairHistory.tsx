import React, { useState } from 'react';

const StaffRepairHistory: React.FC = () => {
 /**
  * 
  *  const [repairs, setRepairs] = useState([
    { date: '2024-06-01', device: 'Laptop', issue: 'Screen flickering', status: 'Fixed' },
    { date: '2024-05-15', device: 'Printer', issue: 'Paper jam', status: 'Pending' },
    // Add more repair records as needed
  ]);
  */

  const [repairs] = useState([
    { date: '2024-06-01', device: 'Laptop', issue: 'Screen flickering', status: 'Fixed' },
    { date: '2024-05-15', device: 'Printer', issue: 'Paper jam', status: 'Pending' },
    // Add more repair records as needed
  ]);

  const [selectedRepair, setSelectedRepair] = useState<any>(null);

  const openRepairDetails = (repair: any) => {
    setSelectedRepair(repair);
  };

  const closeRepairDetails = () => {
    setSelectedRepair(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      {/* Header */}
      <header className="bg-blue-950 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">Repair History</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg p-6">
          {/* Filters */}
          <div className="mb-4 flex justify-between">
            <input
              type="text"
              placeholder="Search by device or issue..."
              className="bg-gray-700 text-gray-200 border-gray-600 rounded-md p-2 mr-4 w-1/3"
            />
            <select className="bg-gray-700 text-gray-200 border-gray-600 rounded-md p-2">
              <option value="">Filter by status</option>
              <option value="Fixed">Fixed</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Repair History List */}
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 border-b border-gray-700 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-b border-gray-700"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {repairs.map((repair, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{repair.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{repair.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{repair.issue}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${repair.status === 'Fixed' ? 'text-green-400' : repair.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {repair.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                <p className="text-gray-400"><strong>Date:</strong> {selectedRepair.date}</p>
                <p className="text-gray-400"><strong>Device:</strong> {selectedRepair.device}</p>
                <p className="text-gray-400"><strong>Issue:</strong> {selectedRepair.issue}</p>
                <p className="text-gray-400"><strong>Status:</strong> {selectedRepair.status}</p>
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
      </div>
    </div>
  );
};

export default StaffRepairHistory;
