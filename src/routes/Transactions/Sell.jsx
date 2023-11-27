import { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "../../components/Invoice";
import "./Sell.css";

import React from "react";

import { api } from "../../lib/axios";

const Sell = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const componentRefs = useRef([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [salesResponse, productsResponse] = await Promise.all([
          api.get("/sales"),
          api.get("/products"),
        ]);

        console.log("Sales:", salesResponse.data);
        console.log("Products:", productsResponse.data);

        setSales(salesResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, []);

  const getProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    // console.log(product)
    return product || { name: "Produto não encontrado" };
  };

  return (
    <div>
      <h1>Tabela de vendas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produtos</th>
            <th>Valor Total</th>
            <th>Data de Venda</th>
            <th>Imprimir Nota Fiscal</th>
          </tr>
        </thead>
        <tbody>
          {sales &&
            sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>
                  {products &&
                    sale.products.map((product, index) => {
                      const ProductDetail = products.find(
                        (p) => p.id === product.productId
                      );
                      return (
                        <span key={product.id}>
                          {ProductDetail?.productName} ({product.quantity}{" "}
                          unidades) {index < sale.products.length - 1 && ", "}
                        </span>
                      );
                    })}
                </td>
                <td>R$ {sale.totalValue}</td>
                <td>{sale.date}</td>
                <td>
                <ReactToPrint
                    trigger={() => <button>Imprimir Nota Fiscal</button>}
                    content={() => componentRefs.current[sale.id]}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="esconde">
        {sales.map((sale) => (
          <Invoice
            key={sale.id}
            ref={(el) => (componentRefs.current[sale.id] = el)}
            invoiceNumber={sale.id}
            recipient={sale.recipientName}
            products={sale.products}
            valueTotal={sale.totalValue}
            date={sale.date}
            getProductDetails={getProductDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Sell;
