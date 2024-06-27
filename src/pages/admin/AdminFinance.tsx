import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckAlt, faFileInvoiceDollar, faReceipt } from '@fortawesome/free-solid-svg-icons';

const AdminFinance: React.FC = () => {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`finance-page p-5 ${darkMode ? 'text-white' : 'text-black'}`}>
            <h2 className="text-2xl font-bold mb-5">Finance Management</h2>

            {/* Transactions Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Transactions</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} size="lg" />
                        <span>View Transactions</span>
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-lg">View</button>
                </div>
            </div>

{/* Claims Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Insurance Claims</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
                        <span>Handle Claims</span>
                    </div>
                    <button className="bg-green-600 text-white p-2 rounded-lg">Handle</button>
                </div>
            </div>

            {/* Reports Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Financial Reports</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faReceipt} size="lg" />
                        <span>View Reports</span>
                    </div>
                    <button className="bg-red-600 text-white p-2 rounded-lg">View</button>
                </div>
            </div>

            {/* Dummy Financial Data */}
            <div className="bg-gray-800 rounded-md w-[97%] mx-auto p-5 mt-5">
                <h3 className="text-2xl font-bold">Recent Transactions</h3>
                <div className="w-full bg-white rounded-md mt-3">
                    <table className={`w-full ${darkMode && "bg-blue-900"} text-left border-collapse my-3`}>
                        <thead className='bg-gray-700 text-white'>
                            <tr>
                                <th className='p-3 border-b border-gray-600'>Transaction ID</th>
                                <th className='p-3 border-b border-gray-600'>Date</th>
                                <th className='p-3 border-b border-gray-600'>Amount</th>
                                <th className='p-3 border-b border-gray-600'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TRX123456</td>
                                <td>2023-06-25</td>
                                <td>$200.00</td>
                                <td><span className="text-green-500">Completed</span></td>
                            </tr>
                            <tr>
                                <td>TRX654321</td>
                                <td>2023-06-24</td>
                                <td>$450.00</td>
                                <td><span className="text-yellow-500">Pending</span></td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default AdminFinance;
