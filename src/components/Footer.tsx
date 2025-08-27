/* ------------------------------Imports---------------------------- */
//Styles
import "../scss/components/Footer.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Components
//Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from '@mui/icons-material/Chat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import Slider from "react-slick";
//React
import { ReactNode } from "react";
//Images
import logo from "../assets/logoOnly.png";
import Image from "next/image";
import Link from "next/link";
/*---------------------------------------------------------------------- */
interface Network {
  label: string;
  icon: ReactNode; // Since icons are JSX elements, ReactNode is a suitable type
}
interface Contact {
  data: string;
  icon: ReactNode; // Since icons are JSX elements, ReactNode is a suitable type
}
interface Sitemap {
  section: string;
  href: string; // Since icons are JSX elements, ReactNode is a suitable type
}
const Footer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const networks: Network[] = [
    {
      label: "Facebook",
      icon: <FacebookIcon id="icon" />,
    },
    {
      label: "X/Twitter",
      icon: <XIcon id="icon" />,
    },
    {
      label: "Instagram",
      icon: <InstagramIcon id="icon" />,
    },
  ];
  const contacts: Contact[] = [
    {
      data: "Santa fe, Rosario, Ejemplo 123",
      icon: <LocationOnIcon id="icon" />,
    },
    {
      data: "example@gmail.com.ar",
      icon: <EmailIcon id="icon" />,
    },
    {
      data: "+11 111 111-1111",
      icon: <WhatsAppIcon id="icon" />,
    },
  ];
  const sitemaps: Sitemap[] = [
    {
      section: "Inicio",
      href: "/",
    },
    {
      section: "Productos",
      href: "/productos",
    },
    {
      section: "Nosotros",
      href: "/nosotros",
    },
    {
      section: "Contacto",
      href: "/contacto",
    },
   
  ];
  return (
    <footer className="footer">
      <div className="footer__info">
      <div className="footer__info-item">
          <CreditCardIcon id='icon'/>
          <p>Entre 3 a 6 cuotas sin interes en compras mayores a 999.999</p>
        </div>
        <div className="footer__info-item">
          <LocalShippingIcon id='icon'/>
          <p>Disponibilidad de envio los 5 dias de la semana</p>
        </div>
        <div className="footer__info-item">
          <ChatIcon id='icon'/>
          <p>Soporte 24/7 a tu disposicion</p>
        </div>
      </div>
      <div className="footer__carousel">
        <Slider {...settings}>
        <div className="footer__info-item">
          <CreditCardIcon id='icon'/>
          <p>Entre 3 a 6 cuotas sin interes en compras mayores a 999.999</p>
        </div>
        <div className="footer__info-item">
          <LocalShippingIcon id='icon'/>
          <p>Disponibilidad de envio los 5 dias de la semana</p>
        </div>
        <div className="footer__info-item">
          <ChatIcon id='icon'/>
          <p>Soporte 24/7 a tu disposicion</p>
        </div>
        </Slider>
      </div>
      <div className="footer__container">
        <div className="footer__news">
          <div className="logo">
            <Image src={logo} alt="logo_img" />
            <a href="https://destinyti.com/" target="__blank">Desarrollado por Destiny</a>
          </div>
          <div className="subscription">
            <h3>Únete a nuestra comunidad</h3>
            <p>
              Suscríbete a nuestro newsletter y sé el primero en descubrir las
              últimas tendencias en tecnologia y ofertas exclusivas. <br />
              <br />
              ¡No te pierdas nada y mantente siempre a la al tanto a lo nuevo en tecnologia!
            </p>
            <input type="text" placeholder="Direccion de email" />
            <button>Subscribirse</button>
          </div>
        </div>
        <div className="footer__about">
          <div className="networks">
            <h3>Encontranos en:</h3>
            <div className="networks__container">
              {networks.map((item) => (
                <div key={item.label} className="networks__item">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="contact">
            <h3>Visitanos o contactanos</h3>
            {contacts.map((item) => (
              <div key={item.data} className="contact__item">
                {item.icon}
                <p>{item.data}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__sitemap">
            <h3>Mapa de la tienda</h3>
            <div className="sitemap-container">
            {sitemaps.map((item) => (
                <div key={item.section} className="sitemap-item">
                    <LabelImportantIcon id='sitemap-icon'/>
                    <Link href={item.href}>{item.section}</Link>
                </div>

            ))}
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
