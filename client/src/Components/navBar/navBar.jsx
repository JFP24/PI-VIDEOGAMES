import React from "react";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/Home" className={styles.link}>
            <p>Api Game</p>
          </Link>
        </div>
        <div className={styles.boton}>
          <Link to="/">
            <button>Intro</button>
          </Link>
          <Link to="/Home">
            <button>Home</button>
          </Link>
          <Link to="/CreatedGame">
            <button>CreatedGame</button>
          </Link>
        </div>
      </div>
    );
  }
}

// const NavBasr = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.logo}>
//         <Link to="/Home" className={styles.link}>
//           <p>Api Game</p>
//         </Link>
//       </div>
//       <div className={styles.boton}>
//         <Link to="/">
//           <button>Intro</button>
//         </Link>
//         <Link to="/Home">
//           <button>Home</button>
//         </Link>
//         <Link to="/CreatedGame">
//           <button>CreatedGame</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NavBar;
