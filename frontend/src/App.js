import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const user = false;
  return (
    <div className="App">
      <BrowserRouter>
        <div className="page">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
            <Route path="/login" element={user ? <Navigate to="/"/> : <Login/> }  />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
