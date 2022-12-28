const express = require('express');
// const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
const errorHandler = require('./helpers/error_handler');

const dotenv = require('dotenv');
require('./db/config');
// Set up Global configuration access
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// list all routes 
// app.use(routes);
app.use('/users' , require('./routes/users'));
app.use('/stadiums' , require('./routes/stadiums'));
app.use('/' , require('./routes/auth'));
app.use('/teams' , require('./routes/teams'));
app.use('/matches' , require('./routes/matches'));
app.use('/referees' , require('./routes/referee'));

// global error handler
app.use(errorHandler);
// server listening 
app.listen(port, (error) => {
  if (error)
      return console.log(error);

  console.log(`listen at port ${port}`);

})

app.get('/' , (req , res) => {
  res.send('server on ');
});