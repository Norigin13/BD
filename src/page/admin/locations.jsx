import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminLocations() {
  // Dữ liệu mẫu
  const locations = [
    {
      location_id: 1,
      name: 'TT Hiến Máu Nhân Đạo',
      address: '466 Nguyễn Tri Phương, Q.10',
      city: 'TP.HCM',
      latitude: 10.762622,
      longitude: 106.660172,
    },
    {
      location_id: 2,
      name: 'Bệnh viện Chợ Rẫy',
      address: '201B Nguyễn Chí Thanh, Q.5',
      city: 'TP.HCM',
      latitude: 10.754666,
      longitude: 106.663333,
    },
  ];
  return (
    <SidebarLayout title="Quản lý địa điểm">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaMapMarkerAlt style={{marginRight:8}}/>Danh sách địa điểm</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Thành phố</th>
                <th style={thStyle}>Vĩ độ</th>
                <th style={thStyle}>Kinh độ</th>
              </tr>
            </thead>
            <tbody>
              {locations.map(l => (
                <tr key={l.location_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{l.location_id}</td>
                  <td style={tdStyle}>{l.name}</td>
                  <td style={tdStyle}>{l.address}</td>
                  <td style={tdStyle}>{l.city}</td>
                  <td style={tdStyle}>{l.latitude}</td>
                  <td style={tdStyle}>{l.longitude}</td>
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
export default AdminLocations; 