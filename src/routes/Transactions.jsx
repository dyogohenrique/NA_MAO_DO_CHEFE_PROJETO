import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import style from "./Transactions.module.css";

const Transactions = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/transactions/summary");
  }, [navigate]);

  const itens = [
    { to: "/transactions/summary", label: "Resumo" },
    { to: "/transactions/sell", label: "Vendas" },
    { to: "/transactions/stock", label: "Estoque" },
    { to: "/transactions/historic", label: "Histórico" },
  ];

  return (
    <div className={style.container}>
      <div className={style.navbarContainer}>
        {itens.map((item, index) => (
          <NavLink
            to={item.to}
            className={({ isActive }) => (isActive ? `${style.navbarItem} ${style.active}` : style.navbarItem)}
            key={index}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className={style.containerContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Transactions;
