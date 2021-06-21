require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

app.get("/", (req, res, next) => {
  return res.send("Server is running.");
});
app.use('/movies', movieRoutes);

app.listen(9000);
