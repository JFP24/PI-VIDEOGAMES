require("dotenv").config();
const { APIKEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Genre } = require("../db");
//const API_KEY = "6e8808d878214d6f92a405391eb98da9";
const { API_KEY } = process.env;
const URL = "https://api.rawg.io/api/";

//TODO -----> GET a "/genres" <--------

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${URL}genres?key=${API_KEY}`);
    const genres = response.data.results;
    const genresDb = await Genre.findAll();
    genres.forEach(async (g) => {
      await Genre.findOrCreate({
        where: {
          name: g.name,
        },
      });
    });
    //Solo envio la informacion necesaria a el front
    const allGenres = genres.map((game) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
    return res.json(allGenres);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
