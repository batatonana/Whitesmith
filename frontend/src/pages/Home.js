import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  
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
    if (links != null) {
      console.log(startDate);
    }
  }, [date, links]);

  if (links != null) {
    return (
      <div className="home">
        <h1>
          Download links from {links.links[0].date[1]}/{links.links[0].date[0]}
        </h1>
        <form>
          <label>
            Date:
            <input type="text" name="date" />
          </label>
          <input type="submit" value="submit" />
        </form>
        <br />
        <div className="form-group">
            <label>Select Date: </label>
            <DatePicker
            selected={startDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
        <div className="links">
          {links &&
            links.links.map((link) => (
              <a key={link.id} href={link.url}>
                {link.url}
                <br />
                <br />
              </a>
            ))}
        </div>
      </div>
    );
  }
};

export default Home;
