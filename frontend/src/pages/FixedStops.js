import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Papa from "papaparse";
import { CSVLink } from "react-csv";

const FixedStops = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const reader = new FileReader();
  const csvHeader = [
    {label: "_id", key: "_id"},
    {label: "businessName", key: "businessName"},
    {label: "mapLocation.coordinates", key: "mapLocation.coordinates"},
    {label: "mapLocation.type", key: "mapLocation.type"},
    {label: "name", key: "name"},
    {label: "status", key: "status"},
  ]

  const [error, setError] = useState("");
  const [locations, setLocations] = useState(null);
  const [location, setLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [file, setFile] = useState("");
  const [stops, setStops] = useState([]);


  // when changing a file
  const handleFileChange = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      setFile(inputFile);
    }
  };

  // when parsing a file
  const handleParse = () => {
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      if (location === "") {
        setError("Select a location.");
      } else {
        // send the csv information into the backend
        axios
          .post(
            "http://localhost:4000/fixedstops",
            { parsedData, location },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            const locId = location;
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
              });
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });
      }
    };
    if (file) {
      reader.readAsText(file);
      setError("");
    } else {
      setError("Please select a file");
    }
  };

  // when changing city on the selector
  const handleChange = (event) => {
    const locId = event.target.value;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i]._id === locId) {
        setLocationName(locations[i].location);
      }
    }
    setLocation(locId);
    // fetch data related to the location
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
  console.log(stops)
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
        <p className="error">{error}</p>
        <div className="fixedstops">
          <div className="split left">
            {stops.length === 0 && (
              <h2>Select a location to see fixed stops</h2>
            )}
            {stops.length !== 0 && (
              <div className="fixedstop-show">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Business Name</th>
                      <th>Longitude</th>
                      <th>Latitude</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stops.map((stop) => (
                      <tr key={stop._id}>
                        <td>{stop.name}</td>
                        <td>{stop.businessName}</td>
                        <td>{stop.mapLocation.coordinates[0]}</td>
                        <td>{stop.mapLocation.coordinates[1]}</td>
                        <td>{stop.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CSVLink data={stops} filename={locationName + "_stops"} headers={csvHeader}>
                  Download
                </CSVLink>
              </div>
            )}
          </div>
          <div className="split right">
            <div className="fixedstop-select">
              <label htmlFor="csvInput" style={{ display: "block" }}>
                Drag csv file here to Upload.
              </label>
              <input
                onChange={handleFileChange}
                accept={".csv"}
                id="csvInput"
                name="file"
                type="File"
              />
              <button onClick={handleParse}>Upload</button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default FixedStops;
