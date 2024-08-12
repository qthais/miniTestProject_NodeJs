const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const cors= require('cors')
const db=require('./config/dbConnect')
const route=require('./routes/index')
const multer = require('multer');
// Configure multer
const upload = multer(); // For handling form-data without files
app.use(upload.none());
const port = 3000
var corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect()
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})