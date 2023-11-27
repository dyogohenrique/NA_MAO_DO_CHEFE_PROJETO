import style from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <div className={style.error}>{message}</div>;
};

export default ErrorMessage;
