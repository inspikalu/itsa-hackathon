import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const AdminManageTechnicians: React.FC = () => {
  const {darkMode} = useContext(ThemeContext)
  const [technicians, setTechnicians] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Available' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Busy' }
  ])

  const handleEdit = (id: number) => {
    console.log(id)
  }

  const handleDelete = (id: number) => {
    setTechnicians(technicians.filter(tech => tech.id !== id))
  }

  const handleAdd = () => {
  }

  return (
    <>

    <div className="p-4">
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Organization</h1>
        <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Technician
      </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search technicians..."
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
     
      <div className="overflow-x-auto">
      <table className={`w-full ${darkMode ? "bg-blue-900" : ""} text-left border-collapse my-3`}>
      <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 border-b border-gray-600">Name</th>
              <th className="p-3 border-b border-gray-600">Email</th>
              <th className="p-3 border-b border-gray-600">Status</th>
              <th className="p-3 border-b border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(tech => (
              <tr key={tech.id}>
                <td className="py-2 px-4 border-b">{tech.name}</td>
                <td className="py-2 px-4 border-b">{tech.email}</td>
                <td className="py-2 px-4 border-b">{tech.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(tech.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(tech.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default AdminManageTechnicians
