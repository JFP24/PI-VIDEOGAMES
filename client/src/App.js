import React from "react";
//import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CrearJuego from "./Components/createGame/createGame.jsx";
import Card from "./Components/cardDetail/cardDetail.jsx";
import Landing from "./Components/LadingPage/LadingPage.jsx";

import Home from "./Components/Home/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreatedGame" element={<CrearJuego />} />
        <Route path="/Game/:idVideogame" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
