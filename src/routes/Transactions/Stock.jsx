import { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";
import { api } from "../../lib/axios";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductsChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
  };

  const calculateDaysToExpiration = (validationDate) => {
    const today = new Date();
    const validation = new Date(validationDate);
    
    const timeDiff = validation - today;
    const daysToExpiration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysToExpiration;
  };

  const filteredProducts = selectedProducts.length > 0
    ? selectedProducts.map((selectedProduct) =>
        products.find((product) => product.productName === selectedProduct.label)
      )
    : products;

  return (
    <div>
      <h1 className="titleTable">Tabela de estoque</h1>
      <div className="buscar">
        <Select
          isMulti
          value={selectedProducts}
          onChange={handleProductsChange}
          options={products.map((product) => ({
            value: product.productName,
            label: product.productName,
          }))}
          placeholder="Selecione um ou mais produtos"
        />

      </div>
      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th className="id hide-on-small-screen">ID</th>
              <th className="nome">Nome</th>
              <th className="qtd">Quantidade</th>
              <th className="vunit">Valor Unitário</th>
              <th className="vtotal">Valor Total</th>
              <th className="dtcadastro hide-on-small-screen">Data de Fabricação</th>
              <th className="dtvalidade">Data de Validade</th>
              <th className="dtvalidade">Dias para vencer</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="hide-on-small-screen">{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.amount}</td>
                <td>R$ {product.valueUnit}</td>
                <td>R$ {product.valueTotal}</td>
                <td className="hide-on-small-screen">{product.dateFabrication}</td>
                <td>{product.dateValidation}</td>
                <td>{calculateDaysToExpiration(product.dateValidation)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
