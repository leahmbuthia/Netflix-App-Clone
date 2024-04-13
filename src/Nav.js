import React, { useEffect, useState } from "react";
import Logo from "./netflixLogo.jpg";
import Img from "./netflixAvator.jpg";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", window);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_logo">
        <img className="nav_logo" src={Logo} alt="logo" />
      </div>
      <div className="nav_avator">
        <img className="nav_avator" src={Img} alt="logo" />
      </div>
    </div>
  );
}

export default Nav;
