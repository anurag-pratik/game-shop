import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/game/:slug" element={<GameScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
