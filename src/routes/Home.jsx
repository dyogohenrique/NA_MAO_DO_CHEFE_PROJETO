import style from "./Home.module.css";

import Carrousel from "../components/carrosel/Carrousel";

const Home = () => {
  return (
    <div className={style.container}>
      <Carrousel />
    </div>
  );
};

export default Home;
