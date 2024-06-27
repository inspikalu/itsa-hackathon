import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserShield, faLock } from '@fortawesome/free-solid-svg-icons';

const AdminSettings: React.FC = function() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className={`settings-page p-5 ${darkMode ? 'text-white' : 'text-black'}`}>
            <h2 className="text-2xl font-bold mb-5">Settings</h2>

            {/* Notification Settings Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Notification Settings</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faBell} size="lg" />
                        <span>Email Notifications</span>
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-lg">Enable</button>
                </div>
            </div>

            {/* Security Settings Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Security Settings</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faLock} size="lg" />
                        <span>Two-Factor Authentication</span>
                    </div>
                    <button className="bg-green-600 text-white p-2 rounded-lg">Enable</button>
                </div>
            </div>

            {/* Admin Access Control Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-xl font-semibold">Admin Access Control</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow flex space-x-2">
                    <div className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faUserShield} size="lg" />
                        <span>Manage Admin Roles</span>
                    </div>
                    <button className="bg-red-600 text-white p-2 rounded-lg">Manage</button>
                </div>
            </div>
        </div>
    );
}

export default AdminSettings
