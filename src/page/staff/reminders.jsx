import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/reminder")
      .then(res => {
        setReminders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu nhắc nhở.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý nhắc nhở" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách nhắc nhở</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Thành viên</th>
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
        )}
      </div>
    </SidebarLayout>
  );
}

const thStyle = { padding: '10px 8px', fontWeight: 600 };
const tdStyle = { padding: '10px 8px', textAlign: 'center' };
export default StaffReminders; 