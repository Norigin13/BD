import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/location")
      .then(res => {
        setLocations(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu địa điểm.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý địa điểm" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách địa điểm</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên</th>
                <th style={thStyle}>Địa chỉ</th>
                <th style={thStyle}>Thành phố</th>
                <th style={thStyle}>Vĩ độ</th>
                <th style={thStyle}>Kinh độ</th>
              </tr>
            </thead>
            <tbody>
              {locations.map(l => (
                <tr key={l.location_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{l.location_id}</td>
                  <td style={tdStyle}>{l.name}</td>
                  <td style={tdStyle}>{l.address}</td>
                  <td style={tdStyle}>{l.city}</td>
                  <td style={tdStyle}>{l.latitude}</td>
                  <td style={tdStyle}>{l.longitude}</td>
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
export default StaffLocations; 