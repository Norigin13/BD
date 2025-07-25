import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodUnits() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/blood-unit")
      .then(res => {
        setUnits(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu đơn vị máu.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý đơn vị máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách đơn vị máu</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Đơn hiến máu</th>
                <th style={thStyle}>Thành phần máu</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thể tích (ml)</th>
                <th style={thStyle}>Bệnh viện</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {units.map(u => (
                <tr key={u.unitId} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{u.unitId}</td>
                  <td style={tdStyle}>{u.donation?.donationId}</td>
                  <td style={tdStyle}>{u.component?.componentName || u.component?.name}</td>
                  <td style={tdStyle}>{u.bloodType}</td>
                  <td style={tdStyle}>{u.volumeMl}</td>
                  <td style={tdStyle}>{u.location?.locationName || u.location?.name}</td>
                  <td style={tdStyle}>{u.status}</td>
                  <td style={tdStyle}>{u.createdAt}</td>
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
export default StaffBloodUnits; 