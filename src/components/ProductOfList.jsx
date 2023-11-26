import style from "./ProductOfList.module.css";
import Button from "./form/Button";

const ProductOfList = ({
  productName,
  amount,
  valueTotal,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={style.container}>
      <h3>{productName}</h3>
      <p>Quantidade: {amount}</p>
      <p>Valor: R$ {valueTotal}</p>
      <div className={style.buttonContainer}>
        <Button
          text="Editar"
          customClass="neutro"
          handleOnchange={() => onEdit({ productName, amount, valueTotal })}
        />
        <Button
          text="Excluir"
          customClass="danger"
          handleOnchange={() => onDelete({ productName, amount, valueTotal })}
        />
      </div>
    </div>
  );
};

export default ProductOfList;
