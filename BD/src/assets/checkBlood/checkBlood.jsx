import './index.css';
import { useState } from "react";

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

function CheckBlood({ onBack }) {
  const [blood, setBlood] = useState('');
  return (
    <div className="blood-compat-page">
      <div className="blood-compat-content">
        <button className="back-btn" onClick={() => onBack('home')}>← Quay lại trang chủ</button>
        <h1>Kiểm tra tương thích nhóm máu</h1>
        <label>Nhóm máu của bạn:
          <select value={blood} onChange={e => setBlood(e.target.value)}>
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
        {blood && (
          <>
            <div className="blood-result">
              <b>Các nhóm máu bạn có thể nhận:</b>
              <ul>
                {BLOOD_COMPAT_RECEIVE[blood].map(type => (
                  <li key={type}>{BLOOD_LABEL[type]}</li>
                ))}
              </ul>
            </div>
            <div className="blood-result">
              <b>Nhóm máu có thể nhận máu của bạn:</b>
              <ul>
                {BLOOD_COMPAT_GIVE[blood].map(type => (
                  <li key={type}>{BLOOD_LABEL[type]}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckBlood;
