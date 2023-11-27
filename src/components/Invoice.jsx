import style from "./Invoice.module.css";

const Invoice = ({ invoiceNumber, recipient, products, valueTotal, date }) => {
  // Certifique-se de que as propriedades necessárias estejam definidas antes de acessá-las
  const formattedDate = date ? new Date(date).toISOString().split("T")[0] : "";

  return (
    <div className={style.invoice}>
      <h2>Nota Fiscal</h2>
      <p>Número: {invoiceNumber}</p>

      <div>
        <h3>Emitente</h3>
        <p>NA MÃO DO CHEFE</p>
      </div>

      <div>
        <h3>Destinatário</h3>
        <p>{recipient}</p>
      </div>

      <h3>Produtos</h3>
      <ul>
        {products &&
          products.map((product, index) => (
            <li key={index}>
              {product.name} - Quantidade: {product.quantity} - Valor Unitário:
              R$ {product.unitPrice} - Valor Total: R$ {product.total}
            </li>
          ))}
      </ul>

      <p>Valor Total: R$ {valueTotal}</p>
      <p>Data: {formattedDate}</p>

      <div className={style.assinatura}>Assinatura</div>
    </div>
  );
};

export default Invoice;
