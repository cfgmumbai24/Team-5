import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./navbar.css";

function Navbar(props) {
  const [dark, changetheme] = useState(false);

  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY >= 80) {
      changetheme(true);
    } else {
      changetheme(false);
    }
  });

  const navigate = useNavigate();
  const clickhandler = () => {
    navigate("/");
  };

  return (
    <>
      {/* <nav  className={`navbar navbar-expand-sm navbar-dark fixed-top ${dark} `} > */}
      <nav
        className={
          "navbar navbar-expand-sm navbar-dark fixed-top navbar_scrolled"
        }
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/buyer">
            J P M M S S
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/buyer/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/buyer/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/buyer/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/buyer/cart">
                  Cart
                </NavLink>
              </li>
              {/* <li className="nav-item ">
                <NavLink className="nav-link" to="/">
                  stag2
                </NavLink>
              </li> */}
              <li className="nav-item dis">
                {props.usercame === true && (
                  <img
                    className="profile_icon grow"
                    src="../assets/profile_icon.jpg"
                    alt="Avatar"
                  />
                )}
                {props.usercame === false && (
                  <button
                    className="signin_btn"
                    type="button"
                    onClick={clickhandler}
                  >
                    Signin
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
