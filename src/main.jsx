import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.jsx";
import ProductRegistration from "./routes/ProductRegistration.jsx";
import SellProduct from "./routes/SellProduct.jsx";
import Transactions from "./routes/Transactions.jsx";

import FazerPorVoce from "./routes/learnMore/FazerPorVoce.jsx";
import Procurar from "./routes/learnMore/Procurar.jsx";
import QuemSomo from "./routes/learnMore/QuemSomo.jsx";

import Historic from "./routes/Transactions/Historic.jsx";
import Sell from "./routes/Transactions/Sell.jsx";
import Stock from "./routes/Transactions/Stock.jsx";
import Summary from "./routes/Transactions/Summary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "QuemSomo",
        element: <QuemSomo />
      },
      {
        path: "DeveProcurar",
        element: <Procurar />
      },
      {
        path: "FazerPorVoce",
        element: <FazerPorVoce/>
      },
      {
        path: "product_registration",
        element: <ProductRegistration />,
      },
      {
        path: "sell_product",
        element: <SellProduct />,
      },
      {
        path: "transactions",
        element: <Transactions />,
        children: [
          {
            path: "summary",
            element: <Summary />,
          },
          {
            path: "historic",
            element: <Historic />,
          },
          {
            path: "sell",
            element: <Sell />,
          },
          {
            path: "stock",
            element: <Stock />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
