import React, { useEffect, useState } from "react";
import { FaTint } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";
import api from '../../config/axios';

function AdminBloodUnits() {
  const [units, setUnits] = useState([]);
  const [donations, setDonations] = useState([]);
  const [components, setComponents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    donationId: '',
    componentId: '',
    bloodType: '',
    volume: '',
    locationId: '',
    status: 'Available',
  });
  // Fetch data
  useEffect(() => {
    fetchUnits();
    api.get('/donation')
      .then(res => setDonations(res.data))
      .catch(() => setDonations([]));
    api.get('/blood-component')
      .then(res => setComponents(res.data))
      .catch(() => setComponents([]));
    api.get('/location')
      .then(res => setLocations(res.data))
      .catch(() => setLocations([]));
  }, []);
  const fetchUnits = () => {
    api.get('/blood-unit')
      .then(res => setUnits(res.data))
      .catch(() => setUnits([]));
  };
  // Handle form
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      donation: { donationId: Number(form.donationId) },
      component: { componentId: Number(form.componentId) },
      bloodType: form.bloodType,
      volumeMl: Number(form.volume),
      location: { locationId: Number(form.locationId) },
      status: form.status
    };
    try {
      await api.post('/blood-unit', payload);
      setShowForm(false);
      setForm({ donationId: '', componentId: '', bloodType: '', volume: '', locationId: '', status: 'Available' });
      fetchUnits();
      alert('Tạo blood unit thành công!');
    } catch {
      alert('Có lỗi khi tạo blood unit');
    }
  };
  return (
    <SidebarLayout title="Quản lý đơn vị máu">
      <div style={{ margin: '32px' }}>
        <h2 style={{ color: '#174c8f', marginBottom: 24 }}><FaTint style={{marginRight:8}}/>Danh sách đơn vị máu</h2>
        <button onClick={() => setShowForm(f => !f)} style={{marginBottom:16, background:'#174c8f', color:'#fff', padding:'8px 16px', border:'none', borderRadius:6}}>Tạo blood unit</button>
        {showForm && (
          <form onSubmit={handleSubmit} style={{marginBottom:24, background:'#f4f6fa', padding:24, borderRadius:8}}>
            <label>
              Đơn hiến máu:
              <select name="donationId" value={form.donationId} onChange={handleChange} required>
                <option value="">Chọn đơn</option>
                {donations.map(d => (
                  <option key={d.donationId || d.donation_id} value={d.donationId || d.donation_id}>
                    {d.donationId || d.donation_id} - {d.member?.name || d.member_id}
                  </option>
                ))}
              </select>
            </label>
            <label style={{marginLeft:16}}>
              Thành phần máu:
              <select name="componentId" value={form.componentId} onChange={handleChange} required>
                <option value="">Chọn thành phần</option>
                {components.map(c => (
                  <option key={c.componentId || c.component_id} value={c.componentId || c.component_id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label style={{marginLeft:16}}>
              Nhóm máu:
              <input name="bloodType" value={form.bloodType} onChange={handleChange} required style={{width:80}} />
            </label>
            <label style={{marginLeft:16}}>
              Thể tích (ml):
              <input name="volume" type="number" value={form.volume} onChange={handleChange} required style={{width:80}} />
            </label>
            <label style={{marginLeft:16}}>
              Địa điểm:
              <select name="locationId" value={form.locationId} onChange={handleChange} required>
                <option value="">Chọn địa điểm</option>
                {locations.map(l => (
                  <option key={l.locationId || l.location_id} value={l.locationId || l.location_id}>{l.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" style={{marginLeft:16, background:'#174c8f', color:'#fff', padding:'8px 16px', border:'none', borderRadius:6}}>Tạo</button>
          </form>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
            <thead style={{ background: '#174c8f', color: '#fff' }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Donation ID</th>
                <th style={thStyle}>Component ID</th>
                <th style={thStyle}>Nhóm máu</th>
                <th style={thStyle}>Thể tích (ml)</th>
                <th style={thStyle}>Địa điểm</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {units.map(u => (
                <tr key={u.unitId || u.unit_id} style={{ background: '#f9fafb' }}>
                  <td style={tdStyle}>{u.unitId || u.unit_id}</td>
                  <td style={tdStyle}>{u.donation?.donationId || u.donation_id || u.donation?.id}</td>
                  <td style={tdStyle}>{u.component?.componentId || u.component_id || u.component?.id}</td>
                  <td style={tdStyle}>{u.bloodType || u.blood_type}</td>
                  <td style={tdStyle}>{u.volumeMl || u.volume_ml}</td>
                  <td style={tdStyle}>{u.location?.locationId || u.location_id || u.location?.id}</td>
                  <td style={tdStyle}>{u.status}</td>
                  <td style={tdStyle}>{u.createdAt || u.created_at}</td>
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
export default AdminBloodUnits; 