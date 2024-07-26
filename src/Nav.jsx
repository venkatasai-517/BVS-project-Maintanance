import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import App from "./App";
import Second from "./Double";
import Thrible from "./Thrible";
import Four from "./Four";
import Student from "./Studentdetails";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Dashboard from "./components/Dashboard";
import Room_no from "./components/Room_no";
import G1 from "./components/G1";
import G2 from "./components/G2.jsx";
import Rooms from "./Rooms";
import A1 from "./components/A1.jsx";
import A2 from "./components/A2.jsx";
import A3 from "./components/A3.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function Nav() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PublicRoute component={Login} />} />
        <Route path="/login" element={<PublicRoute component={Login} />} />

        <Route path="/signup" element={<PublicRoute component={Signup} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path="/rooms" element={<PrivateRoute component={Rooms} />} />
        <Route path="/room_no" element={<PrivateRoute component={Room_no} />} />
        <Route path="/g1" element={<PrivateRoute component={G1} />} />

        <Route path="/g2" element={<PrivateRoute component={G2} />} />
        <Route path="/a1" element={<PrivateRoute component={A1} />} />
        <Route path="/a2" element={<PrivateRoute component={A2} />} />
        <Route path="/a3" element={<PrivateRoute component={A3} />} />
        <Route path="/app" element={<PrivateRoute component={App} />} />
        <Route path="/second" element={<PrivateRoute component={Second} />} />
        <Route path="/thrible" element={<PrivateRoute component={Thrible} />} />
        <Route path="/four" element={<PrivateRoute component={Four} />} />
        <Route
          path="/studentdetails"
          element={<PrivateRoute component={Student} />}
        />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default Nav;
