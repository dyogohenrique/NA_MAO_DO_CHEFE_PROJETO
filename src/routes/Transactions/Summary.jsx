import "./Summary.css";

const Summary = () => {
  return (
    <div className="container_summary">
      <div className="content_left">
        <div>
          <h2>Relatório de Vendas</h2>
          <div className="diagram">

            <p>Imagem ilustrativa (Vou colocar um grafico de linhas)</p>
          </div>
        </div>
        <div>
          <h2>Relatório de Vendas sobre Produtos:</h2>
          <div className="diagram">

            <p>Imagem ilustrativa (Vou colocar um grafico pizza)</p>
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
