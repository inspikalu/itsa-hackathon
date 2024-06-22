import React, { useState } from 'react';

const StaffSettings: React.FC = function () {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      {/* Header */}
      <header className="bg-blue-950 shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">Account Settings</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
          <div className="p-6 bg-gray-800 border-b border-gray-700">
            {/* Account Information Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Account Information</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-48 flex-shrink-0">
                  {/* Profile Picture */}
                  <div className="w-48 h-48 bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-white">JD</span>
                  </div>
                </div>
                <div className="flex-1">
                  {/* User Info */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input-field bg-gray-700 text-gray-200 border-gray-600 rounded-md w-full p-2"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input-field bg-gray-700 text-gray-200 border-gray-600 rounded-md w-full p-2"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Phone Number:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="input-field bg-gray-700 text-gray-200 border-gray-600 rounded-md w-full p-2"
                      placeholder="Enter phone number"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <button
                    className={`btn-primary py-2 px-4 rounded-md transition ${isEditing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
                    onClick={toggleEditing}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Details'}
                  </button>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="emailNotifications" className="h-4 w-4 text-blue-600 border-gray-600 rounded mr-2" />
                  <label htmlFor="emailNotifications" className="text-sm text-gray-400">Receive notifications via email</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="textNotifications" className="h-4 w-4 text-blue-600 border-gray-600 rounded mr-2" />
                  <label htmlFor="textNotifications" className="text-sm text-gray-400">Receive notifications via text message</label>
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Privacy</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <label htmlFor="privacySettings" className="text-sm text-gray-400 mr-2">Who can see my contact information:</label>
                  <select id="privacySettings" className="select-field bg-gray-700 text-gray-200 border-gray-600 rounded-md p-2">
                    <option value="everyone">Everyone</option>
                    <option value="team">Team members only</option>
                    <option value="none">Only me</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="locationPrivacy" className="h-4 w-4 text-blue-600 border-gray-600 rounded mr-2" />
                  <label htmlFor="locationPrivacy" className="text-sm text-gray-400">Yes, share my location</label>
                </div>
              </div>
            </section>

            

            {/* Device Management Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Device Management</h2>
              <p className="text-sm text-gray-400">No devices assigned currently.</p>
            </section>

            {/* Security Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Security</h2>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="twoFactorAuth" className="h-4 w-4 text-blue-600 border-gray-600 rounded mr-2" />
                <label htmlFor="twoFactorAuth" className="text-sm text-gray-400">Enable two-factor authentication</label>
              </div>
              <button className="btn-primary bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Save Changes</button>
            </section>

            {/* Logout Section */}
            <section>
              <button className="btn-danger bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">Logout</button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffSettings;
