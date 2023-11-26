import { useState, useEffect } from "react";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import SelectInput from "../components/form/SelectInput";
import style from "./SellProduct.module.css";
import ProductOfList from "../components/ProductOfList";
import { api } from "../lib/axios";

const SellProduct = () => {
  const [sellProducts, setSellProducts] = useState([]);
  const [productName, setProductName] = useState(null);
  const [amount, setAmount] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [history, setHistory] = useState([]);

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

  const options = products.map((product) => ({
    value: product.productName,
    label: product.productName,
  }));

  const handleProductChange = (selectedOption) => {
    setProductName(selectedOption.value);
  };

  const addProductToSell = () => {
    const existingProduct = sellProducts.find(
      (p) => p.productName === productName
    );

    if (existingProduct) {
      console.error("Este produto já está na lista!");
      return;
    }

    const valueTotal =
      (products.find((p) => p.productName === productName)?.valueUnit || 0) *
      amount;

    if (editingProduct) {
      setSellProducts((prevSellProducts) => {
        const updatedProducts = prevSellProducts.map((product) =>
          product.productName === editingProduct.productName
            ? { ...editingProduct, amount, valueTotal }
            : product
        );

        return updatedProducts;
      });

      setEditingProduct(null);
      setAmount(0);
    } else {
      setSellProducts((prevSellProducts) => [
        ...prevSellProducts,
        {
          productName,
          amount,
          valueTotal,
        },
      ]);

      setAmount(0);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductName(product.productName);
    setAmount(product.amount);
  };

  const handleDelete = (productToDelete) => {
    const updatedSellProducts = sellProducts.filter(
      (product) => product.productName !== productToDelete.productName
    );
    setSellProducts(updatedSellProducts);
  };

  const handleClear = () => {
    setSellProducts([]);
  };

  const handleSell = async () => {
    try {
      // Validar se a venda é possível
      for (const product of sellProducts) {
        const availableQuantity = products.find(
          (p) => p.productName === product.productName
        )?.amount;

        if (!availableQuantity || availableQuantity < product.amount) {
          console.error(
            `Quantidade insuficiente de ${product.productName} em estoque.`
          );
          // Adicionar lógica de tratamento, como exibir uma mensagem de erro
          return;
        }
      }

      // Atualizar a quantidade disponível de produtos na API
      await Promise.all(
        sellProducts.map(async (product) => {
          const productId = products.find(
            (p) => p.productName === product.productName
          )?.id;
          const updatedProduct = {
            ...product,
            amount:
              products.find((p) => p.productName === product.productName)
                ?.amount - product.amount,
          };

          // Enviar uma solicitação PUT para a API para atualizar o produto
          await api.put(`/products/${productId}`, updatedProduct);
        })
      );

      // Aqui, após a atualização bem-sucedida na API, você pode adicionar a venda ao histórico e limpar a lista de vendas
      const totalValue = sellProducts.reduce(
        (total, product) => total + product.valueTotal,
        0
      );
      const saleData = {
        products: sellProducts.map((product) => ({
          productId: products.find((p) => p.productName === product.productName)
            ?.id,
          quantity: product.amount,
        })),
        totalValue,
        date: new Date().toISOString().split("T")[0], // Data atual no formato YYYY-MM-DD
      };

      // Adicionar lógica para enviar a venda à API (por exemplo, POST para /sales)
      const saleResponse = await api.post("/sales", saleData);

      // Adicionar a venda ao histórico
      await api.post("/history", {
        saleId: saleResponse.data.id,
        date: saleData.date,
        type: "saida",
        products: sellProducts.map((product) => ({
          productId: products.find((p) => p.productName === product.productName)
            ?.id,
          quantity: product.amount,
          valueUnit: product.valueTotal / product.amount,
          valueTotal: product.valueTotal,
        })),
      });

      // Limpar a lista de vendas após a venda ser concluída
      setSellProducts([]);
    } catch (error) {
      console.error("Erro ao vender produtos:", error);
      // Adicionar lógica de tratamento, como exibir uma mensagem de erro
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToSell();
  };

  return (
    <div className={style.container}>
      <h1>Venda de produto</h1>
      <div className={style.containerContent}>
        <form onSubmit={handleSubmit} className={style.form}>
          <SelectInput
            options={options}
            customClass="seu-classe-customizada"
            selectedValue={productName}
            handleOnChange={handleProductChange}
          />
          <div className={style.input_container}>
            <Input
              text="Quantidade"
              name="amount"
              type="number"
              placeholder="Insira a quantidade"
              value={amount}
              handleOnChange={(e) => setAmount(e.target.value)}
            />
            <Input
              text="Valor da venda"
              name="price"
              disabled
              placeholder={`R$ ${
                (products.find((p) => p.productName === productName)
                  ?.valueUnit || 0) * amount
              }`}
            />
          </div>
          <div className={style.addProduct}>
            <Button
              text={editingProduct ? "Salvar Edição" : "Adicionar Produto +"}
              customClass="mid"
              type="submit"
            />
          </div>
        </form>
        <div className={style.cardList}>
          <h2>Lista de Venda</h2>
          <div className={style.products}>
            {sellProducts.map((product, index) => (
              <ProductOfList
                key={index}
                productName={product.productName}
                amount={product.amount}
                valueTotal={product.valueTotal}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product)}
              />
            ))}
          </div>
          <div className={style.btnContainer}>
            <Button
              text="Limpar"
              name="btnLimpar"
              customClass="clean"
              handleOnchange={handleClear}
            />
            <Button
              text="Vender"
              name="btnSVender"
              handleOnchange={handleSell}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProduct;