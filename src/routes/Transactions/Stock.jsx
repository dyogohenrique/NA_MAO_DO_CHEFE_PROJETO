import { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

import { api } from "../../lib/axios";

const Stock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
    .then((response) => {
      setProducts(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <div>
      <h1>Tabela de estoque</h1>
      <div className="buscar">
        <Input
          name="buscar_estoque"
          placeholder="Insira o produto que deseja buscar"
          list="products"
        />
        <Button text="Pesquisar" customClass="neutro" />
        <datalist id="products">
          {products &&
            products.map((product) => (
              <option key={product.id} value={product.productName}></option>
            ))}
        </datalist>
      </div>
      <div className="tabela">
        <table>
          <tr>
            <th className="id">ID</th>
            <th className="nome">Nome</th>
            <th className="qtd">Quantidade</th>
            <th className="vunit">Valor Unitário</th>
            <th className="vtotal">Valor Total</th>
            <th className="dtcadastro">Data de Cadastro</th>
            <th className="dtvalidade">Data de Validade</th>
            <th className="dtvalidade">Dias para vencer</th>
          </tr>
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.amount}</td>
                <td>R$ {product.valueUnit}</td>
                <td>R$ {product.valueTotal}</td>
                <td>{product.dateFabrication}</td>
                <td>{product.dateValidation}</td>
                <td>{}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Stock;
