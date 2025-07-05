import React, { useEffect, useState } from "react";
import SidebarLayout from "./SidebarLayout";
import api from "../../config/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    gender: "Male",
    blood_type: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    health_notes: "",
  });

  const fetchUsers = () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenForm = (user = null) => {
    setEditUser(user);
    setForm(user ? {
      full_name: user.full_name,
      dob: user.dob,
      gender: user.gender,
      blood_type: user.blood_type,
      phone: user.phone,
      email: user.email,
      password: "",
      address: user.address,
      health_notes: user.health_notes,
    } : {
      full_name: "",
      dob: "",
      gender: "Male",
      blood_type: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      health_notes: "",
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditUser(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await api.put(`/member/${editUser.member_id}`, form);
      } else {
        await api.post("/member", form);
      }
      fetchUsers();
      handleCloseForm();
    } catch {
      alert("Lỗi khi lưu thành viên!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thành viên này?")) return;
    try {
      await api.delete(`/member/${id}`);
      fetchUsers();
    } catch {
      alert("Lỗi khi xóa thành viên!");
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      if (user.status === 'enabled') {
        await api.put(`/member/${user.member_id}/disable`);
      } else {
        await api.put(`/member/${user.member_id}/enable`);
      }
      fetchUsers();
    } catch {
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  return (
    <SidebarLayout title="Quản lý thành viên">
      <div style={{ padding: 32 }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}>Danh sách thành viên</h2>
        <button onClick={() => handleOpenForm()} style={{marginBottom:16, background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600}}>Thêm thành viên</button>
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
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}></th>
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
                  <td style={tdStyle}>{u.status === 'enabled' ? 'Hoạt động' : 'Bị khóa'}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleOpenForm(u)} style={{marginRight:8}}>Sửa</button>
                    <button onClick={() => handleDelete(u.member_id)} style={{marginRight:8, color:'#d32f2f'}}>Xóa</button>
                    <button onClick={() => handleToggleStatus(u)} style={{color:u.status==='enabled'?'#d32f2f':'#388e3c'}}>
                      {u.status === 'enabled' ? 'Disable' : 'Enable'}
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
              <h3>{editUser ? 'Sửa thành viên' : 'Thêm thành viên'}</h3>
              <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Họ tên" required />
              <input name="dob" type="date" value={form.dob} onChange={handleChange} placeholder="Ngày sinh" required />
              <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
              <input name="blood_type" value={form.blood_type} onChange={handleChange} placeholder="Nhóm máu" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
              <input name="password" value={form.password} onChange={handleChange} placeholder="Mật khẩu" type="password" required={!editUser} />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ" required />
              <input name="health_notes" value={form.health_notes} onChange={handleChange} placeholder="Ghi chú sức khỏe" />
              <div style={{display:'flex',gap:12,marginTop:8}}>
                <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:600}}>{editUser ? 'Lưu' : 'Thêm'}</button>
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
export default AdminUsers; 