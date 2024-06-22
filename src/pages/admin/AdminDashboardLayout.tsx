import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartSimple, faClipboard, faGear } from '@fortawesome/free-solid-svg-icons';

import AdminHome from './AdminHome';
import AdminManageOrg from './AdminManageOrg';
import AdminManageTechnicians from './AdminManageTechnicians';
import AdminFinance from './AdminFinance';
import AdminSettings from './AdminSettings';


const AdminDashboardLayout: React.FC = function () {

  const location = useLocation()
  const { darkMode } = useContext(ThemeContext)
  console.log(location.pathname)
  return (
    <>
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} w-full h-[100vh] flex flex-col-reverse md:flex-row justify-center items-center`}>
        <div className={`h-[4rem] md:h-full w-full md:w-[20%] flex flex-col ${darkMode ? "bg-gray-950 text-white" : "bg-white-700"} p-4`}>
          <div className={`h-[6rem] hidden md:flex items-center transform -translate-y-3 p-4  `}>Logo</div>
          <div className={`sm:h-full md:h-auto`}>
            <ul className={`w-full sm:h-full flex flex-row md:flex-col items-center md:items-start justify-center md:justify-start h-full gap-4 navLinks`}>
              <NavLink to="/admin" className={`${location.pathname === "/admin" ? "activeLink" : ""} w-auto md:w-full`} ><li className=' text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faTableColumns} /> &nbsp;Dashboard</li></NavLink>
              <NavLink to="/admin/manage-org" className={`${location.pathname === "/admin/manage-org" ? "activeLink" : ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faChartSimple} />&nbsp; Manage Organization</li></NavLink>
              <NavLink to="/admin/manage-technicians" className={`${location.pathname === "/admin/manage-technicians" ? "activeLink" : ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faClipboard} />&nbsp; Manage Technicians</li></NavLink>
              <NavLink to="/admin/finance" className={`${location.pathname === "/admin/finance" ? "activeLink" : ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faClipboard} />&nbsp; Finance</li></NavLink>
              {/* <NavLink  to="/staff"><li className='text-responsive cursor-pointer hover:bg-blue-400'><FontAwesomeIcon icon={faBrush} /> &nbsp;Maintenance</li></NavLink> */}
              <NavLink to="/admin/settings" className={`${location.pathname === "/admin/settings" ? "activeLink" : ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faGear} />&nbsp; Settings</li></NavLink>
            </ul>
          </div>
        </div>
        <div className="h-full w-full md:w-[80%] overflow-y-scroll">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/manage-org" element={<AdminManageOrg />} />
            <Route path="/manage-technicians" element={<AdminManageTechnicians />} />
            <Route path="/finance" element={<AdminFinance />} />
            <Route path="/settings" element={<AdminSettings />} />
            {/* <Route path='/repairs' element={<SubAdminRepairHistory />} />
            <Route path='/help' element={<SubAdminHelp />} />
            <Route path='/settings' element={<SubAdminSettings />} /> */}
          </Routes>
        </div>
      </div>
    </>
  )

  
}
export default AdminDashboardLayout
