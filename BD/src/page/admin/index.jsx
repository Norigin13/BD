import React from "react";
import { FaUsers, FaTint, FaHandHoldingMedical, FaHandHoldingWater } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

const stats = [
  { icon: <FaUsers />, label: 'Tổng thành viên', value: 3456, color: '#2563eb' },
  { icon: <FaTint />, label: 'Đơn vị máu', value: 1200, color: '#d32f2f' },
  { icon: <FaHandHoldingMedical />, label: 'Yêu cầu hiến máu', value: 87, color: '#fbbf24' },
  { icon: <FaHandHoldingWater />, label: 'Yêu cầu nhận máu', value: 42, color: '#388e3c' },
];

function AdminDashboard() {
  return (
    <SidebarLayout title="Dashboard">
      <div style={{ display: 'flex', gap: 32, margin: '32px 32px 0 32px', flexWrap: 'wrap' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(23,76,143,0.07)', padding: '28px 32px', minWidth: 220, flex: 1, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ fontSize: 36, color: s.color }}>{s.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 22 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 15 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: '32px', background: '#fff', borderRadius: 16, minHeight: 320, boxShadow: '0 2px 8px rgba(23,76,143,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 20, fontWeight: 500 }}>
        (Biểu đồ/thống kê sẽ hiển thị ở đây)
      </div>
    </SidebarLayout>
  );
}

export default AdminDashboard;
