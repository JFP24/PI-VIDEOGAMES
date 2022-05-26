import { React, useEffect } from "react";
import { connect } from "react-redux";
import { deleteVideogame, getVideogameDetail } from "../../Actions/action.js";
import Navbar from "../navBar/navBar.jsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./carDetail.module.css";

const GameDetails = (props) => {
  console.log(props, "esta es la");
  const { getVideogameDetail, gameDetails } = props;
  const { idVideogame } = useParams();
  console.log(gameDetails);
  console.log(props, "este es el props");
  // me carga los details del juego
  useEffect(() => {
    getVideogameDetail(idVideogame);
  }, [getVideogameDetail, idVideogame]);

  // const handleDelete = () => {
  //   deleteVideogame(idVideogame);
  //   Navigate("/home");
  // };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.detalles}>
        {gameDetails ? (
          <div>
            <h3 className={styles.title}>{gameDetails.name}</h3>

            {gameDetails.description &&
            gameDetails.genres &&
            gameDetails.platforms ? (
              <div>
                <div className={styles.image}>
                  <img
                    src={
                      gameDetails.background_image ||
                      "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg"
                    }
                    alt="Videogame"
                  ></img>
                </div>

                <p>
                  <strong>📆 Release Date :</strong>{" "}
                  {`${gameDetails.releaseDate}`}
                </p>

                <p>
                  <strong>⭐ Rating:</strong> {`${gameDetails.rating}`}
                </p>
                {
                  <p>
                    <strong>🏹 Genres </strong>:{" "}
                    {`${gameDetails.genres.join(", ")}`}
                  </p>
                }
                {
                  <p>
                    <strong>Platforms : </strong>: {`${gameDetails.platforms}`}
                  </p>
                }
                {
                  <p className={styles.description}>
                    {/* proxies */}
                    {`${gameDetails.description.replace(/(<([^>]+)>)/gi, "")}`}
                  </p>
                }

                <Link to="/Home">
                  <button className={styles.volver}>Volver</button>
                </Link>
              </div>
            ) : (
              <div className={styles.center}>
                <div className={styles.ring}></div>
                <span>Loading...</span>
              </div>
            )}
          </div>
        ) : (
          <h1>Cargando.....</h1>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameDetails: state.gameDetails,
  };
};

export default connect(mapStateToProps, { getVideogameDetail })(GameDetails);
