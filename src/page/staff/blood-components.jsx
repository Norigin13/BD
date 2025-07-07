import React, { useEffect, useState } from "react";
import SidebarLayout from "../admin/SidebarLayout";
import api from "../../config/axios";

function StaffBloodComponents() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api.get("/blood-component")
      .then(res => {
        setComponents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu thành phần máu.");
        setLoading(false);
      });
  }, []);

  return (
    <SidebarLayout title="Quản lý thành phần máu" isStaff>
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách thành phần máu</h2>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên</th>
                <th style={thStyle}>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {components.map(c => (
                <tr key={c.component_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{c.componentId}</td>
                  <td style={tdStyle}>{c.name}</td>
                  <td style={tdStyle}>{c.description}</td>
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
export default StaffBloodComponents; 