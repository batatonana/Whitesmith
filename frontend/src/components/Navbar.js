import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const logOut = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <div className="fixed_stop">
      <nav className="nav">
        <h1>CircuitApp</h1>
        <ul>
          <li>
            <Link to="/links"> Link Dowloads </Link>
          </li>
          <li>
            <Link to="/fixed_stops"> Fixed Stops </Link>
          </li>
        </ul>
        <button className="logOut" onClick={logOut}>
          logout
        </button>
      </nav>
    </div>
  );
}
