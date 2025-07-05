import React from "react";
import { FaCog } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminProcesses() {
  // Dữ liệu mẫu
  const processes = [
    {
      process_id: 1,
      request_id: 1,
      matched_member_id: 2,
      assigned_unit_id: 1,
      status: 'Đã xử lý',
      updated_at: '2024-06-01',
    },
    {
      process_id: 2,
      request_id: 2,
      matched_member_id: 1,
      assigned_unit_id: 2,
      status: 'Đang chờ',
      updated_at: '2024-06-02',
    },
  ];
  return (
    <SidebarLayout title="Quản lý quá trình xử lý yêu cầu">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaCog style={{marginRight:8}}/>Danh sách quá trình xử lý</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Request ID</th>
                <th style={thStyle}>Matched Member</th>
                <th style={thStyle}>Assigned Unit</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(p => (
                <tr key={p.process_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{p.process_id}</td>
                  <td style={tdStyle}>{p.request_id}</td>
                  <td style={tdStyle}>{p.matched_member_id}</td>
                  <td style={tdStyle}>{p.assigned_unit_id}</td>
                  <td style={tdStyle}>{p.status}</td>
                  <td style={tdStyle}>{p.updated_at}</td>
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
export default AdminProcesses; 