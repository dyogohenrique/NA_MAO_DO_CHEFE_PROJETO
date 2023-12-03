import style from "./Home.module.css";

import Carrousel from "../components/carrosel/Carrousel";

const Home = () => {
  return (
    <div className={style.container}>
      <Carrousel />

      <div className={style.ContentNoCarrousel}>
        <div className={style.learnMore}>
          <h1>Quem Somos?</h1>
          <p>
            Somos a “Nome do Site”, uma plataforma inovadora projetada para
            simplificar e potencializar a experiência de varejistas e
            proprietários de supermercados, visando a simplicidade e a
            facilidade de organização de suas mercadorias trazendo relatórios e
            uma melhor visão de seu negócio.
          </p>
        </div>
        <div className={style.learnMore}>
          <h1>O que Podemos Fazer por você?</h1>
          <p>
            Na “Nome do Site”, nossa missão é ir além de ser apenas uma
            plataforma de Cadastros, capacitando seu negócio para alcançar novos
            patamares de sucesso, oferecendo soluções tecnológicas que
            transcendem as expectativas, proporcionando eficiência, controle e
            crescimento aos negócios.
          </p>
        </div>
        <div className={style.learnMore}>
          <h1>Por qual Razão você deve nos Procurar?</h1>
          <p>
            Nós não somos apenas uma plataforma, mas sim seus aliados na jornada
            para o sucesso. Seja você um varejista visionário, um proprietário
            de supermercado em busca de eficiência ou um empreendedor ansioso
            para inovar, a “Nome do Site” está pronta para ser a força que
            impulsiona seus objetivos. Escolha “Nome do Site” e descubra um
            parceiro comprometido com o seu sucesso, focado em fornecer soluções
            que não apenas atendem, mas excedem suas expectativas. Estamos aqui
            para fazê-lo crescer e prosperar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
