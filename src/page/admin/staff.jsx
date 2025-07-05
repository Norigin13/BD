import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";
import api from "../../config/axios";

function AdminStaff() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const fetchStaffs = () => {
    setLoading(true);
    api.get("/staff")
      .then(res => {
        setStaffs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu nhân viên.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleOpenForm = (staff = null) => {
    setEditStaff(staff);
    setForm(staff ? {
      full_name: staff.full_name,
      username: staff.username,
      email: staff.email,
      phone: staff.phone,
      password: "",
    } : {
      full_name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditStaff(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStaff) {
        await api.put(`/staff/${editStaff.staff_id}`, form);
      } else {
        await api.post("/staff", form);
      }
      fetchStaffs();
      handleCloseForm();
    } catch {
      alert("Lỗi khi lưu nhân viên!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa nhân viên này?")) return;
    try {
      await api.delete(`/staff/${id}`);
      fetchStaffs();
    } catch {
      alert("Lỗi khi xóa nhân viên!");
    }
  };

  const handleToggleStatus = async (staff) => {
    try {
      if (staff.status === 'enabled') {
        await api.put(`/staff/${staff.staff_id}/disable`);
      } else {
        await api.put(`/staff/${staff.staff_id}/enable`);
      }
      fetchStaffs();
    } catch {
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  return (
    <SidebarLayout title="Quản lý nhân viên">
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaUserTie style={{marginRight:8}}/>Danh sách nhân viên</h2>
        <button onClick={() => handleOpenForm()} style={{marginBottom:16, background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600}}>Thêm nhân viên</button>
        {loading ? <div>Đang tải...</div> : error ? <div style={{color:'red'}}>{error}</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Họ tên</th>
                <th style={thStyle}>Username</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>SĐT</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {staffs.map(s => (
                <tr key={s.staff_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{s.staff_id}</td>
                  <td style={tdStyle}>{s.full_name}</td>
                  <td style={tdStyle}>{s.username}</td>
                  <td style={tdStyle}>{s.email}</td>
                  <td style={tdStyle}>{s.phone}</td>
                  <td style={tdStyle}>{s.status === 'enabled' ? 'Hoạt động' : 'Bị khóa'}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleOpenForm(s)} style={{marginRight:8}}>Sửa</button>
                    <button onClick={() => handleDelete(s.staff_id)} style={{marginRight:8, color:'#d32f2f'}}>Xóa</button>
                    <button onClick={() => handleToggleStatus(s)} style={{color:s.status==='enabled'?'#d32f2f':'#388e3c'}}>
                      {s.status === 'enabled' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showForm && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
            <form onSubmit={handleSubmit} style={{background:'#fff',padding:32,borderRadius:12,minWidth:340,boxShadow:'0 2px 16px rgba(23,76,143,0.10)',display:'flex',flexDirection:'column',gap:12}}>
              <h3>{editStaff ? 'Sửa nhân viên' : 'Thêm nhân viên'}</h3>
              <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Họ tên" required />
              <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" required />
              <input name="password" value={form.password} onChange={handleChange} placeholder="Mật khẩu" type="password" required={!editStaff} />
              <div style={{display:'flex',gap:12,marginTop:8}}>
                <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600}}>{editStaff ? 'Lưu' : 'Thêm'}</button>
                <button type="button" onClick={handleCloseForm} style={{background:'#d32f2f',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600}}>Hủy</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

const thStyle = { padding: '10px 8px', fontWeight: 600 };
const tdStyle = { padding: '10px 8px', textAlign: 'center' };
export default AdminStaff; 