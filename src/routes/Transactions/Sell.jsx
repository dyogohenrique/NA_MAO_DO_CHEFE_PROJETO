import { useEffect, useState } from "react";

import "./Sell.css";

import { api } from "../../lib/axios";

const Sell = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [salesResponse, productsResponse] = await Promise.all([
          api.get("/sales"),
          api.get("/products"),
        ]);

        setSales(salesResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, []);



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
                    const ProductDetail = products.find((p) => p.id === product.productId)
                    return(
                      <span key={product.index}>
                        {ProductDetail?.productName}
                        {index < sale.products.length - 1 && ", "}
                      </span>
                    )
                  })}
                </td>
                <td>R$ {sale.totalValue}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sell;
