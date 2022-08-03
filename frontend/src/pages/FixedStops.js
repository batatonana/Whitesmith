import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Papa from "papaparse";

const FixedStops = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const reader = new FileReader();

  const [locations, setLocations] = useState(null);
  const [location, setLocation] = useState("");
  const [file, setFile] = useState("");
  const [stops, setStops] = useState([]);

  const handleFileChange = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      if (location === "") {
        //Fill data here
      } else {
        axios.post(
          "http://localhost:4000/fixedstops",
          { parsedData, location },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }
    };
    reader.readAsText(file);
  };

  const handleChange = (event) => {
    const locId = event.target.value;
    setLocation(locId);
    axios
      .post(
        "http://localhost:4000/locations",
        { locId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setStops(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };

  // Post request to fetch all the locations
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
    // eslint-disable-next-line
  }, []);

  if (locations !== null) {
    return (
      <>
        <div className="dropdownSelect">
          <label>
            Chose a Location to se the fixed stops
            <select value={location} onChange={handleChange}>
              <option key={0} value="">
                ---- Select a location ----
              </option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.location}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="fixedstops">
          <div className="fixedstop-select">
            <label htmlFor="csvInput" style={{ display: "block" }}>
              Enter CSV File
            </label>
            <input
              onChange={handleFileChange}
              accept={".csv"}
              id="csvInput"
              name="file"
              type="File"
            />
            <button onClick={handleParse}>Parse</button>
          </div>
          <div className="fixedstop-show">
            {stops.map((stop) => (
              <li key={stop._id} value={stop._id}>
                {stop.location}
              </li>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default FixedStops;
