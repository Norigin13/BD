import SidebarLayout from "./SidebarLayout";
import React from "react";

function AdminBloodRequests() {
  // Dữ liệu mẫu
  const requests = [
    {
      request_id: 1,
      member_id: 1,
      full_name: 'Nguyễn Văn A',
      blood_type: 'O+',
      component_id: 1,
      hospital: 'Bệnh viện Chợ Rẫy',
      contact: '0123456789',
      needed_date: '2024-06-10',
      is_emergency: false,
      note: 'Cần máu gấp',
      created_at: '2024-06-01',
    },
    {
      request_id: 2,
      member_id: 2,
      full_name: 'Trần Thị B',
      blood_type: 'A-',
      component_id: 2,
      hospital: 'Bệnh viện Đại học Y Dược',
      contact: '0987654321',
      needed_date: '2024-06-12',
      is_emergency: true,
      note: 'Truyền tiểu cầu',
      created_at: '2024-06-02',
    },
  ];
  return (
    <SidebarLayout title="Quản lý yêu cầu nhận máu">
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: 32 }}>
        <h1 style={{ color: '#174c8f', marginBottom: 24 }}>Quản lý yêu cầu nhận máu</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Mã thành viên</th>
                <th style={thStyle}>Họ tên</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thành phần</th>
                <th style={thStyle}>Bệnh viện</th>
                <th style={thStyle}>Liên hệ</th>
                <th style={thStyle}>Ngày cần</th>
                <th style={thStyle}>Khẩn cấp</th>
                <th style={thStyle}>Ghi chú</th>
                <th style={thStyle}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.request_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{r.request_id}</td>
                  <td style={tdStyle}>{r.member_id}</td>
                  <td style={tdStyle}>{r.full_name}</td>
                  <td style={tdStyle}>{r.blood_type}</td>
                  <td style={tdStyle}>{r.component_id}</td>
                  <td style={tdStyle}>{r.hospital}</td>
                  <td style={tdStyle}>{r.contact}</td>
                  <td style={tdStyle}>{r.needed_date}</td>
                  <td style={tdStyle}>{r.is_emergency ? 'Có' : 'Không'}</td>
                  <td style={tdStyle}>{r.note}</td>
                  <td style={tdStyle}>{r.created_at}</td>
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
export default AdminBloodRequests; 