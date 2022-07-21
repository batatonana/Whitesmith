import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="page">
          <Routes>
            <Route path="/" element= {<Home/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
