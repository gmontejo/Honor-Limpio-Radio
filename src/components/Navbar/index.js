import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import logo from "../../img/honorLimpioLogo.png";

export default function Navbar() {
  const [radio, setRadio] = useState(false);

  useEffect(() => {
    const audio = new Audio("https://stream.zenolive.com/fwgaz11pbd0uv.aac");
    audio.autoplay = true;
    audio.volume = 0.5;
    setRadio(audio);
    window.addEventListener("scroll", () => {
      scrollFunction();
    });
  }, []);

  const playHandler = () => {
    if (radio.readyState === 4 && radio.paused) {
      radio.play();
    }
  };

  const stopHandler = () => {
    radio.pause();
  };

  const volumeDownHandler = () => {
    if (radio.volume > 0) {
      radio.volume /= 2;
    }
  };

  const volumeUpHandler = () => {
    if (radio.volume < 0.9) {
      radio.volume += 0.1;
    }
  };

  const scrollFunction = () => {
    const logoContainer = document.getElementById("logoContainer");
    const mainNavbar = document.getElementById("mainNavbar");
    const radioContainer = document.getElementById("radioContainer");

    if (
      document.body.scrollTop > 15 ||
      document.documentElement.scrollTop > 15
    ) {
      setTimeout(() => {
        logoContainer.classList.remove("logoContainer");
        logoContainer.classList.add("scrolledLogoContainer");
      }, 0);
    } else {
      setTimeout(() => {
        logoContainer.classList.remove("scrolledLogoContainer");
        logoContainer.classList.add("logoContainer");
      }, 0);
    }

    if (
      document.body.scrollTop > 55 ||
      document.documentElement.scrollTop > 55
    ) {
      setTimeout(() => {
        mainNavbar.classList.remove("mainNavbar");
        radioContainer.classList.remove("radioContainer");
        mainNavbar.classList.add("scrolledMainNavbar");
        radioContainer.classList.add("scrolledRadioContainer");
      }, 0);
    } else {
      setTimeout(() => {
        mainNavbar.classList.remove("scrolledMainNavbar");
        radioContainer.classList.remove("scrolledRadioContainer");
        mainNavbar.classList.add("mainNavbar");
        radioContainer.classList.add("radioContainer");
      }, 0);
    }
  };

  return (
    <div className="navbarContainer">
      <div id="mainNavbar" className="mainNavbar">
        <div id="logoContainer" className="logoContainer">
          <img src={logo} alt="Logo de Honor Limpio" />
          <p className="title">HONOR LIMPIO</p>
          <p className="subtitle">WEBZINE</p>
        </div>
        <div id="radioContainer" className="radioContainer">
          <p> Dale Play!</p>
          <i className="fas fa-play" onClick={playHandler}></i>
          <i className="fas fa-pause" onClick={stopHandler}></i>
          <i className="fas fa-volume-down" onClick={volumeDownHandler}></i>
          <i className="fas fa-volume-up" onClick={volumeUpHandler}></i>
        </div>
      </div>

      <div className="socialMedia">
        <a
          href="https://www.youtube.com/honorlimpio1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube"></i>
        </a>
        <a
          href="https://www.instagram.com/honorlimpio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/honorlimpio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://wa.me/5493425202656"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* <ul className="navbarButtons">
        <li className="home">
          <Link to="/">Home</Link>
        </li>
        <li className="articulos">
          <Link to="/articulos">Servicios</Link>
        </li>
        <li className="adminPost">
          <Link to="/admin">Quiénes Somos</Link>
        </li>
      </ul> */}
    </div>
  );
}
