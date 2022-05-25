import axios from "axios";
import {
  ALL_GAMES,
  SEARCH_NAME,
  VIDEOGAME_DETAIL,
  GENRES,
  ORDER_BY,
  FILTER_BY,
  CREATE_GAME,
  DELETE_GAME,
} from "./types.js";

//* Trae todos los juegos (DB + API)
//aca hacemos la conexion del back y el front
export function getAllGames() {
  return async function (dispatch) {
    try {
      const res = await axios.get("/videogames/");
      dispatch({ type: ALL_GAMES, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}

//* Trae todos los juegos encontrados por nombre (QUERY: "name")
export function searchByName(name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/videogames?name=${name}`);
      dispatch({ type: SEARCH_NAME, payload: res.data });
    } catch (err) {
      alert("JUEGO NO ENCONTRADO");
    }
  };
}

//* Trae los detalles del juego por pasado por (params :ID)
export function getVideogameDetail(id) {
  return function (dispatch) {
    axios
      .get(`/videogame/${id}`)
      .then((res) => {
        dispatch({ type: VIDEOGAME_DETAIL, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

//* Trae todos los generos
export function getGenres() {
  return function (dispatch) {
    axios
      .get(`/genres`)
      .then((res) => {
        dispatch({ type: GENRES, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

//* Ordenamiento
export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY, payload: order });
  };
}

//Crear post
export function createGame(payload) {
  return async function (dispatch) {
    const info = await axios.post(`/videogame`, payload);
    console.log(
      "QUE INFO TRAE DE POST:",
      info.data,
      "INFO QUE LE ENVIO ",
      payload
    );
    return dispatch({
      type: CREATE_GAME,
      payload: info.data,
    });
  };
}

//* Filtrado
export function filterBy(order) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY, payload: order });
  };
}

//* DELETE
// export function deleteVideogame(id) {
//   return async function (dispatch) {
//     try {
//       await axios.delete(`/videogame/${id}`);
//       return dispatch({ type: DELETE_GAME });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function deleteVideogame(id) {
  return function (dispatch) {
    axios
      .delete(`/videogame/${id}`)
      .then((res) => {
        dispatch({ type: DELETE_GAME });
      })
      .catch((err) => {
        return err;
      });
  };
}
