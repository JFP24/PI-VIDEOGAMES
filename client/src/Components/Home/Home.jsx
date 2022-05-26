import React, { useState, useEffect } from "react";
import NavBar from "../navBar/navBar";
import SearchBar from "../searchBar/searchBar";
import { connect } from "react-redux";
import Videogame from "../videoGame/videoGame";
import Pagination from "../Pagination/pagination";
import FilteredBy from "../Filter/filter";
import styles from "./Home.module.css";
import { getAllGames, getGenres } from "../../Actions/action";

const Videogames = ({ allGames, getAllGames, getGenres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(15);
  //* indices de la paginación:
  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  let currentCards; //"cards" que se deben mostrar en la pantalla
  // en caso de que al buscar un juego en particular no encuentra ninguno
  if (typeof allGames === "string") {
    currentCards = allGames;
  } else {
    currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard); //uso los indices para "fraccionar que juegos muestro"
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllGames();
    getGenres();
  }, [getAllGames, getGenres]);

  return (
    <div className={styles.cotainer}>
      <NavBar />
      <SearchBar />
      <FilteredBy />
      <Pagination
        cardPerPage={cardPerPage}
        totalCards={allGames.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className={styles.game}>
        {currentCards.length > 1 ? (
          currentCards.map((g) => (
            <Videogame
              key={g.id}
              name={g.name}
              rating={g.rating}
              genres={g.genres}
              image={
                g.background_image ||
                "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg"
              }
              id={g.id}
            />
          ))
        ) : (
          <div className={styles.center}>
            <div className={styles.ring}></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allGames: state.filtered,
  };
};

export default connect(mapStateToProps, { getAllGames, getGenres })(Videogames);
