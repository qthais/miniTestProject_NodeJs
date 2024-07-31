const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
// const morgan = require('morgan');
const cors=require('cors');
const { engine, create } = require('express-handlebars');
const app = express();
const db= require('./config/db/')
const hbs = create({
  extname: '.hbs',
  // Specify helpers which are only registered on this instance.
  helpers: {
      sum:(a,b)=>a+b
  }
});
db.connect()
//connect db
const port = 3000;
const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(cors());
// HTTP logger
// app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Template engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
