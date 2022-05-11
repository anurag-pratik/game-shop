import React from "react";
import "../styles/ErrorScreen.css";
import { getError } from "../utils";

function ErrorScreen(props) {
  const error = getError(props.error);
  return <div className="error-container">Error: {error}</div>;
}

export default ErrorScreen;
