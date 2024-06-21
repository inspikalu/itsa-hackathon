import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContex';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartSimple, faClipboard,  faGear } from '@fortawesome/free-solid-svg-icons';
import SubAdminHome from "./SubAdminHome"


const SubAdminLayout: React.FC = function () {

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
                  <NavLink  to="/sub/admin" className={`${location.pathname === "/sub/admin"? "activeLink": ""} w-auto md:w-full`} ><li className=' text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faTableColumns} /> &nbsp;Dashboard</li></NavLink>
                  <NavLink  to="/sub/admin" className={`${location.pathname === "/sub/admin"? "activeLink": ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faChartSimple} />&nbsp; Repair History</li></NavLink>
                  <NavLink  to="/sub/admin" className={`${location.pathname === "/sub/admin"? "activeLink": ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faClipboard} />&nbsp; Help and support</li></NavLink>
                  {/* <NavLink  to="/staff"><li className='text-responsive cursor-pointer hover:bg-blue-400'><FontAwesomeIcon icon={faBrush} /> &nbsp;Maintenance</li></NavLink> */}
                  <NavLink  to={'/sub/admin'} className={`${location.pathname === "/sub/admin"? "activeLink": ""} w-auto md:w-full`}><li className='text-responsive cursor-pointer hover:bg-blue-400 sm:flex sm:flex-col md:block'><FontAwesomeIcon icon={faGear} />&nbsp; Settings</li></NavLink>
                </ul>
              </div>
            </div>
            <div className="h-full w-full md:w-[80%] overflow-y-scroll">
              <Routes>
                <Route path="/" element={<SubAdminHome />} />
              </Routes>
            </div>
          </div>
        </>
      )
}

export default SubAdminLayout
