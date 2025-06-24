import SidebarLayout from "./SidebarLayout";
import React from "react";

function AdminUsers() {
  // Dữ liệu mẫu
  const members = [
    {
      member_id: 1,
      full_name: 'Nguyễn Văn A',
      dob: '1990-01-01',
      gender: 'Nam',
      blood_type: 'O+',
      phone: '0123456789',
      email: 'nguyenvana@email.com',
      address: '123 Đường ABC, Q.1',
      last_donation: '2024-05-01',
      health_notes: 'Khỏe mạnh',
    },
    {
      member_id: 2,
      full_name: 'Trần Thị B',
      dob: '1995-03-12',
      gender: 'Nữ',
      blood_type: 'A-',
      phone: '0987654321',
      email: 'tranthib@email.com',
      address: '456 Đường XYZ, Q.5',
      last_donation: '2024-04-15',
      health_notes: 'Thiếu máu nhẹ',
    },
  ];
  return (
    <SidebarLayout title="Quản lý thành viên">
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: 32 }}>
        <h1 style={{ color: '#174c8f', marginBottom: 24 }}>Quản lý thành viên</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Họ tên</th>
                <th style={thStyle}>Ngày sinh</th>
                <th style={thStyle}>Giới tính</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>SĐT</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Lần hiến máu cuối</th>
                <th style={thStyle}>Ghi chú sức khỏe</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.member_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{m.member_id}</td>
                  <td style={tdStyle}>{m.full_name}</td>
                  <td style={tdStyle}>{m.dob}</td>
                  <td style={tdStyle}>{m.gender}</td>
                  <td style={tdStyle}>{m.blood_type}</td>
                  <td style={tdStyle}>{m.phone}</td>
                  <td style={tdStyle}>{m.email}</td>
                  <td style={tdStyle}>{m.address}</td>
                  <td style={tdStyle}>{m.last_donation}</td>
                  <td style={tdStyle}>{m.health_notes}</td>
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
export default AdminUsers; 