import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'
import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout"
import SubAdminLayout from "./pages/subAdmin/SubAdminLayout"
import StaffDashboardWithLayout from "./pages/Staff/StaffDashboardWithLayout"

const Index: React.FC = function () {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/admin/*" element={<AdminDashboardLayout />} />
                    <Route path="/sub/admin/*" element={<SubAdminLayout />} />
                    <Route path="/staff/*" element={<StaffDashboardWithLayout />} />
                </Routes>
            </Router>
        </>
    )
}

export default Index
