import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./style.scss";

export default function Header({ isMobileDevice }) {
  const [isVisible, setVisible] = useState(false);

  return (
    <header>
      <div className="header__body">
        <div className="container">
          <div className="header__top">
            <div className="header__logo">
              <img src={logo} alt="логотип" />
              Agency
            </div>
            <nav
              className={
                isMobileDevice.mobile && !isVisible
                  ? "header__navigation header__navigation_hide"
                  : "header__navigation header__navigation_show"
              }
            >
              <ul className="header__menu menu">
                <li className="menu__item">About</li>
                <li className="menu__item">Services</li>
                <li className="menu__item">Pricing</li>
                <li className="menu__item">Blog</li>
              </ul>
              <div className="header__button">
                <button>Contact</button>
              </div>
            </nav>
            {isMobileDevice.mobile && (
              <div
                className="header__burger"
                onClick={() => setVisible((prev) => !prev)}
              >
                <span></span>
              </div>
            )}
          </div>
          <div className="header__bottom">
            <h1>Portfolio</h1>
            <div className="header__description">
              Agency provides a full service range including technical skills,
              design,
              <br /> business understanding.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
