import SidebarLayout from "./SidebarLayout";
import React from "react";

function AdminBloodInventory() {
  // Dữ liệu mẫu
  const inventory = [
    {
      inventory_id: 1,
      location_id: 1,
      blood_type: 'O+',
      component_id: 1,
      unit_count: 12,
      last_updated: '2024-06-01 10:00',
    },
    {
      inventory_id: 2,
      location_id: 2,
      blood_type: 'A-',
      component_id: 2,
      unit_count: 5,
      last_updated: '2024-06-01 09:30',
    },
  ];
  return (
    <SidebarLayout title="Quản lý kho máu">
      <div style={{ maxWidth: 900, margin: '40px auto', padding: 32 }}>
        <h1 style={{ color: '#174c8f', marginBottom: 24 }}>Quản lý kho máu</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Mã địa điểm</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thành phần</th>
                <th style={thStyle}>Số đơn vị</th>
                <th style={thStyle}>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(i => (
                <tr key={i.inventory_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{i.inventory_id}</td>
                  <td style={tdStyle}>{i.location_id}</td>
                  <td style={tdStyle}>{i.blood_type}</td>
                  <td style={tdStyle}>{i.component_id}</td>
                  <td style={tdStyle}>{i.unit_count}</td>
                  <td style={tdStyle}>{i.last_updated}</td>
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
export default AdminBloodInventory; 