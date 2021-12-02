require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const errorHandaler = require("./helper/error-handaler");
var corsOptions = {
    origin: 'https://kalli.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(errorHandaler);

// input from env
const DATABASE = process.env.DATABASE;
const BASEURL = process.env.PORT || 3000;
const apiUrl = "/api/v1/";

// routes
const BrandRoute = require("./routers/brand");
const ProductRoute = require("./routers/product");
const ColorRoute = require("./routers/color");
const SizeRoute = require("./routers/size");
const OrderRoute = require("./routers/order");
const UserRoute = require("./routers/user");

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(`${apiUrl}brands`, BrandRoute);
app.use(`${apiUrl}products`, ProductRoute);
app.use(`${apiUrl}colors`, ColorRoute);
app.use(`${apiUrl}sizes`, SizeRoute);
app.use(`${apiUrl}orders`, OrderRoute);
app.use(`${apiUrl}users`, UserRoute);

mongoose.connect(DATABASE, () => {
  app.listen(BASEURL, () => {
    console.log(`Server listen on localhost:${BASEURL}`);
  });
});
