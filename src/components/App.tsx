import React from "react";
import { Routes, Route } from "react-router";

import Home from "./Home";
import Game from "./Game";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level/:levelId" element={<Game />} />
    </Routes>
  );
}

export default App;
