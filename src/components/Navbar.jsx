import style from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

const Navbar = ({ itens, customClass }) => {
  return (
    <div className={`${style.containerNavbar} ${style[customClass]}`}>
      {itens.map((item, index) => (
        <div key={index} className={style.navbarItemWrapper}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${style.navbarItem} ${style.active}` : style.navbarItem
            }
          >
            {item.label}
          </NavLink>
          <div className={style.line}></div>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
