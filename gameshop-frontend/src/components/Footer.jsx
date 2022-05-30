import React, { useState, useEffect } from "react";
import "../styles/Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const time = new Date();

  const [year, setYear] = useState(time.getFullYear());

  useEffect(() => {
    const time = new Date();
    setYear(time.getFullYear());
  }, []);

  return (
    <div className="footer-container">
      <p className="footer-text">
        Copyright &copy; {year} GameShop.{" "}
        <span className="giticon-container">
          <a
            href="https://github.com/anurag-pratik/game-shop"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon fontSize="small" />
          </a>
        </span>
      </p>
    </div>
  );
}

export default Footer;
