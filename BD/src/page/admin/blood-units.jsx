import React from "react";
import { FaTint } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminBloodUnits() {
  // Dữ liệu mẫu
  const units = [
    {
      unit_id: 1,
      donation_id: 1,
      component_id: 1,
      blood_type: 'O+',
      volume_ml: 350,
      location_id: 1,
      status: 'Available',
      created_at: '2024-06-01',
    },
    {
      unit_id: 2,
      donation_id: 2,
      component_id: 2,
      blood_type: 'A-',
      volume_ml: 250,
      location_id: 2,
      status: 'Used',
      created_at: '2024-06-02',
    },
  ];
  return (
    <SidebarLayout title="Quản lý đơn vị máu">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaTint style={{marginRight:8}}/>Danh sách đơn vị máu</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Donation ID</th>
                <th style={thStyle}>Component ID</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thể tích (ml)</th>
                <th style={thStyle}>Địa điểm</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {units.map(u => (
                <tr key={u.unit_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{u.unit_id}</td>
                  <td style={tdStyle}>{u.donation_id}</td>
                  <td style={tdStyle}>{u.component_id}</td>
                  <td style={tdStyle}>{u.blood_type}</td>
                  <td style={tdStyle}>{u.volume_ml}</td>
                  <td style={tdStyle}>{u.location_id}</td>
                  <td style={tdStyle}>{u.status}</td>
                  <td style={tdStyle}>{u.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}
const thStyle = { padding: '10px 8px', fontWeight: 600 };
const tdStyle = { padding: '10px 8px', textAlign: 'center' };
export default AdminBloodUnits; 