/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/home/banner.scss";
//Components
//Icons
import OnSaleIcon from '@mui/icons-material/Loyalty';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//Props
//React
//Images
import Image from "next/image";
import BannerPlaceholder2 from "../../assets/banner-2.jpg";
// import BannerPlaceholder from "../../assets/banner1.webp";
/*---------------------------------------------------------------------- */

const Banner = () => {
  return (
    <section data-aos='fade-in' data-aos-duration='5000' className="banner">
      <div className="banner__container">
        <div className="image-container">
            <Image src={BannerPlaceholder2} alt="banner-img"/>
        </div>
        <div className="info-container">
            <h2><strong>Liquidacion:</strong><br/> Coleccion de invierno</h2>
            <span>hasta 50% off <OnSaleIcon/></span>
            <p>¡Aprovecha nuestra gran liquidación de invierno! Descuentos increíbles en abrigos, suéteres, bufandas y mucho más. Prepárate para el frío con estilo y al mejor precio.<br/><br/>  ¡Stock limitado, no te lo pierdas!</p>
            <button>Ver coleccion <ArrowForwardIcon/></button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
