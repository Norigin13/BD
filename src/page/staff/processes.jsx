import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffProcesses() {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/donation-request-process")
      .then(res => {
        setProcesses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu quy trình.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý quy trình xử lý đơn" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách quy trình xử lý đơn</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Đơn yêu cầu</th>
                <th style={thStyle}>Người hiến phù hợp</th>
                <th style={thStyle}>Đơn vị máu được gán</th>
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
        )}
      </div>
    </SidebarLayout>
  );
}

const thStyle = { padding: '10px 8px', fontWeight: 600 };
const tdStyle = { padding: '10px 8px', textAlign: 'center' };
export default StaffProcesses; 