import React from "react";
import { connect } from "react-redux";
import { orderBy, filterBy } from "../../Actions/action";
import styles from "./filter.module.css";

const FilteredBy = ({ orderBy, genres, filterBy }) => {
  const handleSelect = (e) => {
    filterBy(e.target.value);
  };

  const handleSelect2 = (e) => {
    orderBy(e.target.value);
  };

  return (
    <div className={styles.container}>
      <select className={styles.select} onChange={handleSelect} name="" id="">
        <option className="option" value="default">
          TODOS...
        </option>
        <optgroup className="optionGroup" label="DataBase">
          <option className="option" value="DB">
            CREADOS
          </option>
        </optgroup>
        <optgroup className="optionGroup" label="API">
          <option className="option" value="API">
            API
          </option>
        </optgroup>
        <optgroup className="optionGroup" label="GENRES">
          {genres &&
            genres.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
        </optgroup>
      </select>
      <select className={styles.select} onChange={handleSelect2} name="" id="">
        <option className="option" value="default">
          ORDEN...
        </option>
        <optgroup className="optionGroup" label="Rating">
          <option className="option" value="asc">
            Mayor a Menor
          </option>
          <option className="option" value="desc">
            Menor a Mayor
          </option>
        </optgroup>
        <optgroup className="optionGroup" label="Alphabetic">
          <option className="option" value="A-Z">
            A - Z
          </option>
          <option className="option" value="Z-A">
            Z - A
          </option>
        </optgroup>
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, "este es el state");
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, { orderBy, filterBy })(FilteredBy);
