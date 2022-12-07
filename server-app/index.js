const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;

require("dotenv").config();
require('./db/config');

app.use(express.json());
// app.use(routes);
app.use(express.static("files"));

// list all routes 

// server listening 
app.listen(port, (error) => {
  if (error)
      return console.log(error);

  console.log(`listen at port ${port}`);

})

app.get('/' , (req , res) => {
  res.send('server on ');
});