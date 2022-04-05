const express = require("express");
//Initialisation du projet express
const app = express();

const bodyParser = require("body-parser");
const axios = require("axios");
const Weather = require("./weather");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.countryName;
  const unit = "metric";
  const apiKey = process.env.API_KEY;

  //Recupère la ressource de nos données
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey +
    "&lang=fr";
  axios
    .get(url)
    .then((response) => {
      console.log("code reponse : ", response.status);
      const data = new Weather(
        response.data.main.temp,
        response.data.name,
        response.data.weather[0].description,
        response.data.weather[0].icon
      );
      imageUrl = "http://openweathermap.org/img/wn/" + data.icon + "@2x.png";
      res.set({ "Content-Type": "text/html; charset=utf-8" });
      res.write(
        "<h1>Il fait " +
          data.temperature +
          " degre celsius " +
          data.country +
          " </h1>"
      );
      res.write("<p>La meteo est actuellemnt " + data.msg + "</p>");
      res.write("<img src = " + imageUrl + " />");

      res.send();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("connexion au port 3000");
});
