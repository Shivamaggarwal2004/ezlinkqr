const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = process.env.PORT  || 5700;


app.use(express.static(path.join(__dirname, "public")));


app.use("/files", express.static(path.join(__dirname, "upload_folder")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_folder");
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + path.extname(file.originalname);
    cb(null, newName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.post("/sub", upload.single("user_file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/files/${req.file.filename}`;
  res.send(fileUrl);
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port)