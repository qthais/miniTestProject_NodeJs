const express = require('express')
const app = express()
const cors= require('cors')
const db=require('./config/dbConnect')
const route=require('./routes/index')
const multer = require('multer');
// Configure multer
const upload = multer(); // For handling form-data without files
app.use(upload.none());
const port = 3000
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect()
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})