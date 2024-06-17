import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import App from "./App";
import Second from "./Double";
import Thrible from "./Thrible";
import Four from "./Four";

function Nav() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/app" element={<App />} />
        <Route path="/second" element={<Second />} />
        <Route path="/thrible" element={<Thrible />} />
        <Route path="/four" element={<Four />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default Nav;
