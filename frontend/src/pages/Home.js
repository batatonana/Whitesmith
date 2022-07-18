import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
const Home = () => {
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

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch("http://localhost:4000");
      const json = await response.json();
      if (response.ok) {
        setLinks(json);
      }
    };
    fetchLinks();
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
            <h2>No downloads available for this date</h2>
          )}
          {links &&
            links.links.map((link) => (
              <a key={link.id} href={link.url}>
                {link.url}
                <br />
              </a>
            ))}
        </div>
      </div>
    );
  }
};

export default Home;
