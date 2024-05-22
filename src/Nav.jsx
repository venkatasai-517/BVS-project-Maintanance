import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import App from "./App";

function Nav() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/app" element={<App />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default Nav;
