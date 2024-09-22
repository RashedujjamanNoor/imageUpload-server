const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const ImageModel = require("./model/UserModel");
const { log } = require("console");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://noorrk042:iSEVYoAHhbtRijp0@cluster0.4txap.mongodb.net/images?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  await ImageModel.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.listen(5000, () => {
  console.log("server is running at port number 5000");
});
