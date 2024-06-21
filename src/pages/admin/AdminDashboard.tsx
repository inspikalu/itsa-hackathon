import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../ThemeContex'


const AdminDashboard: React.FC = function () {
    const { darkMode,  } = useContext(ThemeContext)
    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} w-full h-[100vh] flex flex-row justify-center items-center`}>
            <div className="h-full w-[30%]"></div>
            <div className="h-full w-[70%]"></div>
        </div>
    )
}

export default AdminDashboard
