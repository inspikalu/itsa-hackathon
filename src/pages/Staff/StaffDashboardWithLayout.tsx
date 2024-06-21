
import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import StaffHome from './StaffHome';
import StaffSettings from './StaffSettings';
import StaffRepairHistory from './StaffRepairHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartSimple, faClipboard, faBrush, faGear } from '@fortawesome/free-solid-svg-icons';
import StaffHelp from './StaffHelp';
const StaffDashboardWithLayout: React.FC = function () {
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
              <NavLink  to="/staff" className={`${location.pathname === "/staff"? "activeLink": ""} w-auto md:w-full`} ><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faTableColumns} /> &nbsp;Dashboard</li></NavLink>
              <NavLink  to="/staff/repairs" className={`${location.pathname === "/staff/repairs"? "activeLink": ""} w-auto md:w-full`} ><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faChartSimple} />&nbsp; Repair History</li></NavLink>
              <NavLink  to="/staff/help" className={`${location.pathname === "/staff/help"? "activeLink": ""} w-auto md:w-full`} ><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faClipboard} />&nbsp; Help and support</li></NavLink>
              {/* <NavLink  to="/staff"><li className='text-responsive cursor-pointer hover:bg-blue-400'><FontAwesomeIcon icon={faBrush} /> &nbsp;Maintenance</li></NavLink> */}
              <NavLink  to={'/staff/settings'} className={`${location.pathname === "/staff/settings"? "activeLink": ""} w-auto md:w-full`} ><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faGear} />&nbsp; Settings</li></NavLink>
            </ul>
          </div>
        </div>
        <div className="h-full w-full md:w-[80%] overflow-y-scroll">
          <Routes>
            <Route path="/" element={<StaffHome />} />
            <Route path='/settings' element={<StaffSettings />}/>
            <Route path='/repairs' element={<StaffRepairHistory />}/>
            <Route path='/help' element={<StaffHelp />}/>
            {/* <Route path="/profile" element={<StaffProfile />} />
        <Route path="/settings" element={<StaffSettings />} /> */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default StaffDashboardWithLayout
