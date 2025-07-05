import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/member")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu thành viên.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Hồ sơ thành viên" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách thành viên</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
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
                <th style={thStyle}>Lần hiến máu gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.member_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{u.member_id}</td>
                  <td style={tdStyle}>{u.full_name}</td>
                  <td style={tdStyle}>{u.dob}</td>
                  <td style={tdStyle}>{u.gender}</td>
                  <td style={tdStyle}>{u.blood_type}</td>
                  <td style={tdStyle}>{u.phone}</td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>{u.address}</td>
                  <td style={tdStyle}>{u.last_donation}</td>
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
export default StaffUsers; 