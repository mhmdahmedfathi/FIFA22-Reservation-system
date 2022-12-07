const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

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