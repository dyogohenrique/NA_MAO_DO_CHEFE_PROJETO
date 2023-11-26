import styles from "./Input.module.css";

/**
 * Cria um campo de input
 * @param type tipo do input (Ex.: type="text")
 * @param text Texto que deve aparecer na label
 * @param name id e name do input
 * @param placeholder O que deve aparecer dentro da caixao do input
 * @param value O valor do input
 * @returns retorna o input
 */
function Input({
  type,
  text,
  name,
  placeholder,
  value,
  customClass,
  max,
  min,
  minLength,
  maxLength,
  required,
  handleOnChange,
  disabled,
  list,
  step
}) {

  return (
    <div className={` ${styles.form_control} ${styles[customClass]}`}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onChange={handleOnChange}
        disabled={disabled}
        list={list}
        step={step}
      />
    </div>
  );
}

export default Input;
