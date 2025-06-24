import SidebarLayout from "./SidebarLayout";
import React from "react";

function AdminDonationRequests() {
  // Dữ liệu mẫu
  const donations = [
    {
      donation_id: 1,
      member_id: 1,
      location_id: 1,
      date: '2024-05-01',
      volume_ml: 350,
      notes: 'Hiến máu toàn phần',
    },
    {
      donation_id: 2,
      member_id: 2,
      location_id: 2,
      date: '2024-05-15',
      volume_ml: 350,
      notes: 'Hiến tiểu cầu',
    },
  ];
  return (
    <SidebarLayout title="Quản lý yêu cầu hiến máu">
      <div style={{ maxWidth: 1000, margin: '40px auto', padding: 32 }}>
        <h1 style={{ color: '#174c8f', marginBottom: 24 }}>Quản lý yêu cầu hiến máu</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Mã thành viên</th>
                <th style={thStyle}>Mã địa điểm</th>
                <th style={thStyle}>Ngày hiến</th>
                <th style={thStyle}>Lượng máu (ml)</th>
                <th style={thStyle}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.donation_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{d.donation_id}</td>
                  <td style={tdStyle}>{d.member_id}</td>
                  <td style={tdStyle}>{d.location_id}</td>
                  <td style={tdStyle}>{d.date}</td>
                  <td style={tdStyle}>{d.volume_ml}</td>
                  <td style={tdStyle}>{d.notes}</td>
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
export default AdminDonationRequests; 