import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"

const FixedStops = () => {
  const [locations, setLocations] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [location, setLocation] = useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/locations", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
  }, [location])

  if (locations !== null) {
    return (
      <div className="dropdownSelect">
        <label>
          Chose a Location to se the fixed stops
          <select value={location} onChange={handleChange}>
            {locations.map((location) => (
              <option  key={location._id} value={location.location}>{location.location}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }
};

export default FixedStops;
