import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = () => {
  let navigate = useNavigate()
  const [links, setLinks] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const aux = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    axios.post("http://localhost:4000/links", aux, { headers: {
      Authorization : token,
    }}).then(res =>{
        setLinks(res.data)
      }).catch(err =>{
        console.log(err)
        navigate("/login")
      })
  };


 
  useEffect(() => {
      const token = localStorage.getItem("token");
      const aux = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
      axios.post("http://localhost:4000/links", aux, { headers: {
        Authorization : token,
      }}).then(res =>{
        setLinks(res.data)
      }).catch(err =>{
        console.log(err)
        navigate("/login")
      })
      // eslint-disable-next-line
  }, []);

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
                {link.name}
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
