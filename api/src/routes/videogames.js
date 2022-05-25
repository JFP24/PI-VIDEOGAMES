const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const URL = "https://api.rawg.io/api/";

router.get("/", async (req, res) => {
  //busco db
  const { name } = req.query;
  let videogamesDb = await Videogame.findAll({
    include: Genre,
  });
  //Parseo el objeto
  videogamesDb = JSON.stringify(videogamesDb);
  videogamesDb = JSON.parse(videogamesDb);

  videogamesDb = videogamesDb.reduce(
    (acc, el) =>
      acc.concat({
        ...el,
        genres: el.genres.map((g) => g.name),
      }),
    []
  );
  // si llegan queries "name"
  if (name) {
    try {
      //busco si existe el juego en la API
      let response = await axios.get(
        `${URL}games?search=${name}&key=${API_KEY}`
      );
      console.log(response.data);
      if (!response.data.count)
        return res.status(404).send(`JUEGO NO ENCONTRADO`);
      //filtro SOLO la data que necesito para enviarle al front
      const gamesREADY = response.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rating: game.rating,
          genres: game.genres.map((g) => g.name),
        };
      });
      //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
      const filteredGamesDb = videogamesDb.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );
      //doy prioridad a la DB, y sumo todos, y corto el array en 15
      const results = [...filteredGamesDb, ...gamesREADY.splice(0, 15)];
      return res.status(202).json(results);
    } catch (err) {
      return console.log(err);
    }
  } else {
    //  voy a buscar todos los juegos a la API si no entra por queri
    try {
      const results = [...videogamesDb]; //sumo lo que
      let url = `${URL}games?key=${API_KEY}`;
      let dataApi = [];
      for (let i = 1; i < 10; i++) {
        let pages = await axios.get(url);
        pages.data.results.map((game) => {
          dataApi.push({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            rating: game.rating,
            genres: game.genres.map((g) => g.name),
          });
        });
        url = pages.data.next;
      }
      // results = [...results, ...dataApi];
      let allGame = dataApi.concat(results);
      //  console.log(allGame, "esta es la data");
      return res.status(202).json(allGame);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

module.exports = router;
