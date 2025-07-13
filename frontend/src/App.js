import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Characters from "./components/Characters";
import BreathingTechniques from "./components/BreathingTechniques";
import StoryArcs from "./components/StoryArcs";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/breathing-techniques" element={<BreathingTechniques />} />
          <Route path="/story-arcs" element={<StoryArcs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;