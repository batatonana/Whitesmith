import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import FixedStops from "./pages/FixedStops";

function App() {
  return (
    <>
      <Navbar />
      <div className="page">
        <Routes>
          <Route path="/links" element={<Home />} />
          <Route path="/fixed_stops" element={<FixedStops />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
