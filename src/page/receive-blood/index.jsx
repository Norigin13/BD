import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import api from "../../config/axios";
import { FaFileWord } from "react-icons/fa";
import mammoth from "mammoth";

function ReceiveBlood() {
  const [form, setForm] = useState({
    fullName: "",
    bloodType: "",
    contact: "",
    hospital: "",
    neededDate: "",
    note: "",
    component: "",
    isEmergency: false,
  });
  const [locations, setLocations] = useState([]);
  const [components, setComponents] = useState([]);
  const [showHospitalPopup, setShowHospitalPopup] = useState(false);
  const [popupDistrict, setPopupDistrict] = useState("");
  const [popupDistricts, setPopupDistricts] = useState([]);
  const [popupHospitals, setPopupHospitals] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Tham chiếu input file ẩn cho icon
  const fileInputRef = React.useRef();

  // Hàm tách quận/huyện từ address
  const getDistrictFromAddress = (address) => {
    const match = address.match(
      /(Quận \d+|Q\.?\s*\d+|Bình Thạnh|Phú Nhuận|Tân Bình|Tân Phú|Gò Vấp|Bình Tân|Thủ Đức|Hóc Môn|Củ Chi|Nhà Bè|Bình Chánh|Cần Giờ)/i
    );
    if (!match) return null;
    let district = match[0].trim();
    if (/^Q\.?\s*\d+$/i.test(district)) {
      district = district.replace(/^Q\.?\s*/i, "Quận ");
    }
    return district;
  };

  const isFutureDate = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    today.setHours(0,0,0,0);
    date.setHours(0,0,0,0);
    // Phải lớn hơn hôm nay ít nhất 1 ngày
    return date > today;
  };

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token || !userInfo.memberId) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    setForm((f) => ({
      ...f,
      fullName: userInfo.full_name || "",
      contact: userInfo.phone || "",
      bloodType: userInfo.blood_type || "",
    }));
  }, [navigate]);

  useEffect(() => {
    api
      .get("/location")
      .then((res) => {
        setLocations(res.data);
        const uniqueDistricts = Array.from(
          new Set(
            res.data
              .filter((l) => l.city === "TP.HCM")
              .map((l) => getDistrictFromAddress(l.address))
              .filter(Boolean)
          )
        );
        setPopupDistricts(uniqueDistricts);
      })
      .catch(() => setLocations([]));
  }, []);

  useEffect(() => {
    api.get('/blood-component')
      .then(res => setComponents(res.data))
      .catch(() => setComponents([]));
  }, []);

  const handlePopupDistrictChange = (e) => {
    const district = e.target.value;
    setPopupDistrict(district);
    const filtered = locations.filter(
      (l) =>
        l.city === "TP.HCM" && getDistrictFromAddress(l.address) === district
    );
    setPopupHospitals(filtered);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      mammoth
        .extractRawText({ arrayBuffer })
        .then((result) => {
          const text = result.value;
          // Tìm dòng chứa 'Nếu “có”, ghi cụ thể tên bệnh:'
          const diseaseLine = text
            .split("\n")
            .find(
              (line) =>
                line.toLowerCase().includes("nếu") &&
                line.toLowerCase().includes("ghi cụ thể tên bệnh")
            );
          if (diseaseLine) {
            // Lấy phần sau dấu ':' hoặc '：'
            const match = diseaseLine.match(/[:：](.*)/);
            if (match && match[1].trim()) {
              let diseases = match[1].replace(/\s+/g, " ").trim();
              let noteText =
                "Tiền sử bệnh/tật: (các bệnh bẩm sinh và mạn tính): " +
                diseases;
              setForm((f) => ({ ...f, note: noteText }));
              return;
            }
          }
          // Nếu không tìm thấy đúng mẫu, fallback về logic cũ
          let cMatch = text.match(/c[).\-\s]+([\s\S]*?)(?=\n\s*d[).\-\s])/i);
          let dMatch = text.match(
            /d[).\-\s]+([\s\S]*?)(?=\n\s*[a-z][).\-\s]|$)/i
          );
          let noteText = "";
          if (cMatch) noteText += "c) " + cMatch[1].trim() + "\n";
          if (dMatch) noteText += "d) " + dMatch[1].trim();
          if (noteText) {
            setForm((f) => ({ ...f, note: noteText.trim() }));
          } else {
            alert("Không tìm thấy thông tin phần c) và d) trong file.");
          }
        })
        .catch((err) => {
          alert("Lỗi đọc file: " + err.message);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isFutureDate(form.neededDate)) {
      setError("Ngày cần máu phải là ngày trong tương lai và cách hôm nay ít nhất 1 ngày.");
      return;
    }
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      navigate("/login");
      return;
    }
    try {
      const selectedLocation = locations.find(
        (l) => String(l.locationId) === String(form.hospital)
      );
      const payload = {
        member: { memberId: userInfo.memberId },
        fullName: form.fullName,
        bloodType: form.bloodType,
        component: form.component ? { componentId: Number(form.component) } : undefined,
        hospital: selectedLocation ? selectedLocation.name : "",
        contact: form.contact,
        latitude: selectedLocation ? selectedLocation.latitude : 0,
        longitude: selectedLocation ? selectedLocation.longitude : 0,
        neededDate: form.neededDate,
        isEmergency: 0, // luôn là 0 vì không phải khẩn cấp
        note: form.note,
        createdAt: new Date().toISOString(),
      };
      await api.post("/blood-request", payload, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setSubmitted(true);
    } catch {
      setError("Đăng ký nhận máu thất bại. Vui lòng thử lại.");
    }
  };

  const selectedLocation = locations.find(
    (l) => String(l.locationId) === String(form.hospital)
  );

  return (
    <>
      <Header />
      <div className="emergency-donation-bg">
        <div className="emergency-donation-form-container">
          <h1 className="emergency-title">Đăng ký nhận máu</h1>
          {!isAuthenticated ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                Vui lòng đăng nhập để tiếp tục
              </div>
              <button 
                onClick={() => navigate("/login")}
                style={{
                  background: "#174c8f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Đăng nhập
              </button>
            </div>
          ) : (
            <>
              {error && <div className="emergency-error">{error}</div>}
              {!submitted ? (
            <form className="emergency-form" onSubmit={handleSubmit}>
              <div className="emergency-row">
                <label>
                  Họ tên:
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, fullName: e.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  Nhóm máu:
                  <select
                    name="bloodType"
                    value={form.bloodType}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bloodType: e.target.value }))
                    }
                    required
                  >
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
                <label>
                  Số điện thoại:
                  <input
                    type="tel"
                    name="contact"
                    value={form.contact}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contact: e.target.value }))
                    }
                    required
                  />
                </label>
              </div>
              <div className="emergency-row">
                <label style={{ flex: 1 }}>
                  Bệnh viện cần máu:
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="text"
                      value={
                        selectedLocation
                          ? selectedLocation.name +
                            " - " +
                            selectedLocation.address
                          : ""
                      }
                      readOnly
                      placeholder="Chọn bệnh viện"
                      style={{
                        flex: 1,
                        cursor: "pointer",
                        background: "#f9fafb",
                      }}
                      onClick={() => setShowHospitalPopup(true)}
                    />
                  </div>
                </label>
                <label style={{ flex: 1 }}>
                  Ngày cần máu:
                  <input
                    type="date"
                    name="neededDate"
                    value={form.neededDate}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, neededDate: e.target.value }))
                    }
                    required
                  />
                </label>
              </div>
              <div className="emergency-row">
                <label>
                  Thành phần máu:
                  <select
                    name="component"
                    value={form.component}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, component: e.target.value }))
                    }
                    required
                  >
                    <option value="">Chọn thành phần máu</option>
                    {components.map(c => (
                      <option key={c.componentId} value={c.componentId}>{c.name}</option>
                    ))}
                  </select>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                  }}
                >
                  Ghi chú:
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      type="text"
                      name="note"
                      value={form.note}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, note: e.target.value }))
                      }
                      style={{ width: "100%", paddingRight: 36 }}
                    />
                    <FaFileWord
                      color="#2B579A"
                      size={22}
                      style={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        fileInputRef.current && fileInputRef.current.click()
                      }
                    />
                    <input
                      type="file"
                      accept=".docx"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                </label>
              </div>
              <button type="submit" className="emergency-submit">
                Gửi đăng ký nhận máu
              </button>
            </form>
          ) : (
            <div className="emergency-success">
              Đăng ký nhận máu thành công!
              <br />
              Chúng tôi sẽ liên hệ bạn sớm nhất có thể.
              <button
                className="emergency-new"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    fullName: "",
                    bloodType: "",
                    contact: "",
                    hospital: "",
                    neededDate: "",
                    note: "",
                    component: "",
                    isEmergency: false,
                  });
                }}
              >
                Đăng ký mới
              </button>
            </div>
          )}
          {showHospitalPopup && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: 32,
                  borderRadius: 12,
                  minWidth: 320,
                  boxShadow: "0 2px 16px rgba(23,76,143,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <h3>Chọn bệnh viện (TP.HCM)</h3>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <select
                    value={popupDistrict}
                    onChange={handlePopupDistrictChange}
                    style={{ padding: 8, borderRadius: 6 }}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {popupDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    minWidth: 260,
                  }}
                >
                  {popupHospitals.length === 0 ? (
                    <div>Chọn quận để xem bệnh viện.</div>
                  ) : (
                    popupHospitals.map((h) => (
                      <button
                        key={h.locationId}
                        type="button"
                        onClick={() => {
                          setForm((f) => ({
                            ...f,
                            hospital: String(h.locationId),
                          }));
                          setShowHospitalPopup(false);
                          setPopupDistrict("");
                          setPopupHospitals([]);
                        }}
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "10px 18px",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {h.name} - {h.address}
                      </button>
                    ))
                  )}
                </div>
                <button
                  onClick={() => setShowHospitalPopup(false)}
                  style={{
                    marginTop: 12,
                    background: "#eee",
                    color: "#174c8f",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 18px",
                    fontWeight: 600,
                  }}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReceiveBlood;