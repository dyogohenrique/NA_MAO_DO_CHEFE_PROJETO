import { useState, useEffect } from "react";
import { api } from "../lib/axios";

import style from "./ProductRegistration.module.css";

import Input from "../components/form/Input";
import InputRadio from "../components/form/InputRadio";
import Button from "../components/form/Button";
import ErrorMessage from "../components/ErrorMessage";

const ProductRegistration = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [productName, setProductName] = useState("");
  const [dateValidation, setDateValidation] = useState("");
  const [dateFabrication, setDateFabrication] = useState("");
  const [daysToExpiration, setDaysToExpiration] = useState("");
  const [amount, setAmount] = useState("");
  const [valueUnit, setValueUnit] = useState("");
  const [valueTotal, setValueTotal] = useState("");
  const [perishable, setPerishable] = useState("");

  const handleOptionChange = (e) => {
    setPerishable(e.target.value);
  };

  function reset() {
    setProductName("");
    setDateFabrication("");
    setDateValidation("");
    setAmount("");
    setValueUnit("");
    setValueTotal("");
    setPerishable("");
  }

  const options = [
    { value: "sim", label: "Sim" },
    { value: "não", label: "Não" },
  ];

  const updateDaysToExpiration = () => {
    if (dateFabrication && dateValidation) {
      const daysToExpiration = calculateDaysToExpiration(
        dateFabrication,
        dateValidation
      );

      setDaysToExpiration(daysToExpiration);

      // Exibe um aviso se o produto está prestes a vencer (10 dias antes)
      if (daysToExpiration <= 10 && daysToExpiration > 0) {
        setErrorMessage("Atenção: Este produto está prestes a vencer.");
      } else {
        setErrorMessage(""); // Limpa a mensagem de aviso
      }
    }
  };

  const calculateDaysToExpiration = (fabricationDate, validationDate) => {
    const today = new Date();
    const fabrication = new Date(`${fabricationDate}`);
    const validation = new Date(`${validationDate}`);

    console.log("Today:", today.toISOString());
    console.log("Fabrication Date:", fabrication.toISOString());
    console.log("Validation Date:", validation.toISOString());

    // Verifica se as datas são válidas
    if (isNaN(fabrication.getTime()) || isNaN(validation.getTime())) {
      setErrorMessage("Datas inválidas.");
      return 0;
    }

    // Verifica se a data de fabricação é anterior à data de validade
    if (fabrication > validation) {
      setErrorMessage(
        "A data de fabricação deve ser anterior à data de validade."
      );
      return 0;
    }

    const daysToExpiration = Math.floor(
      (validation - today) / (1000 * 60 * 60 * 24) + 1
    );

    console.log("Dias para vencer:", daysToExpiration);

    return daysToExpiration;
  };

  const handleDateFabricationChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();

    if (new Date(selectedDate) > today) {
      setErrorMessage(
        "A data de fabricação não pode ser posterior à data de hoje."
      );
      return;
    }

    setErrorMessage(""); // Limpa a mensagem de erro se a data for válida
    setDateFabrication(selectedDate);
    updateDaysToExpiration();
  };

  const handleDateValidationChange = (e) => {
    const selectedDate = e.target.value;

    const today = new Date();

    if (new Date(selectedDate) < today) {
      setErrorMessage(
        "A data de validade não pode ser anterior à data de hoje."
      );
      return;
    }

    setErrorMessage("");

    setDateValidation(selectedDate);
    updateDaysToExpiration();
  };

  const calculateTotalValue = (quantity, unitValue) => {
    return quantity * unitValue;
  };

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);

    // Calcula o valor total e atualiza o estado
    const calculatedTotalValue = calculateTotalValue(
      parseInt(enteredAmount),
      parseFloat(valueUnit)
    );
    setValueTotal(calculatedTotalValue);
  };

  const handleValueUnitChange = (e) => {
    const enteredValueUnit = e.target.value;
    setValueUnit(enteredValueUnit);

    // Calcula o valor total e atualiza o estado
    const calculatedTotalValue = calculateTotalValue(
      parseInt(amount),
      parseFloat(enteredValueUnit)
    );
    setValueTotal(calculatedTotalValue);
  };

  useEffect(() => {
    updateDaysToExpiration();
  }, [dateFabrication, dateValidation]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const existingProduct = products.find(
      (product) => product.productName === productName
    );

    if (existingProduct) {
      // Produto já existe, então atualize os valores
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + parseInt(amount),
        valueTotal: existingProduct.valueTotal + parseFloat(valueTotal),
      };

      api.patch(`/products/${existingProduct.id}`, updatedProduct);

      // Adicione um registro no histórico
      const historyEntry = {
        productId: existingProduct.id,
        quantity: parseInt(amount),
        valueUnit: parseFloat(valueUnit),
        valueTotal: parseFloat(valueTotal),
        date: new Date().toISOString().split("T")[0],
        type: "entrada", // Este é um novo produto, então é uma entrada no histórico
      };

      api.post("/history", historyEntry);
    } else {
      // Produto não existe, então crie um novo
      const newProduct = {
        productName,
        dateFabrication,
        dateValidation,
        amount: parseInt(amount),
        valueUnit: parseFloat(valueUnit),
        valueTotal: parseFloat(valueTotal),
        perishable,
      };

      api.post("/products", newProduct);

      // Adicione um registro no histórico
      const historyEntry = {
        productId: products.length + 1, // Use uma lógica adequada para atribuir IDs
        quantity: parseInt(amount),
        valueUnit: parseFloat(valueUnit),
        valueTotal: parseFloat(valueTotal),
        date: new Date().toISOString().split("T")[0],
        type: "entrada", // Este é um novo produto, então é uma entrada no histórico
      };

      api.post("/history", historyEntry);
    }

    reset();
  };

  return (
    <div className={style.container}>
      <h1>Cadastro de Produtos</h1>

      {products && products.length > 0 && (
        <datalist id="products">
          {products.map((product) => (
            <option key={product.id} value={product.productName}></option>
          ))}
        </datalist>
      )}

      <div className={style.formContainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <Input
            text="Nome do Produto:"
            name="productName"
            type="text"
            placeholder="Insira o Nome do Produto"
            list="products"
            value={productName}
            handleOnChange={(e) => setProductName(e.target.value)}
          />
          <div className={`${style.input_container} ${style.container1}`}>
            <Input
              text="Data de Fabricação:"
              name="data_fabrication"
              type="date"
              value={dateFabrication}
              handleOnChange={handleDateFabricationChange}
            />
            <Input
              text="Data de Validade:"
              name="data_validation"
              type="date"
              value={dateValidation}
              handleOnChange={handleDateValidationChange}
            />
            <Input
              text="Dias para vencer: "
              name="falta"
              type="number"
              disabled={true}
              value={daysToExpiration}
            />
            <Input
              text="Quantidade:"
              name="amount"
              type="number"
              value={amount}
              handleOnChange={handleAmountChange}
            />
          </div>
          <div className={style.input_container}>
            <Input
              text="Valor Unitário:"
              name="valueU"
              type="number"
              customClass="double"
              placeholder="R$ 00,00"
              step="0.00"
              value={valueUnit}
              handleOnChange={handleValueUnitChange}
            />
            <Input
              text="Valor Total:"
              name="valueT"
              type="number"
              customClass="double"
              disabled={true}
              placeholder="R$ 00,00"
              value={valueTotal}
            />
            <InputRadio
              text="É perecível?"
              name="perishable"
              options={options}
              selectedOption={perishable}
              onChange={handleOptionChange}
              selectOption={perishable}
            />
          </div>
          <div className={style.addProduct}>
            <Button text="Cadastrar" type="submit" customClass="mid" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistration;
