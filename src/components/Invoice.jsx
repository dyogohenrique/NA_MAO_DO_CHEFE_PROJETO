import React from "react";
import ReactToPrint from "react-to-print";
import style from "./Invoice.module.css";

const Invoice = React.forwardRef(
  (
    { invoiceNumber, recipient, products, valueTotal, date, getProductDetails },
    ref
  ) => {
    // Certifique-se de que as propriedades necessárias estejam definidas antes de acessá-las
    const formattedDate = date
      ? new Date(date).toISOString().split("T")[0]
      : "";

    const rawDate = date ? new Date(date) : null;

    const formatBoletoNumber = (date, invoiceNumber) => {
      if (!date) return "";

      // Obtém os componentes da data
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mês é baseado em zero
      const day = date.getDate().toString().padStart(2, "0");

      // Concatena os componentes da data com o número da fatura
      return `${year}${month}${day}${invoiceNumber}`;
    };

    return (
      <div ref={ref} className={style.invoice}>
        <h2>Nota Fiscal</h2>
        <p className={style.numberID}>Número: {formatBoletoNumber(rawDate, invoiceNumber)}</p>

        <div className={style.person}>
          <h3>Emitente</h3>
          <p>NA MÃO DO CHEFE</p>
        </div>

        <div className={style.person}>
          <h3>Destinatário</h3>
          <p>{recipient}</p>
        </div>

        <div className={style.produtos}>
          <h3>Produtos</h3>
          <ul>
            {products &&
              products.map((product, index) => {
                const productDetail = getProductDetails(product.productId);
                return (
                  <li key={index}>
                    {productDetail.productName} - Quantidade: {product.quantity} - Valor
                    Unitário: R$ {productDetail.valueUnit} - Valor Total: R${" "}
                    {productDetail.valueTotal}
                  </li>
                );
              })}
          </ul>
        </div>

        <p>Valor Total: R$ {valueTotal}</p>
        <p>Data: {formattedDate}</p>

        <div className={style.assinatura}>Assinatura</div>
      </div>
    );
  }
);

export default Invoice;
