import Select from "react-select";

import styles from "./Input.module.css"; // Corrigindo o nome do arquivo CSS

const SelectInput = ({ options, customClass, selectedValue, handleOnChange }) => {
  return (
    <div className={` ${styles.form_control} ${styles[customClass]}`}>
      <label htmlFor="">Nome do Produto</label>
      <Select
        options={options}
        onChange={handleOnChange}
        value={options.find((option) => option.value === selectedValue)}
      />
    </div>
  );
};

export default SelectInput;