import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carrousel.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function SampleNextArrow({className, style, onClick}) {
  return (
    <div
      className={className}
      onClick={onClick}
    ><IoIosArrowForward style={{ ...style, color: "black", fontSize: "70px" }} /></div>
  );
}

function SamplePrevArrow({className, style, onClick}) {
  return (
    <div
      className={className}
      onClick={onClick}
    ><IoIosArrowBack style={{ ...style, color: "black", fontSize: "70px"}} /></div>
  );
}

const Carrousel = () => {


  const settings = {
    className: "center",
    useTransform: true,
    infinite: true,
    dots: true,
    centerMode: true,
    centerPadding: "150px",
    slidesToShow: 3,
    focusOnSelect: true,
    slidesToScroll: 1,
    // autoplay: true,
    // speed: 500,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-card">
          <div className="cardContainer">QUEM SOMOS?</div>
        </div>
        <div className="carousel-card">
          <div className="cardContainer">O QUE PODEMOS FAZER POR VOCÊ?</div>
        </div>
        <div className="carousel-card">
          <div className="cardContainer">
            POR QUAL RAZÃO VOCÊ DEVE NOS PROCURAR?
          </div>
        </div>
        <div className="carousel-card">
          <div className="cardContainer">
            TENHA TODAS AS INFORMAÇÕES SOBRE SUA MERCADORIA EM FORMA DIGITAL
          </div>
        </div>
        <div className="carousel-card">
          <div className="cardContainer">
            OBTENHA RELATÓRIOS DE FATURAMENTO, ESTOQUE E VALIDADE DOS SEUS
            PRODUTOS
          </div>
        </div>
        <div className="carousel-card">
          <div className="cardContainer">
            DESTAQUE-SE NO MERCADO UTILIZANDO NOSSA FERRAMENTA QUE PROMETE
            ORGANIZAR OS SEUS CADASTROS
          </div>
        </div>
      </Slider>
      
    </div>
  );
};

export default Carrousel;
