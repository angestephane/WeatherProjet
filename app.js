const express = require("express");

//TODO : permet t'utiliser les varible stocker dan =s le .env
//! notre APIKey y est déclaré.
const dotenv = require("dotenv");
dotenv.config();

//Initialisation du projet express
const app = express();

//TODO : pour la manipulation des fichier .json et données reçus via la methode post...
//! doit être installé
const bodyParser = require("body-parser");
const axios = require("axios");

//TODO : Chargement du modele
const Weather = require("./weather");

//? important
// TODO : On autorise notre application à utiliser bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.countryName;
  const unit = "metric";
  const apiKey = process.env.APIKey;
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
      res.write("<p>Temps " + data.msg + "</p>");
      res.write("<img src = " + imageUrl + " />");

      res.send();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("connexion au port " + port);
});
