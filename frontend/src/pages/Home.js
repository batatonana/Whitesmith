import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [links, setLinks] = useState(null);
  const [date, setDate] = useState();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(date)
    console.log(JSON.stringify(date))
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      body: JSON.stringify(date),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok){
      console.log("ERROR")
    }
    if(response.ok){
      console.log("FINALYYY")
    }
  }

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
      setDate(
        new Date(links.links[0].date[0], links.links[0].date[1] - 1)
      );
    }
    // eslint-disable-next-line
  }, [links]);

  if (links != null) {
    return (
      <div className="home">
        <h1>
          Download links from: {links.links[0].date[1]}/{links.links[0].date[0]}
        </h1>
        <br />
        <form className="datemodify" onSubmit={handleSubmit}>
          <label>Select Date: </label>
          <DatePicker
            selected={date}
            onChange={(e) => setDate(e)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
          />
          <button>Search</button>
        </form>
        <br />
        <br />
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
