require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weatherinfo", (req, res) => {
  axios
    .get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: req.body.city,
        units: req.body.units,
        appid: process.env.APP_ID,
      },
    })
    .then((response) => {
      res.render("weatherinfo", {
        date: response.headers.date,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        speed: response.data.wind.speed,
        temp: Math.round(response.data.main.temp),
        icon: response.data.weather[0].icon,
        country: response.data.sys.country,
        city: response.data.name,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
