import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carrousel.css";
import { Link } from "react-router-dom";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CustomArrow = ({ className, style, onClick, direction }) => (
  <div className={className} onClick={onClick}>
    {direction === "left" ? (
      <IoIosArrowBack style={{ ...style, color: "black", fontSize: "70px" }} />
    ) : (
      <IoIosArrowForward style={{ ...style, color: "black", fontSize: "70px" }} />
    )}
  </div>
);

const Carrousel = () => {
  
  const settings = {
    infinite: true,
    dots: true,
    centerMode: true,
    slidesToScroll: 1,
    speed: 500,
    slidesToShow: 3,
    centerPadding: "150px",
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    // mobileFirst: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          centerPadding: "175px",
        }
      }, {
        breakpoint: 425,
        settings: "unslick"
      }
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} >
        <Link to="QuemSomo">
          <div className="carousel-card">
            <div className="cardContainer">QUEM SOMOS?</div>
          </div>
        </Link>
        <Link to="FazerPorVoce">
          <div className="carousel-card">
            <div className="cardContainer">O QUE PODEMOS FAZER POR VOCÊ?</div>
          </div>
        </Link>
        <Link to="DeveProcurar">
          <div className="carousel-card">
            <div className="cardContainer">
              POR QUAL RAZÃO VOCÊ DEVE NOS PROCURAR?
            </div>
          </div>
        </Link>
        <Link>
          <div className="carousel-card">
            <div className="cardContainer">
              TENHA TODAS AS INFORMAÇÕES SOBRE SUA MERCADORIA EM FORMA DIGITAL
            </div>
          </div>
        </Link>
        <Link to="transactions">
          <div className="carousel-card">
            <div className="cardContainer">
              OBTENHA RELATÓRIOS DE FATURAMENTO, ESTOQUE E VALIDADE DOS SEUS
              PRODUTOS
            </div>
          </div>
        </Link>
        <Link to="product_registration">
          <div className="carousel-card">
            <div className="cardContainer">
              DESTAQUE-SE NO MERCADO UTILIZANDO NOSSA FERRAMENTA QUE PROMETE
              ORGANIZAR OS SEUS CADASTROS
            </div>
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Carrousel;
