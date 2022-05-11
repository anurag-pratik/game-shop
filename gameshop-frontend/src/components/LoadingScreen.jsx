import React from "react";
import "../styles/LoadingScreen.css";
import loadingsvg from "../assets/loading.svg";

function LoadingScreen() {
  return (
    <div className="loading-container">
      <img src={loadingsvg} alt="loading" />
    </div>
  );
}

export default LoadingScreen;
