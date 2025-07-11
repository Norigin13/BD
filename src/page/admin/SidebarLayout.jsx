import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUsers, FaTint, FaHandHoldingMedical, FaHandHoldingWater, FaTachometerAlt, FaUserTie, FaMapMarkerAlt, FaCog, FaBell, FaLayerGroup } from "react-icons/fa";

const adminLinks = [
  { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin/users', icon: <FaUsers />, label: 'Quản lý thành viên' },
  { to: '/admin/staff', icon: <FaUserTie />, label: 'Quản lý nhân viên' },
];
const staffLinks = [
  { to: '/staff', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/staff/blood-inventory', icon: <FaTint />, label: 'Kho máu' },
  { to: '/staff/blood-units', icon: <FaLayerGroup />, label: 'Đơn vị máu' },
  { to: '/staff/blood-components', icon: <FaTint />, label: 'Thành phần máu' },
  { to: '/staff/locations', icon: <FaMapMarkerAlt />, label: 'Địa điểm' },
  // Đưa 2 mục xử lý đơn liền kề nhau
  { to: '/staff/blood-requests', icon: <FaHandHoldingMedical />, label: 'Xử lý đơn nhận máu' },
  { to: '/staff/donation', icon: <FaHandHoldingWater />, label: 'Xử lý đơn hiến máu' },
  { to: '/staff/processes', icon: <FaCog />, label: 'Quy trình' },
  { to: '/staff/reminders', icon: <FaBell />, label: 'Nhắc nhở' },
  { to: '/staff/users', icon: <FaUsers />, label: 'Hồ sơ thành viên' },
];

function SidebarLayout({ title, children, isStaff = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(90deg, #174c8f 0%, #2563eb 100%)' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 0' }}>
        <div style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>
          <FaTachometerAlt style={{ marginRight: 10, color: '#60a5fa' }} /> {isStaff ? 'Staff' : 'Admin'}
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {(isStaff ? staffLinks : adminLinks).map(link => (
            <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} active={location.pathname === link.to} />
          ))}
        </nav>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginTop: 32 }}>
          © 2024 Blood {isStaff ? 'Staff' : 'Admin'}
        </div>
      </aside>
      {/* Main content */}
      <div style={{ flex: 1, background: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{ height: 64, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', boxShadow: '0 2px 8px rgba(23,76,143,0.04)' }}>
          <div style={{ fontWeight: 600, fontSize: 20, color: '#174c8f', letterSpacing: 1 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontWeight: 500, color: '#2563eb' }}>{isStaff ? 'Staff' : 'Admin'}</span>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 38, height: 38, borderRadius: '50%' }} />
            <button
              onClick={handleLogout}
              style={{
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                marginLeft: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, active }) {
  return (
    <Link to={to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 28px', color: active ? '#60a5fa' : '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, borderRadius: 8, background: active ? '#334155' : 'none', transition: 'background 0.2s' }}>
      {icon} {label}
    </Link>
  );
}

export default SidebarLayout; 