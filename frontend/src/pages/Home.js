import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  let navigate = useNavigate()
  const [links, setLinks] = useState(null);
  const [date, setDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aux = {
      month: parseInt(JSON.stringify(date).split("-")[1]).toString(),
      year: JSON.stringify(date).split("-")[0].split('"')[1],
    };
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(aux),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log("ERROR");
    }
    if (response.ok) {
      setLinks(json);
    }
  };

  const logOut = () => {
    localStorage.clear()
    window.location.reload(false);
  }
 
  useEffect(() => {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:4000", { headers: {
        Authorization : token,
      }}).then(res =>{
        setLinks(res.data)
      }).catch(err =>{
        console.log(err)
        navigate("/login")
      })
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (links != null && Object.keys(links.links).length !== 0) {
      setDate(
        new Date(Date.UTC(links.links[0].date[0], links.links[0].date[1] - 1))
      );
    }
    // eslint-disable-next-line
  }, [links]);

  if (links != null) {
    return (
      <div>
        <button className="logOut" onClick={logOut}>logout</button>
        <div className="home">
          <h1>Download links from: </h1>
          <form className="datemodify" onSubmit={handleSubmit}>
            <DatePicker
              wrapperClassName="date-picker"
              selected={date}
              onChange={(e) => setDate(e)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
            />
            <button className="form-b">Search</button>
          </form>
        </div>
        <div className="links">
          {Object.keys(links.links).length === 0 && (
            <h2>No files available for this date</h2>
          )}
          {links &&
            links.links.map((link) => (
              <a key={link.id} href={link.url}>
                {link.url}
                <br />
              </a>
            ))}
        </div>
        {links.zip && <a href={links.zip} className="buttonZip">.zip file</a>}
      </div>
    );
  }
};

export default Home;
