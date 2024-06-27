import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubAdminSettings: React.FC = function () {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false);
  const [editCompanyMode, setEditCompanyMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const toggleEditCompanyMode = () => {
    setEditCompanyMode(!editCompanyMode)
  }


  const [token, setToken] = useState<string | null>(null);
  const [orgId, setOrgId] = useState("");
  console.log(token, orgId)
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

  // Profile Management section
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically make an API call to update the profile information
    // For demonstration, we'll log the updated values and update state directly
    console.log('Profile updated:', name, email);
    setEditMode(false); // Exit edit mode after saving (you might adjust this based on your UI/UX flow)
  };

  // Organization Management section (assuming limited organization management for Sub Admin)
  const [organizationName, setOrganizationName] = useState('My Company');

  const handleOrganizationUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically make an API call to update the organization information
    // For demonstration, we'll log the updated value and update state directly
    console.log('Organization name updated:', organizationName);
    setEditMode(false); // Exit edit mode after saving (you might adjust this based on your UI/UX flow)
  };

  // Notification Preferences section
  const [receiveMaintenanceNotifications, setReceiveMaintenanceNotifications] = useState(true);

  const handleNotificationPreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiveMaintenanceNotifications(event.target.checked);
  };

  return (
    <div className="subadmin-settings  p-6">
      <h2 className="text-2xl mb-4">Settings</h2>

      {/* Profile Management */}
      <div className="setting-section bg-blue-950 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg mb-2">Profile</h3>
        {editMode ? (
          <form onSubmit={handleProfileUpdate}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-2">Name: {name}</p>
            <p className="mb-2">Email: {email}</p>
            <button
              onClick={toggleEditMode}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Organization Management (limited) */}
      <div className="setting-section bg-blue-950 rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg mb-2">Organization</h3>
        {!editCompanyMode && (<><p className="mb-2">Name: {organizationName}</p>
          <button
            onClick={() => setEditCompanyMode(!editCompanyMode)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Name
          </button> </>)
        }
        {editCompanyMode && (
          <form onSubmit={handleOrganizationUpdate} className="mt-4">
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name:</label>
            <input
              type="text"
              id="organizationName"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="flex space-x-4 mt-2">
              <button
                type="submit"
                onClick={toggleEditCompanyMode}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditCompanyMode}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="setting-section bg-blue-950 rounded-lg shadow-md p-4">
        <h3 className="text-lg mb-2">Notification Preferences</h3>
        <div className="preference">
          <label htmlFor="receiveMaintenanceNotifications" className="flex items-center">
            <input
              type="checkbox"
              id="receiveMaintenanceNotifications"
              checked={receiveMaintenanceNotifications}
              onChange={handleNotificationPreferenceChange}
              className="rounded h-4 w-4 mr-2"
            />
            <span className="text-sm">Receive maintenance request notifications</span>
          </label>
        </div>
      </div>
      <button className="p-3 rounded-md bg-red-600 my-4" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); navigate('/') }}>Log out</button>
    </div>
  );
};

export default SubAdminSettings;
