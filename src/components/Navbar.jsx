import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = ({ itens, customClass }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`${style.containerNavbar} ${style[customClass]}`}>
      <div className={style.sandwichButton} onClick={toggleMenu}>
        &#9776;
      </div>
      <div className={`${style.menu} ${isMenuOpen ? style.showMenu : ""}`}>
        {itens.map((item, index) => (
          <div key={index} className={style.navbarItemWrapper}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${style.navbarItem} ${style.active}`
                  : style.navbarItem
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
            <div className={style.line}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
