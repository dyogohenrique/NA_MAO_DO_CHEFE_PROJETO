import styles from "./InputRadio.module.css";

/**
 * Input Radio
 * @param name o nome do do grupo de botões de rádio.
 * @param options Uma matriz de bjetos que contêm os valores e rótulos para as opções de rádio.
 * @param selectOption O valor selecionado atualmente.
 * @param onChange Uma função de retorno de chamanda que será chamada quando uma opção for selecionada.
 * @returns 
 */
function InputRadio({ text, name, options, selectOption, onChange }) {
    return (
        <div className={styles.radio}>
            <label>{text}</label>
            <div className={styles.container_options}>
                {options.map((option, index) => (
                    <label key={index} className={styles.options}>
                        <input 
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectOption === option.value}
                            onChange={onChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default InputRadio;