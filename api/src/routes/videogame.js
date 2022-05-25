//require("dotenv").config();
const express = require("express");
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
//const API_KEY = "6e8808d878214d6f92a405391eb98da9";
const URL = "https://api.rawg.io/api/";
const router = express();
router.use(express.json());
//GET /videogame/:idVideoGame
// consulto el detalle del juego por el ID
router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  //verifico si es un juego creado y me trae el detalle de la DB
  if (idVideogame.includes("-")) {
    let videogameDb = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: Genre,
    });
    //Parseo el objeto
    videogameDb = JSON.stringify(videogameDb);
    videogameDb = JSON.parse(videogameDb);
    //dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres.map((g) => g.name);
    res.json(videogameDb);
  } else {
    //else (si no es un juego creado, voy a buscar la info a la API)
    try {
      const response = await axios.get(
        `${URL}games/${idVideogame}?key=${API_KEY}`
      );
      // console.log(response.data);
      let {
        id,
        name,
        background_image,
        genres,
        description,
        released: releaseDate,
        rating,
        platforms,
      } = response.data;
      genres = genres.map((g) => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
      platforms = platforms.map((p) => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
      return res.status(202).json({
        id,
        name,
        background_image,
        genres,
        description,
        releaseDate,
        rating,
        platforms,
      });
    } catch (err) {
      return res.status(404).send(err);
    }
  }
});

router.delete("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    const videogamedelete = await Videogame.findByPk(idVideogame);
    if (videogamedelete) {
      await videogamedelete.destroy();
      return res.send("video juego elimindado");
    }
    res.status(404).send("videogame no encontrado");
  } catch (error) {
    console.log("errore este es", error);
  }
});

//POST /videogame <-------

router.post("/", async (req, res) => {
  //platforms = platforms.join(", ");
  try {
    let {
      name,
      description,
      releaseDate,
      rating,
      genres,
      platforms,
      // background_image,
    } = req.body;
    const create = await Videogame.findOrCreate({
      //devuelvo un array (OJOOO!!!!)
      where: {
        name,
        description,
        releaseDate,
        rating,
        platforms,
      },
    });
    await create[0].setGenres(genres); // relaciono ID genres al juego creado
    console.log(create);
  } catch (err) {
    console.log("este es ek errirrrrrrrrrrrrrrrrrrrrr", err);
  }
  //  res.send("gameCreated");
  return res.status(202).send("create");
});

module.exports = router;
