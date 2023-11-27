import Navbar from "./Navbar";

import style from "./Header.module.css";

import { Link } from "react-router-dom";

// import logo from "../assets/logo.svg"



const Header = () => {
  const navbarItems = [
    { to: "/product_registration", label: "Cadastrar Produto" },
    { to: "/sell_product", label: "Vender Produto" },
    { to: "/transactions", label: "Relatórios" },
  ];

  return (
    <header>
      <Link to="/">
        <div className={style.containerLogo}>
          <p>NA MÃO DO CHEFE</p>
          <div className={style.logo}>
            <img src="/logo.svg" alt="Logo"  height={50}/>
          </div>
        </div>
      </Link>
      <div className={style.navbar}>
        <Navbar itens={navbarItems} />
      </div>
    </header>
  );
};

export default Header;
