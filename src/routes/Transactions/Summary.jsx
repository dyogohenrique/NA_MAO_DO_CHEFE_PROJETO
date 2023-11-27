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
        const lineChartValues = salesResponse.data.map((sale) => sale.totalValue);
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
            console.log(`Product: ${productName}, Quantity: ${product.quantity}`);
        
            // Verificar se o nome do produto é válido
            if (productName) {
              // Acumular corretamente a quantidade de cada produto vendido
              productQuantities[productName] =
                (productQuantities[productName] || 0) + parseInt(product.quantity, 10);
            }
          });
        });
  
        // Adicionando logs para depuração
        console.log("Product Quantities:", productQuantities);
  
        // Filtrar entradas com quantidade positiva
        const filteredProductQuantities = Object.entries(productQuantities)
          .filter(([productName, quantity]) => productName && quantity > 0);
  
        // Adicionando logs para depuração
        console.log("Filtered Product Quantities:", filteredProductQuantities);
  
        const pieChartValues = filteredProductQuantities.map(([productName, quantity]) => quantity);
        const pieChartLabels = filteredProductQuantities.map(([productName]) => productName);
  
        // Adicionando logs para depuração
        console.log("Pie Chart Values:", pieChartValues);
        console.log("Pie Chart Labels:", pieChartLabels);
  
        // Verificar se há dados antes de definir o estado
        if (pieChartValues.length > 0 && pieChartLabels.length > 0) {
          setPieChartData(pieChartValues);
          setPieChartLabel(pieChartLabels);
  
          // Armazenar os dados no localStorage
          localStorage.setItem('pieChartData', JSON.stringify(pieChartValues));
          localStorage.setItem('pieChartLabels', JSON.stringify(pieChartLabels));
        } else {
          console.log("Dados do gráfico de pizza vazios ou indefinidos.");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchAllData();
  }, []);
  

 
  // useEffect(() => {
  //   const storedPieChartData = localStorage.getItem('pieChartData');
  //   const storedPieChartLabels = localStorage.getItem('pieChartLabels');
  
  //   if (storedPieChartData && storedPieChartLabels) {
  //     setPieChartData(JSON.parse(storedPieChartData));
  //     setPieChartLabel(JSON.parse(storedPieChartLabels));
  //   }
  // }, [sales]);

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
        <div className="container_value">
          <h2>Valor Total do Estoque:</h2>
          <div className="value_total">
            <p>R$: 00,00</p>
          </div>
        </div>
        <div>
          <h2>Últimos Produtos:</h2>
          <div className="table">
            <table>
              <tr>
                <th className="nome">Nome</th>
                <th className="qtd">Quantidade</th>
                <th className="vunit">Valor Unitário</th>
                <th className="vtotal">Valor Total</th>
                <th className="dtcadastro">Data de Cadastro</th>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vunit"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vunit"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vunit"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vunit"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <h2>Últimas vendas:</h2>
          <div className="table">
            <table>
              <tr>
                <th className="nome">Nome</th>
                <th className="qtd">Quantidade</th>
                <th className="vtotal">Valor Total</th>
                <th className="dtcadastro">Data</th>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
              <tr>
                <td className="nome"></td>
                <td className="qtd"></td>
                <td className="vtotal"></td>
                <td className="dtcadastro"></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
