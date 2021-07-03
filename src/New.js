import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const New = (p) => {
  const history = useHistory();
  const [Image, setImage] = useState(null);
  const [Data, setData] = useState({
    studname: "",
    file: "",
    email: "",
    phone: "",
    language: "",
    qualification: "",
    percentage: "",
    projects: "",
  });
  function updateInput(e) {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
    console.log(Data);
  }

  function sendData(event) {
    event.preventDefault();
    const fd = new FormData();
    console.log(Image);
    fd.append("file", Image, Image.name);
    fd.append("data", JSON.stringify(Data));
    console.log("formData: ", fd);
    axios
      .post("http://localhost:5000/student-form", fd)
      .then((res) => {
        console.log(res.data._id);
        onRec(res.data._id);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }
  const [File, setFile] = useState({ file: null });
  function fileChange(e) {
    setImage(e.target.files[0]);
    let image = e.target.files[0];
    console.log("Image: ", image);
    if (image) {
      setData({ ...Data, file: image });
      setFile({ file: URL.createObjectURL(image) });
    } else setFile({ file: null });
  }

  function onRec(data) {
    console.log("rec");
    p.clicked(data);
    history.push("/home");
  }

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1>Student Database Form</h1>
          <p>Fill up your details.</p>
        </div>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="name"
              className="form-control"
              id="exampleInputName"
              name="studname"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="dp form-group">
            <label>Upload yor photo:</label>
            <input type="file" name="file" onChange={fileChange}></input>
            <div className="img" hidden={File.file === null}>
              <img src={File.file} alt="dp"></img>
            </div>
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Phone No.</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="phone"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Preferred Language: </label>
            <select
              name="language"
              onChange={updateInput}
              required
              className="form-control"
            >
              <option>Choose...</option>
              <option value="JS">JS</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
          </div>

          <div className="form-group">
            <label>Educational Qualification: </label>
            <select
              name="qualification"
              onChange={updateInput}
              required
              id="inputState"
              className="form-control"
            >
              <option>Choose...</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.sc.">B.sc.</option>
            </select>
          </div>
          <div className="form-group">
            <label>Percentage: </label>
            <input
              type="score"
              className="form-control"
              id="exampleInputScore"
              name="percentage"
              onChange={updateInput}
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Project Done:</label>
            <textarea
              className="form-control"
              id="exampleFormControlScore"
              rows="3"
              name="projects"
              onChange={updateInput}
              required
            ></textarea>
          </div>
        </form>
        <button type="submit" className="btn btn-success" onClick={sendData}>
          Submit
        </button>
      </div>
    </>
  );
};

export default New;
