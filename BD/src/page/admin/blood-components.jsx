import React from "react";
import { FaTint } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

function AdminBloodComponents() {
  // Dữ liệu mẫu
  const components = [
    {
      component_id: 1,
      name: 'Hồng cầu',
      description: 'Mang oxy cho cơ thể',
    },
    {
      component_id: 2,
      name: 'Tiểu cầu',
      description: 'Giúp đông máu',
    },
  ];
  return (
    <SidebarLayout title="Quản lý thành phần máu">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaTint style={{marginRight:8}}/>Danh sách thành phần máu</h2>
        <div style={{ overflowX: 'auto' }}>
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
                  <td style={tdStyle}>{c.component_id}</td>
                  <td style={tdStyle}>{c.name}</td>
                  <td style={tdStyle}>{c.description}</td>
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
export default AdminBloodComponents; 