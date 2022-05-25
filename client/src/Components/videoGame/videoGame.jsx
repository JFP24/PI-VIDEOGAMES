import React from "react";
import { Link } from "react-router-dom";
import styles from "./videoGames.module.css";

const Videogame = ({ id, rating, name, image, genres }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.image}>
          {<img src={`${image}`} alt="Videogame" className="Img"></img>}
        </div>
        <div></div>
        <div className={styles.name}>{name}</div>
        <div className={styles.rating}>
          {
            <p>
              <strong className={styles.rating}>Rating</strong>: ⭐{" "}
              {`${rating}`}
            </p>
          }
        </div>
        <div className={styles.genres}>
          {<div>{`${typeof genres === "string" ? genres : genres}`}</div>}
        </div>
        <br />
        <div className={styles.button}>
          {id && (
            <Link to={`/Game/${id}`}>
              <button className="Link">Details</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Videogame;
