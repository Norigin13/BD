import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

function DonateRegister() {
  const [form, setForm] = useState({
    location: null,
    date: "",
    notes: "",
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
        member: { memberId: userInfo.memberId },
        location: form.location,
        date: form.date,
        notes: form.notes,
        status: "Pending"
      };
      await api.post("/donation", payload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setSubmitted(true);
    } catch {
      setError("Đăng ký hiến máu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="emergency-donation-bg">
      <div className="emergency-donation-form-container">
        <h1 className="emergency-title">Đăng ký hiến máu</h1>
        {error && <div className="emergency-error">{error}</div>}
        {!submitted ? (
          <form className="emergency-form" onSubmit={handleSubmit}>
            <div className="emergency-row">
              <label style={{flex:1}}>Bệnh viện muốn hiến máu:
                <div style={{display:'flex',gap:8}}>
                  <input
                    type="text"
                    value={form.location ? (form.location.name + ' - ' + form.location.address) : ''}
                    readOnly
                    placeholder="Chọn bệnh viện"
                    style={{flex:1,cursor:'pointer',background:'#f9fafb'}}
                    onClick={()=>setShowHospitalPopup(true)}
                    required
                  />
                </div>
              </label>
              <label style={{flex:1}}>Ngày hiến máu:
                <input type="date" name="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
              </label>
            </div>
            <div className="emergency-row">
              <label>Ghi chú:
                <input type="text" name="notes" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </label>
            </div>
            <button type="submit" className="emergency-submit">Gửi đăng ký hiến máu</button>
          </form>
        ) : (
          <div className="emergency-success">
            Đăng ký hiến máu thành công!<br />
            Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
            <button className="emergency-new" onClick={() => {
              setSubmitted(false);
              setForm({ location: null, date: "", notes: "" });
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
                      setForm(f => ({ ...f, location: h }));
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