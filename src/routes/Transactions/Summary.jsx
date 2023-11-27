import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

import { useState, useEffect } from "react";

import { api } from "../../lib/axios";

import "./Summary.css";

const Summary = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartLabel, setLineChartLabel] = useState([]);

  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartLabel, setPieChartLabel] = useState([]);

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [lastAddedProducts, setLastAddedProducts] = useState([]);
  const [lastSales, setLastSales] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [salesResponse, productsResponse] = await Promise.all([
          api.get("/sales"),
          api.get("/products"),
        ]);

        setSales(salesResponse.data);
        setProducts(productsResponse.data);

        // Line Chart Data
        const lineChartValues = salesResponse.data.map(
          (sale) => sale.totalValue
        );
        setLineChartData(lineChartValues);

        // Line Chart Labels
        const lineChartLabels = salesResponse.data.map((sale) => sale.date);
        setLineChartLabel(lineChartLabels);

        // Pie Chart Data and Labels
        const productQuantities = {};
        salesResponse.data.forEach((sale) => {
          sale.products.forEach((product) => {
            const productId = product.productId;
            const productInfo = products.find((p) => p.id === productId);
            const productName = productInfo?.productName;

            // Adicionando logs para depuração
            console.log(
              `Product: ${productName}, Quantity: ${product.quantity}`
            );

            // Verificar se o nome do produto é válido
            if (productName) {
              // Acumular corretamente a quantidade de cada produto vendido
              productQuantities[productName] =
                (productQuantities[productName] || 0) +
                parseInt(product.quantity, 10);
            }
          });
        });

        // Adicionando logs para depuração
        console.log("Product Quantities:", productQuantities);

        // Filtrar entradas com quantidade positiva
        const filteredProductQuantities = Object.entries(
          productQuantities
        ).filter(([productName, quantity]) => productName && quantity > 0);

        // Adicionando logs para depuração
        console.log("Filtered Product Quantities:", filteredProductQuantities);

        const pieChartValues = filteredProductQuantities.map(
          ([productName, quantity]) => quantity
        );
        const pieChartLabels = filteredProductQuantities.map(
          ([productName]) => productName
        );

        // Adicionando logs para depuração
        console.log("Pie Chart Values:", pieChartValues);
        console.log("Pie Chart Labels:", pieChartLabels);

        // Verificar se há dados antes de definir o estado
        if (pieChartValues.length > 0 && pieChartLabels.length > 0) {
          setPieChartData(pieChartValues);
          setPieChartLabel(pieChartLabels);

          // Armazenar os dados no localStorage
          localStorage.setItem("pieChartData", JSON.stringify(pieChartValues));
          localStorage.setItem(
            "pieChartLabels",
            JSON.stringify(pieChartLabels)
          );
        } else {
          console.log("Dados do gráfico de pizza vazios ou indefinidos.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllData();
  }, []);

  // Ordenar os produtos pela data de cadastro em ordem decrescente
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.dateFabrication) - new Date(a.dateFabrication)
  );

  // Obter os últimos 5 produtos
  const latestProducts = sortedProducts.slice(0, 5);

  // Adicionando logs para depuração
  console.log("Latest Products:", latestProducts);

  // Definir o estado dos últimos produtos adicionados
  useEffect(() => {
    setLastAddedProducts(latestProducts);
  }, [products]);

  // Obter as últimas 5 vendas
  const latestSales = sales.slice(0, 5);

  // Adicionando logs para depuração
  console.log("Latest Sales:", latestSales);

  const limitProductName = (productName, maxLength) => {
    return productName && productName.length > maxLength
      ? productName.substring(0, maxLength - 3) + "..."
      : productName;
  };

  // Definir o estado das últimas vendas
  useEffect(() => {
    setLastSales(latestSales);
  }, [sales]);

  useEffect(() => {
    const storedPieChartData = localStorage.getItem("pieChartData");
    const storedPieChartLabels = localStorage.getItem("pieChartLabels");

    try {
      // Verificar se os dados são strings válidas antes de fazer o parse
      const parsedChartData = storedPieChartData
        ? JSON.parse(storedPieChartData)
        : null;
      const parsedChartLabels = storedPieChartLabels
        ? JSON.parse(storedPieChartLabels)
        : null;

      if (parsedChartData && parsedChartLabels) {
        setPieChartData(parsedChartData);
        setPieChartLabel(parsedChartLabels);
      }
    } catch (error) {
      console.error("Erro ao fazer o parse dos dados do localStorage:", error);
    }
  }, [sales]);

  return (
    <div className="container_summary">
      <div className="content_left">
        <div>
          <h2>Relatório de Vendas</h2>
          <div className="diagram">
            <LineChart data={lineChartData} categories={lineChartLabel} />
          </div>
        </div>
        <div>
          <h2>Relatório de Vendas sobre Produtos:</h2>
          <div className="diagram">
            <PieChart data={pieChartData} labels={pieChartLabel} />{" "}
          </div>
        </div>
      </div>
      <div className="content_right">
        <div>
          <h2>Últimos Produtos Fabricados:</h2>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="nome">Nome</th>
                  <th className="qtd">Quantidade</th>
                  <th className="vunit">Valor Unitário</th>
                  <th className="vtotal">Valor Total</th>
                  <th className="dtcadastro">Data de Fabricação</th>
                </tr>
              </thead>
              <tbody>
                {lastAddedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="nome">{product.productName}</td>
                    <td className="qtd">{product.amount}</td>
                    <td className="vunit">R$ {product.valueUnit}</td>
                    <td className="vtotal">R$ {product.valueTotal}</td>
                    <td className="dtcadastro">{product.dateFabrication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2>Últimas vendas:</h2>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th className="nome">Nome</th>

                  <th className="vtotal">Valor Total</th>
                  <th className="dtcadastro">Data</th>
                </tr>
              </thead>
              <tbody>
                {lastSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="nome">
                      {products &&
                        sale.products.map((product, index) => {
                          const ProductDetail = products.find(
                            (p) => p.id === product.productId
                          );
                          return (
                            <span key={product.id}>
                              {index > 0 && ", "}{" "}
                              {/* Adiciona vírgula entre produtos, exceto no primeiro */}
                              {limitProductName(
                                `${ProductDetail?.productName} (${product.quantity} unidades)`,
                                20
                              )}
                            </span>
                          );
                        })}
                    </td>

                    <td className="vtotal">R$ {sale.totalValue}</td>
                    <td className="dtcadastro">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
