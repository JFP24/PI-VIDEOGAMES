import { React, useState } from "react";
import { connect } from "react-redux";
import { searchByName, getAllGames } from "../../Actions/action";
import styles from "./searchBar.module.css";

const SearchBar = ({ searchByName }) => {
  const [input, setInput] = useState({
    buscar: " ",
  });
  const handleInputChange = function (e) {
    setInput({
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    if (input.buscar) {
      searchByName(input.buscar);
      setInput({
        buscar: " ",
      });
    } else {
      return alert("Colocar un busqueda");
    }
  };
  // const handleOnClickAll = () => {
  //   getAllGames();
  //   setInput({
  //     buscar: "",
  //   });
  // };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="buscar"
        placeholder="Buscá tu juego..."
        onChange={handleInputChange}
        value={input.buscar}
        autoComplete="off"
      ></input>
      <button className={styles.button} onClick={handleOnClick}>
        Buscar
      </button>
      <button
        className={styles.button}
        onClick={() => {
          window.location.reload();
        }}
      >
        CargarTodos
      </button>
    </div>
  );
};

export default connect(null, { searchByName, getAllGames })(SearchBar);
