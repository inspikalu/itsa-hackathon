import React, { useState, useContext, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { ThemeContext } from '../../ThemeContex';
import axios from 'axios';
import { apiUrl } from '../../url';

interface Organization {
  _id: string;
  name: string;
  subAdmin: string;
  staffCount: number;
}

const AdminManageOrg: React.FC = function() {
  const { darkMode } = useContext(ThemeContext);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [newOrgName, setNewOrgName] = useState('');
  const [newSubAdmin, setNewSubAdmin] = useState('');
  const [newStaffCount, setNewStaffCount] = useState<number | string>('');
  // const [totalOrganizations, setTotalOrganizations] = useState(0);
  const [, setTotalOrganizations] = useState(0);

  useEffect(() => {
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

  const openAddModal = () => {
    setCurrentOrg(null);
    setNewOrgName('');
    setNewSubAdmin('');
    setNewStaffCount('');
    setIsModalOpen(true);
  };

  const openEditModal = (org: Organization) => {
    setCurrentOrg(org);
    setNewOrgName(org.name);
    setNewSubAdmin(org.subAdmin);
    setNewStaffCount(org.staffCount);
    setIsModalOpen(true);
  };

  const openViewModal = (org: Organization) => {
    setCurrentOrg(org);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (!newOrgName || !newSubAdmin || !newStaffCount) {
      alert('All fields are required');
      return;
    }

    const updatedOrganizations = currentOrg
      ? organizations.map(org => org._id === currentOrg._id ? { ...org, name: newOrgName, subAdmin: newSubAdmin, staffCount: Number(newStaffCount) } : org)
      : [...organizations, { _id: `${organizations.length + 1}`, name: newOrgName, subAdmin: newSubAdmin, staffCount: Number(newStaffCount) }];

    setOrganizations(updatedOrganizations);
    setIsModalOpen(false);
    setNewOrgName('');
    setNewSubAdmin('');
    setNewStaffCount('');
  };

  const handleDelete = (id: string) => {
    setOrganizations(organizations.filter(org => org._id !== id));
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Organization</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Organization
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search organization..."
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>

      {/* Organization List */}
      {organizations.length === 0 ? (
        <div className="w-full text-center text-gray-500">
          No organizations found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? "bg-blue-900" : ""} text-left border-collapse my-3`}>
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3 border-b border-gray-600">Organization Name</th>
                <th className="p-3 border-b border-gray-600">Sub-Admin Name</th>
                <th className="p-3 border-b border-gray-600">Number of Staff</th>
                <th className="p-3 border-b border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org._id}>
                  <td className="px-4 py-2 border-b">{org.name}</td>
                  <td className="px-4 py-2 border-b">{org.subAdmin}</td>
                  <td className="px-4 py-2 border-b text-center">{org.staffCount}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button className="text-blue-500 mr-2" onClick={() => openEditModal(org)}><FaEdit /></button>
                    <button className="text-red-500 mr-2" onClick={() => handleDelete(org._id)}><FaTrash /></button>
                    <button className="text-green-500" onClick={() => openViewModal(org)}><FaEye /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
        <span>Page 1 of X</span>
        <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
      </div>

      {/* Modal for Adding/Editing Organization */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">{currentOrg ? 'Edit' : 'Add'} Organization</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Organization Name</label>
                <input
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sub-Admin Name</label>
                <input
                  type="text"
                  value={newSubAdmin}
                  onChange={(e) => setNewSubAdmin(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Number of Staff</label>
                <input
                  type="number"
                  value={newStaffCount}
                  onChange={(e) => setNewStaffCount(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Viewing Organization */}
      {isViewModalOpen && currentOrg && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Organization Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Organization Name:</label>
              <p>{currentOrg.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Sub-Admin Name:</label>
              <p>{currentOrg.subAdmin}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Staff:</label>
              <p>{currentOrg.staffCount}</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageOrg;


// import React, { useState, useContext, useEffect } from 'react';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import { ThemeContext } from '../../ThemeContex';
// import axios  from 'axios'
// import { apiUrl } from '../../url';

// interface Organization {
//   id: number;
//   name: string;
//   subAdmin: string;
//   staffCount: number;
// }

// const AdminManageOrg: React.FC = function() {
//   const {darkMode} = useContext(ThemeContext)
//   const [organizations, setOrganizations] = useState<any[]>();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
//   const [newOrgName, setNewOrgName] = useState('');
//   const [newSubAdmin, setNewSubAdmin] = useState('');
//   const [newStaffCount, setNewStaffCount] = useState<number | string>('');
//   const [totalOrganizations, setTotalOrganizations] = useState('')

//   console.log(totalOrganizations)

//       useEffect(() => {
//         const fetchOrganizations = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/admin/organizations`);
//                 setOrganizations(response.data.organizations);
//                 setTotalOrganizations(response.data.total);
//             } catch (error) {
//                 console.error('Error fetching organizations:', error);
//             }
//         };

//         fetchOrganizations();
//     }, []);

//   const openAddModal = () => {
//     setCurrentOrg(null);
//     setNewOrgName('');
//     setNewSubAdmin('');
//     setNewStaffCount('');
//     setIsModalOpen(true);
//   };

//   const openEditModal = (org: Organization) => {
//     setCurrentOrg(org);
//     setNewOrgName(org.name);
//     setNewSubAdmin(org.subAdmin);
//     setNewStaffCount(org.staffCount);
//     setIsModalOpen(true);
//   };

//   const openViewModal = (org: Organization) => {
//     setCurrentOrg(org);
//     setIsViewModalOpen(true);
//   };

//   const handleSave = () => {
//     if (!newOrgName || !newSubAdmin || !newStaffCount) {
//       alert('All fields are required');
//       return;
//     }

//     const updatedOrganizations = currentOrg
//       ? organizations.map(org => org.id === currentOrg.id ? { ...org, name: newOrgName, subAdmin: newSubAdmin, staffCount: Number(newStaffCount) } : org)
//       : [...organizations, { id: organizations.length + 1, name: newOrgName, subAdmin: newSubAdmin, staffCount: Number(newStaffCount) }];

//     setOrganizations(updatedOrganizations);
//     setIsModalOpen(false);
//     setNewOrgName('');
//     setNewSubAdmin('');
//     setNewStaffCount('');
//   };

//   const handleDelete = (id: number) => {
//     setOrganizations(organizations.filter(org => org.id !== id));
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Organization</h1>
//         <button
//           onClick={openAddModal}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Organization
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search organization..."
//           className="border border-gray-300 p-2 w-full rounded"
//         />
//       </div>

//       {/* Organization List */}
//       <div className="overflow-x-auto">
//       <table className={`w-full ${darkMode ? "bg-blue-900" : ""} text-left border-collapse my-3`}>
//       <thead className="bg-gray-700 text-white">
//             <tr>
//               <th className="p-3 border-b border-gray-600">Organization Name</th>
//               <th className="p-3 border-b border-gray-600">Sub-Admin Name</th>
//               <th className="p-3 border-b border-gray-600">Number of Staff</th>
//               <th className="p-3 border-b border-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {organizations.map((org) => (
//               <tr key={org.id}>
//                 <td className="px-4 py-2 border-b">{org.name}</td>
//                 <td className="px-4 py-2 border-b">{org.subAdmin}</td>
//                 <td className="px-4 py-2 border-b text-center">{org.staffCount}</td>
//                 <td className="px-4 py-2 border-b text-center">
//                   <button className="text-blue-500 mr-2" onClick={() => openEditModal(org)}><FaEdit /></button>
//                   <button className="text-red-500 mr-2" onClick={() => handleDelete(org.id)}><FaTrash /></button>
//                   <button className="text-green-500" onClick={() => openViewModal(org)}><FaEye /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button className="px-4 py-2 bg-gray-200 rounded">Previous</button>
//         <span>Page 1 of X</span>
//         <button className="px-4 py-2 bg-gray-200 rounded">Next</button>
//       </div>

//       {/* Modal for Adding/Editing Organization */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl font-bold mb-4">{currentOrg ? 'Edit' : 'Add'} Organization</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Organization Name</label>
//                 <input
//                   type="text"
//                   value={newOrgName}
//                   onChange={(e) => setNewOrgName(e.target.value)}
//                   className="border border-gray-300 p-2 w-full rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Sub-Admin Name</label>
//                 <input
//                   type="text"
//                   value={newSubAdmin}
//                   onChange={(e) => setNewSubAdmin(e.target.value)}
//                   className="border border-gray-300 p-2 w-full rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Number of Staff</label>
//                 <input
//                   type="number"
//                   value={newStaffCount}
//                   onChange={(e) => setNewStaffCount(e.target.value)}
//                   className="border border-gray-300 p-2 w-full rounded"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleSave}
//                   className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal for Viewing Organization */}
//       {isViewModalOpen && currentOrg && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Organization Details</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700">Organization Name:</label>
//               <p>{currentOrg.name}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Sub-Admin Name:</label>
//               <p>{currentOrg.subAdmin}</p>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Number of Staff:</label>
//               <p>{currentOrg.staffCount}</p>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminManageOrg
