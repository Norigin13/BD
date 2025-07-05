import './index.css';
import { useState } from "react";
import { FaArrowLeft, FaTint, FaHeart, FaUsers } from "react-icons/fa";

const BLOOD_COMPAT_RECEIVE = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'],
};
const BLOOD_COMPAT_GIVE = {
  'A+': ['A+', 'AB+'],
  'A-': ['A+', 'A-', 'AB+', 'AB-'],
  'B+': ['B+', 'AB+'],
  'B-': ['B+', 'B-', 'AB+', 'AB-'],
  'AB+': ['AB+'],
  'AB-': ['AB+', 'AB-'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'O-': ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
};
const BLOOD_LABEL = {
  'A+': 'Nhóm máu A+',
  'A-': 'Nhóm máu A-',
  'B+': 'Nhóm máu B+',
  'B-': 'Nhóm máu B-',
  'AB+': 'Nhóm máu AB+',
  'AB-': 'Nhóm máu AB-',
  'O+': 'Nhóm máu O+',
  'O-': 'Nhóm máu O-',
};
const BLOOD_COLORS = {
  'A+': 'linear-gradient(135deg, #ef4444, #ec4899)',
  'A-': 'linear-gradient(135deg, #b91c1c, #db2777)',
  'B+': 'linear-gradient(135deg, #3b82f6, #6366f1)',
  'B-': 'linear-gradient(135deg, #1e40af, #3730a3)',
  'AB+': 'linear-gradient(135deg, #a21caf, #ec4899)',
  'AB-': 'linear-gradient(135deg, #6d28d9, #db2777)',
  'O+': 'linear-gradient(135deg, #f59e42, #ef4444)',
  'O-': 'linear-gradient(135deg, #ea580c, #b91c1c)',
};

function BloodTypeCard({ bloodType, label, isSelected, onClick }) {
  return (
    <button
      onClick={() => onClick(bloodType)}
      style={{
        border: isSelected ? '2.5px solid #ef4444' : '2px solid #e5e7eb',
        background: isSelected ? '#fff0f3' : '#fff',
        boxShadow: isSelected ? '0 4px 16px rgba(239,68,68,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
        borderRadius: 16,
        padding: 16,
        margin: 0,
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        minWidth: 120,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: BLOOD_COLORS[bloodType],
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15
        }}>{bloodType}</div>
        <span style={{ fontWeight: 500, color: '#374151' }}>{label}</span>
      </div>
      {isSelected && (
        <div style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaHeart style={{ color: '#fff', fontSize: 14 }} />
        </div>
      )}
    </button>
  );
}

function ResultCard({ title, bloodTypes, icon, gradient }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(23,76,143,0.07)', padding: 24, border: '1px solid #f3f4f6' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: 10, borderRadius: 10, background: gradient, color: '#fff' }}>
        {icon && icon({ style: { fontSize: 20 } })}
        <span style={{ fontWeight: 600, fontSize: 17 }}>{title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {bloodTypes.map(type => (
          <div
            key={type}
            style={{
              padding: 12,
              borderRadius: 10,
              background: BLOOD_COLORS[type],
              color: '#fff',
              textAlign: 'center',
              fontWeight: 500,
              fontSize: 15,
              boxShadow: '0 1px 4px rgba(239,68,68,0.08)',
              transition: 'transform 0.2s',
            }}
          >
            {BLOOD_LABEL[type]}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckBlood() {
  const [selectedBlood, setSelectedBlood] = useState('');
  const bloodTypes = Object.keys(BLOOD_LABEL);
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f2 0%, #fef3c7 100%)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 12px 32px 12px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #ef4444, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaTint style={{ fontSize: 28, color: '#fff' }} />
            </div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Kiểm Tra Tương Thích Nhóm Máu</h1>
          <p style={{ color: '#6b7280', fontSize: 18 }}>Tìm hiểu nhóm máu nào có thể cho và nhận máu từ bạn</p>
        </div>
        {/* Blood Type Selection */}
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(23,76,143,0.07)', padding: 24, marginBottom: 32, border: '1px solid #f3f4f6' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1e293b', marginBottom: 18, display: 'flex', alignItems: 'center' }}>
            <FaHeart style={{ fontSize: 20, color: '#ef4444', marginRight: 10 }} />
            Chọn nhóm máu của bạn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {bloodTypes.map(bloodType => (
              <BloodTypeCard
                key={bloodType}
                bloodType={bloodType}
                label={BLOOD_LABEL[bloodType]}
                isSelected={selectedBlood === bloodType}
                onClick={setSelectedBlood}
              />
            ))}
          </div>
        </div>
        {/* Results */}
        {selectedBlood && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeIn 0.5s' }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 32, padding: '10px 28px', boxShadow: '0 2px 8px rgba(239,68,68,0.08)', border: '1px solid #f3f4f6' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: BLOOD_COLORS[selectedBlood] }}></div>
                <span style={{ fontWeight: 600, color: '#374151' }}>Kết quả cho {BLOOD_LABEL[selectedBlood]}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <ResultCard
                title="Có thể nhận máu từ"
                bloodTypes={BLOOD_COMPAT_RECEIVE[selectedBlood]}
                icon={FaUsers}
                gradient="linear-gradient(90deg, #22c55e, #16a34a)"
              />
              <ResultCard
                title="Có thể cho máu đến"
                bloodTypes={BLOOD_COMPAT_GIVE[selectedBlood]}
                icon={FaHeart}
                gradient="linear-gradient(90deg, #3b82f6, #6366f1)"
              />
            </div>
            {/* Special Notes */}
            <div style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e42)', borderRadius: 18, padding: 24, color: '#fff', marginTop: 8 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center' }}>
                <FaTint style={{ fontSize: 18, marginRight: 8 }} />
                Lưu ý quan trọng
              </h3>
              <p style={{ fontSize: 15, opacity: 0.95 }}>
                Thông tin này chỉ mang tính chất tham khảo. Trước khi thực hiện bất kỳ việc truyền máu nào,
                hãy luôn kiểm tra và xét nghiệm tại cơ sở y tế có thẩm quyền.
              </p>
            </div>
          </div>
        )}
        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#6b7280', fontSize: 15 }}>
            Hiến máu cứu người - Hành động cao đẹp của lòng nhân ái ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckBlood;
