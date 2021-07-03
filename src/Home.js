import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = (p) => {
  const [Data, setData] = useState({ studname: "" });
  useEffect(() => {
    console.log(p.prop);
    if (Data.studname === "")
      axios.get(`http://localhost:5000/${p.prop}`).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  return (
    <>
      <div className="text-center link-text" hidden={Data.studname !== ""}>
        <a href="/">*** Click Here to fill up the form ***</a>
      </div>
      <div className="details container" hidden={Data.studname === ""}>
        <div className="text-center">
          <h1>Your personal Details</h1>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <h4>{Data.studname}</h4>

          <div className="dp-img">
            <img src={`http://localhost:5000/pic/${Data.dpic}`} alt="DP"></img>
            <p>{Data.studname}</p>
          </div>

          <label>Email:</label>
          <h4>{Data.email}</h4>

          <label>Phone No.</label>
          <h4>{Data.phone}</h4>

          <label>Preferred Language:</label>
          <h4>{Data.language}</h4>

          <label>Qualification:</label>
          <h4>{Data.qualification}</h4>

          <label>Percentage:</label>
          <h4>{Data.percentage}</h4>

          <label>Projects:</label>
          <h4>{Data.projects}</h4>
        </div>
      </div>
    </>
  );
};

export default Home;
