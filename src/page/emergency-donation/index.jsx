import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from '../../components/footer';
import Header from '../../components/header';
import api from "../../config/axios";
import './emergency-donation.css';

function EmergencyDonation() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isEmergency = params.get("emergency") === "1";
  const [form, setForm] = useState({
    fullName: "",
    bloodType: "",
    phone: "",
    locationId: "",
    neededDate: "",
    note: "",
    component_id: "",
    is_emergency: isEmergency,
  });
  const [locations, setLocations] = useState([]);
  const [showHospitalPopup, setShowHospitalPopup] = useState(false);
  const [popupDistrict, setPopupDistrict] = useState("");
  const [popupDistricts, setPopupDistricts] = useState([]);
  const [popupHospitals, setPopupHospitals] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hàm tách quận/huyện từ address
  const getDistrictFromAddress = (address) => {
    // Lấy đúng “Quận X”, “Q. X”, “Bình Thạnh”, ...
    const match = address.match(/(Quận \d+|Q\.?\s*\d+|Bình Thạnh|Phú Nhuận|Tân Bình|Tân Phú|Gò Vấp|Bình Tân|Thủ Đức|Hóc Môn|Củ Chi|Nhà Bè|Bình Chánh|Cần Giờ)/i);
    if (!match) return null;
    let district = match[0].trim();
    // Nếu là “Q. 1” hoặc “Q1” thì thay thành “Quận 1”
    if (/^Q\.?\s*\d+$/i.test(district)) {
      district = district.replace(/^Q\.?\s*/i, 'Quận ');
    }
    return district;
  };

  useEffect(() => {
    if (!isEmergency) {
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
      }
    }
  }, [navigate, isEmergency]);

  useEffect(() => {
    api.get('/location')
      .then(res => {
        setLocations(res.data);
        // Lấy danh sách quận/huyện duy nhất của TP.HCM
        const uniqueDistricts = Array.from(new Set(
          res.data.filter(l => l.city === 'TP.HCM').map(l => getDistrictFromAddress(l.address)).filter(Boolean)
        ));
        setPopupDistricts(uniqueDistricts);
      })
      .catch(() => setLocations([]));
  }, []);

  // Khi chọn quận trong popup
  const handlePopupDistrictChange = (e) => {
    const district = e.target.value;
    setPopupDistrict(district);
    // Lọc ra các bệnh viện thuộc TP.HCM và quận đó
    const filtered = locations.filter(l => l.city === 'TP.HCM' && getDistrictFromAddress(l.address) === district);
    setPopupHospitals(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!isEmergency) {
      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }
    }
    try {
      const payload = {
        ...form,
        is_emergency: true,
        created_at: new Date().toISOString(),
      };
      if (!isEmergency && userInfo) {
        payload.member_id = userInfo.memberId;
      }
      await api.post("/blood-request", payload, {
        headers: userInfo && userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : {},
      });
      setSubmitted(true);
    } catch {
      setError("Đăng ký cần máu thất bại. Vui lòng thử lại.");
    }
  };

  // Render
  const selectedLocation = locations.find(l => String(l.locationId) === String(form.location_id));
  console.log('Render input:', form.location_id, locations);

  return (
    <>
      <Header />
      <div className="emergency-donation-bg">
        <div className="emergency-donation-form-container">
          <h1 className="emergency-title">Cần máu khẩn cấp</h1>
          {error && <div className="emergency-error">{error}</div>}
          {!submitted ? (
            <form className="emergency-form" onSubmit={handleSubmit}>
              <div className="emergency-row">
                <label>Họ tên:<input type="text" name="fullName" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} required /></label>
                <label>Nhóm máu:
                  <select name="bloodType" value={form.bloodType} onChange={e => setForm(f => ({ ...f, bloodType: e.target.value }))} required>
                    <option value="">Chọn nhóm máu</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </label>
              </div>
              <div className="emergency-row">
                <label>Số điện thoại:<input type="tel" name="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required /></label>
              </div>
              <div className="emergency-row">
                <label style={{flex:1}}>Bệnh viện cần máu:
                  <div style={{display:'flex',gap:8}}>
                    <input
                      type="text"
                      value={selectedLocation ? (selectedLocation.name + ' - ' + selectedLocation.address) : ''}
                      readOnly
                      placeholder="Chọn bệnh viện"
                      style={{flex:1,cursor:'pointer',background:'#f9fafb'}}
                      onClick={()=>setShowHospitalPopup(true)}
                    />
                  </div>
                </label>
                <label style={{flex:1}}>Ngày cần máu:
                  <input type="date" name="needed_date" value={form.needed_date} onChange={e => setForm(f => ({ ...f, needed_date: e.target.value }))} required />
                </label>
              </div>
              <div className="emergency-row">
                <label>Thành phần máu:
                  <select name="componentId" value={form.componentId} onChange={e => setForm(f => ({ ...f, componentId: e.target.value }))} required>
                    <option value="">Chọn thành phần máu</option>
                    <option value="1">Hồng cầu</option>
                    <option value="2">Tiểu cầu</option>
                    <option value="3">Huyết tương</option>
                    <option value="4">Bạch cầu</option>
                  </select>
                </label>
                <label>Ghi chú:<input type="text" name="note" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} /></label>
              </div>
              <button type="submit" className="emergency-submit">Gửi đăng ký cần máu</button>
            </form>
          ) : (
            <div className="emergency-success">
              Đăng ký cần máu thành công!<br />
              Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
              <button className="emergency-new" onClick={() => {
                setSubmitted(false);
                setForm({ fullName: "", bloodType: "", phone: "", locationId: "", neededDate: "", note: "", componentId: "", is_emergency: isEmergency });
              }}>Đăng ký mới</button>
            </div>
          )}
          {showHospitalPopup && (
            <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
              <div style={{background:'#fff',padding:32,borderRadius:12,minWidth:320,boxShadow:'0 2px 16px rgba(23,76,143,0.10)',display:'flex',flexDirection:'column',gap:18,alignItems:'center'}}>
                <h3>Chọn bệnh viện (TP.HCM)</h3>
                <div style={{display:'flex',gap:12,marginBottom:12}}>
                  <select value={popupDistrict} onChange={handlePopupDistrictChange} style={{padding:8,borderRadius:6}}>
                    <option value="">Chọn quận/huyện</option>
                    {popupDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:12,minWidth:260}}>
                  {popupHospitals.length === 0 ? <div>Chọn quận để xem bệnh viện.</div> : popupHospitals.map(h => (
                    <button
                      key={h.locationId}
                      type="button"
                      onClick={() => {
                        setForm(f => ({ ...f, location_id: String(h.locationId) }));
                        setShowHospitalPopup(false);
                        setPopupDistrict("");
                        setPopupHospitals([]);
                      }}
                      style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'10px 18px',fontWeight:600,marginBottom:4}}
                    >
                      {h.name} - {h.address}
                    </button>
                  ))}
                </div>
                <button onClick={()=>setShowHospitalPopup(false)} style={{marginTop:12,background:'#eee',color:'#174c8f',border:'none',borderRadius:8,padding:'6px 18px',fontWeight:600}}>Đóng</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmergencyDonation; 