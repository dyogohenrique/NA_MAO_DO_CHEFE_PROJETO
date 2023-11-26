import InputMask from "react-input-mask";

import styles from "./Input.module.css"

function Mask({ mask, type, text, name, customClass, placeholder, value, handleOnChange}) {
    return (
        <div className={` ${styles.form_control} ${styles[customClass]}`}>
            <label htmlFor={name}>{text}</label>
            <InputMask
                mask={mask}
                type={type}
                text={text}
                name={name}
                customClass={customClass}
                placeholder={placeholder}
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Mask;