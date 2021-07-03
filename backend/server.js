const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const student = require("./models/students");
const multer = require("multer");
const path = require("path");

const app = express();

const imgPath = path.join(__dirname, "img");

mongoose.connect(
  "mongodb+srv://Test0:test0@cluster0.v9zal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected . . .");
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgPath );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    student
      .findOne({ _id: id })
      .then((response) => {
        // response.dpic = `E:/React/test/backend/img/${response.dpic}`;
        console.log(response);
        return res.json(response);
      })
      .catch((err) => console.log(err));
  }
});

app.get("/pic/:pic", (req, res) => {
  const { pic } = req.params;
  try {
    res.sendFile(`${imgPath}${path.sep}${pic}`);
  } catch (err) {
    console.log(err);
  }
});

app.post("/student-form", upload.single("file"), (req, res) => {
  console.log("Received ", req.file);
  console.log("BODY: ", req.body.data);
  const data = JSON.parse(req.body.data);
  const newStudent = new student({
    studname: data.studname,
    dpic: req.file.filename,
    email: data.email,
    phone: data.phone,
    language: data.language,
    qualification: data.qualification,
    percentage: data.percentage,
    projects: data.projects,
  });
  newStudent
    .save()
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000 . . .");
});
