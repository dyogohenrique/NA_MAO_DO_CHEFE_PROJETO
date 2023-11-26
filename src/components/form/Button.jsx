import styles from './Button.module.css';


/**
 * Cria um botão de submit
 * @param text Texto que aparece dentro do botão
 * @param name Name e id do botão
 * @param type Tipo do  botão
 * @param handleOnchange Função para o onClick
 * @param customClass Classe personalizada
 * @returns retorna o botão de submit
 */
function Button({ text, name, type, handleOnchange, customClass }) {
    return(
        <div>
            <button 
                className={`${styles.btn} ${styles[customClass]}`}
                name={name} 
                id={name}
                type={type}
                onClick={handleOnchange}
            >
            {text}
            </button>
        </div>
    );
}

export default Button;