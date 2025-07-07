import "../emergency-donation/emergency-donation.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

function DonateRegister() {
  const [form, setForm] = useState({
    full_name: "",
    dob: "",
    blood_type: "",
    phone: "",
    address: "",
    location_id: "",
    needed_date: "",
    note: "",
    component_id: "",
    is_emergency: false,
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
    const match = address.match(/(Quận \d+|Q\.?\s*\d+|Bình Thạnh|Phú Nhuận|Tân Bình|Tân Phú|Gò Vấp|Bình Tân|Thủ Đức|Hóc Môn|Củ Chi|Nhà Bè|Bình Chánh|Cần Giờ)/i);
    if (!match) return null;
    let district = match[0].trim();
    if (/^Q\.?\s*\d+$/i.test(district)) {
      district = district.replace(/^Q\.?\s*/i, 'Quận ');
    }
    return district;
  };

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    api.get('/location')
      .then(res => {
        setLocations(res.data);
        const uniqueDistricts = Array.from(new Set(
          res.data.filter(l => l.city === 'TP.HCM').map(l => getDistrictFromAddress(l.address)).filter(Boolean)
        ));
        setPopupDistricts(uniqueDistricts);
      })
      .catch(() => setLocations([]));
  }, []);

  const handlePopupDistrictChange = (e) => {
    const district = e.target.value;
    setPopupDistrict(district);
    const filtered = locations.filter(l => l.city === 'TP.HCM' && getDistrictFromAddress(l.address) === district);
    setPopupHospitals(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
      return;
    }
    try {
      const payload = {
        ...form,
        member_id: userInfo.memberId,
        created_at: new Date().toISOString(),
        is_emergency: false,
      };
      await api.post("/blood-request", payload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setSubmitted(true);
    } catch {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  const selectedLocation = locations.find(l => String(l.locationId) === String(form.location_id));

  return (
    <div className="emergency-donation-bg">
      <div className="emergency-donation-form-container">
        <h1 className="emergency-title">Đăng ký hiến máu</h1>
        {error && <div className="emergency-error">{error}</div>}
        {!submitted ? (
          <form className="emergency-form" onSubmit={handleSubmit}>
            <div className="emergency-row">
              <label>Họ tên:<input type="text" name="full_name" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} required /></label>
              <label>Ngày sinh:<input type="date" name="dob" value={form.dob} onChange={e => setForm(f => ({ ...f, dob: e.target.value }))} required /></label>
            </div>
            <div className="emergency-row">
              <label>Nhóm máu:
                <select name="blood_type" value={form.blood_type} onChange={e => setForm(f => ({ ...f, blood_type: e.target.value }))} required>
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
              <label>Số điện thoại:<input type="tel" name="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required /></label>
            </div>
            <div className="emergency-row">
              <label>Địa chỉ:<input type="text" name="address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} required /></label>
            </div>
            <div className="emergency-row">
              <label style={{flex:1}}>Bệnh viện muốn hiến máu:
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
              <label style={{flex:1}}>Ngày cần hiến máu:
                <input type="date" name="needed_date" value={form.needed_date} onChange={e => setForm(f => ({ ...f, needed_date: e.target.value }))} required />
              </label>
            </div>
            <div className="emergency-row">
              <label>Thành phần máu:
                <select name="component_id" value={form.component_id} onChange={e => setForm(f => ({ ...f, component_id: e.target.value }))} required>
                  <option value="">Chọn thành phần máu</option>
                  <option value="1">Hồng cầu</option>
                  <option value="2">Tiểu cầu</option>
                  <option value="3">Huyết tương</option>
                  <option value="4">Bạch cầu</option>
                </select>
              </label>
              <label>Ghi chú:<input type="text" name="note" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} /></label>
            </div>
            <button type="submit" className="emergency-submit">Gửi đăng ký hiến máu</button>
          </form>
        ) : (
          <div className="emergency-success">
            Đăng ký hiến máu thành công!<br />
            Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
            <button className="emergency-new" onClick={() => {
              setSubmitted(false);
              setForm({ full_name: "", dob: "", blood_type: "", phone: "", address: "", location_id: "", needed_date: "", note: "", component_id: "", is_emergency: false });
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
  );
}

export default DonateRegister; 