import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/index.jsx'; // Sử dụng trang Home hiện tại
import Dashboard from './pages/Dashboard'; // Sử dụng trang Dashboard hiện tại
import AdminDashboard from '../pages/admin/index.jsx'; // Đảm bảo file này tồn tại
import Login from '../pages/login/index.jsx'; // Nhập file đăng nhập
// import { useAuth } from './context/AuthContext';
import AdminPage from "./page/admin";
import DonationHistoryPage from "./page/donation-history";
import UserProfilePage from "./page/user-profile";
import HomePage from "./page/home";

const App = () => {
    // const { user } = useAuth(); // Lấy thông tin người dùng từ context

    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/donation-history" element={<DonationHistoryPage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default App;