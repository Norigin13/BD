import React from "react";
import { FaUserTie } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminStaff() {
  // Dữ liệu mẫu
  const staff = [
    {
      staff_id: 1,
      full_name: 'Nguyễn Văn C',
      username: 'nvcanh',
      email: 'nvcanh@email.com',
      phone: '0912345678',
      created_at: '2024-01-01',
    },
    {
      staff_id: 2,
      full_name: 'Lê Thị D',
      username: 'ltdung',
      email: 'ltdung@email.com',
      phone: '0987654321',
      created_at: '2024-02-15',
    },
  ];
  return (
    <SidebarLayout title="Quản lý nhân viên">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaUserTie style={{marginRight:8}}/>Danh sách nhân viên</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Họ tên</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>SĐT</th>
                <th style={thStyle}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.staff_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{s.staff_id}</td>
                  <td style={tdStyle}>{s.full_name}</td>
                  <td style={tdStyle}>{s.username}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.phone}</td>
                  <td style={tdStyle}>{s.created_at}</td>
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
export default AdminStaff; 