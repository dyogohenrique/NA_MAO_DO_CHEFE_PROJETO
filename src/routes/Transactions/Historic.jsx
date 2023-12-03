import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

const Historic = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [history, setHistory] = useState([]);
  
  const [lastAddedProducts, setLastAddedProducts] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [salesResponse, productsResponse, historyResponse] =
          await Promise.all([
            api.get("/sales"),
            api.get("/products"),
            api.get("/history"),
          ]);

        setSales(salesResponse.data);
        setProducts(productsResponse.data);
        setHistory(historyResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, []);

  const getProductNameById = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.log(`Product not found for ID: ${productId}`);
      console.log("Products array:", products);
    }
    return product ? product.productName : "";
  };

  const calculateTotalValue = (type, productInfo) => {
    if (type === "entrada") {
      return productInfo.valueTotal || 0;
    } else if (type === "saida") {
      return productInfo.products.reduce((total, product) => {
        return total + (product.valueTotal || 0);
      }, 0);
    } else {
      return 0;
    }
  };
  
  

  return (
    <div>
      <h1 className="titleTable">Tabela de histórico</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Produtos</th>
            <th>Valor Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>
                  {item.type === "entrada"
                    ? item.productId && (
                        <span>
                          {getProductNameById(item.productId)} ({item.quantity}{" "}
                          {item.quantity > 1 ? "unidades" : "unidade"})
                        </span>
                      )
                    : item.products &&
                      item.products.length > 0 && (
                        <span>
                          {item.products.map((product, index) => (
                            <span key={index}>
                              {getProductNameById(product.productId)} (
                              {product.quantity}{" "}
                              {product.quantity > 1 ? "unidades" : "unidade"})
                              {index < item.products.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      )}
                </td>

                <td>R$ {calculateTotalValue(item.type, item)}</td>
                <td>{item.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historic;
