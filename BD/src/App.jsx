import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CheckBlood from "./assets/checkBlood/checkBlood";
import News from "./page/news/new";
import Faq from "./page/faq/faq";
import NewsDetail from "./page/news/NewsDetail";
import Home from "./page/home";
import Header from "./components/header";
import Footer from "./components/footer";
import Register from "./page/register";
import DonateRegister from "./page/donate-register";
import Login from "./page/login";
import Contact from "./page/contact";
import EmergencyDonation from "./page/emergency-donation/index.jsx";
import DonationHistory from "./page/staff/index.jsx";
import UserProfile from "./page/user/index.jsx";
import ReceiveBlood from "./page/receive-blood/index.jsx";
import EmergencyReceiveBlood from "./page/emergency-receive-blood/index.jsx";
import AdminDashboard from "./page/admin/index.jsx";
import AdminUsers from "./page/admin/users.jsx";
import AdminBloodInventory from "./page/admin/blood-inventory.jsx";
import AdminDonationRequests from "./page/admin/donation-requests.jsx";
import AdminBloodRequests from "./page/admin/blood-requests.jsx";
import AdminStaff from "./page/admin/staff.jsx";
import AdminBloodUnits from "./page/admin/blood-units.jsx";
import AdminBloodComponents from "./page/admin/blood-components.jsx";
import AdminLocations from "./page/admin/locations.jsx";
import AdminProcesses from "./page/admin/processes.jsx";
import AdminReminders from "./page/admin/reminders.jsx";
import SidebarLayout from "./page/admin/SidebarLayout.jsx";

const BLOOD_COMPAT = {
  A: ["A", "O"],
  B: ["B", "O"],
  AB: ["A", "B", "AB", "O"],
  O: ["O"],
};

const BLOOD_LABEL = {
  A: "Nhóm máu A",
  B: "Nhóm máu B",
  AB: "Nhóm máu AB",
  O: "Nhóm máu O",
};

function App() {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <Header />
                <News />
                <Footer />
              </>
            }
          />
          <Route
            path="/news/:id"
            element={
              <>
                <Header />
                <NewsDetail />
                <Footer />
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <Header />
                <Faq />
                <Footer />
              </>
            }
          />
          <Route
            path="/check-blood"
            element={
              <>
                <Header />
                <CheckBlood onBack={() => window.history.back()} />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/donate-register"
            element={
              <>
                <Header />
                <DonateRegister />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/emergency-donation" element={<EmergencyDonation />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/receive-blood" element={<ReceiveBlood />} />
          <Route path="/emergency-receive-blood" element={<EmergencyReceiveBlood />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/blood-inventory" element={<AdminBloodInventory />} />
          <Route path="/admin/donation-requests" element={<AdminDonationRequests />} />
          <Route path="/admin/blood-requests" element={<AdminBloodRequests />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/blood-units" element={<AdminBloodUnits />} />
          <Route path="/admin/blood-components" element={<AdminBloodComponents />} />
          <Route path="/admin/locations" element={<AdminLocations />} />
          <Route path="/admin/processes" element={<AdminProcesses />} />
          <Route path="/admin/reminders" element={<AdminReminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
