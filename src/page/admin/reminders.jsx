import React from "react";
import { FaBell } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminReminders() {
  // Dữ liệu mẫu
  const reminders = [
    {
      reminder_id: 1,
      member_id: 1,
      message: 'Đã đến lịch hiến máu',
      reminder_date: '2024-06-10',
      status: 'Đã gửi',
    },
    {
      reminder_id: 2,
      member_id: 2,
      message: 'Cần kiểm tra sức khỏe',
      reminder_date: '2024-06-12',
      status: 'Chưa gửi',
    },
  ];
  return (
    <SidebarLayout title="Quản lý nhắc nhở">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaBell style={{marginRight:8}}/>Danh sách nhắc nhở</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Member ID</th>
                <th style={thStyle}>Nội dung</th>
                <th style={thStyle}>Ngày nhắc</th>
                <th style={thStyle}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map(r => (
                <tr key={r.reminder_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{r.reminder_id}</td>
                  <td style={tdStyle}>{r.member_id}</td>
                  <td style={tdStyle}>{r.message}</td>
                  <td style={tdStyle}>{r.reminder_date}</td>
                  <td style={tdStyle}>{r.status}</td>
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
export default AdminReminders; 