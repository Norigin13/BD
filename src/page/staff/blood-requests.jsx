import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/blood-request?status=pending")
      .then(res => {
        // Ưu tiên đơn khẩn cấp lên đầu
        const sorted = [...res.data].sort((a, b) => (b.is_emergency ? 1 : 0) - (a.is_emergency ? 1 : 0));
        setRequests(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách đơn.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Xử lý đơn hiến/nhận máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách đơn chờ phê duyệt</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên người gửi</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Loại</th>
                <th style={thStyle}>Ngày cần</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.requestId} style={{ background: r.is_emergency ? '#fff3f0' : '#f9fafb', fontWeight: r.is_emergency ? 700 : 500 }}>
                  <td style={tdStyle}>{r.requestId}</td>
                  <td style={tdStyle}>{r.full_name}</td>
                  <td style={tdStyle}>{r.blood_type}</td>
                  <td style={tdStyle}>{r.is_emergency ? <span style={{color:'#d32f2f'}}>Khẩn cấp</span> : 'Thường'}</td>
                  <td style={tdStyle}>{r.needed_date}</td>
                  <td style={tdStyle}>{r.status || 'Chờ duyệt'}</td>
                  <td style={tdStyle}>
                    {r.requestId ? (
                      <Link to={`/staff/blood-requests/${r.requestId}`}>Xem chi tiết</Link>
                    ) : (
                      <span style={{color: 'gray'}}>Không có ID</span>
                    )}
                  </td>
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
export default StaffBloodRequests; 