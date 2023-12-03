import { useState } from "react";
import Input from "./form/Input";
import Button from "../components/form/Button";
import style from "./ConfirmationModal.module.css";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  const [recipientName, setRecipientName] = useState("");
  const [showNameWarning, setShowNameWarning] = useState(false);

  const handleConfirm = () => {
    // Verifica se o nome do destinatário foi fornecido
    if (!recipientName) {
      // Mostra o aviso de que o nome do destinatário é obrigatório
      setShowNameWarning(true);
      return;
    }
    // Chama a função onConfirm passando o nome do destinatário
    onConfirm(recipientName);

  };

  return (
    <div className={style.modal}>
      <h2>Deseja confirmar a venda?</h2>
      <div className={style.inputContainer}>
        <Input
          name="recipient"
          text="Nome do destinatário"
          required={true}
          type="text"
          value={recipientName}
          handleOnChange={(e) => {
            setRecipientName(e.target.value);
            // Oculta o aviso ao começar a digitar novamente
            setShowNameWarning(false);
          }}
        />
        {showNameWarning && (
          <p className={style.warning}>
            Por favor, forneça o nome do destinatário.
          </p>
        )}
        <p>A nota fiscal vai ficar salva em relatórios na parte de vendas*</p>
      </div>
      <div className={style.btnContainer}>
        <Button text="Não" customClass="danger" handleOnchange={onCancel} />
        <Button text="Sim" type="button" handleOnchange={handleConfirm} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
