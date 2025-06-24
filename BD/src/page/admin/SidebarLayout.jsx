import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaTint, FaHandHoldingMedical, FaHandHoldingWater, FaTachometerAlt, FaUserTie, FaMapMarkerAlt, FaCog, FaBell, FaLayerGroup } from "react-icons/fa";

const sidebarLinks = [
  { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { to: '/admin/users', icon: <FaUsers />, label: 'Thành viên' },
  { to: '/admin/staff', icon: <FaUserTie />, label: 'Nhân viên' },
  { to: '/admin/blood-inventory', icon: <FaTint />, label: 'Kho máu' },
  { to: '/admin/blood-units', icon: <FaLayerGroup />, label: 'Đơn vị máu' },
  { to: '/admin/blood-components', icon: <FaTint />, label: 'Thành phần máu' },
  { to: '/admin/locations', icon: <FaMapMarkerAlt />, label: 'Địa điểm' },
  { to: '/admin/donation-requests', icon: <FaHandHoldingMedical />, label: 'Yêu cầu hiến máu' },
  { to: '/admin/blood-requests', icon: <FaHandHoldingWater />, label: 'Yêu cầu nhận máu' },
  { to: '/admin/processes', icon: <FaCog />, label: 'Xử lý yêu cầu' },
  { to: '/admin/reminders', icon: <FaBell />, label: 'Nhắc nhở' },
];

function SidebarLayout({ title, children }) {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(90deg, #174c8f 0%, #2563eb 100%)' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column', padding: '32px 0' }}>
        <div style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>
          <FaTachometerAlt style={{ marginRight: 10, color: '#60a5fa' }} /> Admin
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          {sidebarLinks.map(link => (
            <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} active={location.pathname === link.to} />
          ))}
        </nav>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', marginTop: 32 }}>
          © 2024 Blood Admin
        </div>
      </aside>
      {/* Main content */}
      <div style={{ flex: 1, background: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <div style={{ height: 64, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', boxShadow: '0 2px 8px rgba(23,76,143,0.04)' }}>
          <div style={{ fontWeight: 600, fontSize: 20, color: '#174c8f', letterSpacing: 1 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontWeight: 500, color: '#2563eb' }}>Admin</span>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" style={{ width: 38, height: 38, borderRadius: '50%' }} />
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