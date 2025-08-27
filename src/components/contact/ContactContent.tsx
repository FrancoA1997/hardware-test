/* ------------------------------Imports---------------------------- */
//Styles
import 'scss/components/contact/contactContent.scss'
//Components
//Icons
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
//Props
//React
import React from "react";
//Images
/*---------------------------------------------------------------------- */

const ContactContent = () => {
  return (
    <>
      <aside
        data-aos="fade-right"
        data-aos-duration="1000"
        className="info"
      >
        <div className="info-item">
          <div className="title">
            <HomeIcon />
            <h3>Direccion</h3>
          </div>
          <p>Santa fe, Rosario, Ejemplo 123</p>
        </div>
        <div className="info-item">
          <div className="title">
            <PhoneIcon />
            <h3>Telefonos</h3>
          </div>
          <p>+54 911 5618-5643</p>
          <p>+54 911 5618-5643</p>
        </div>
        <div className="info-item">
          <div className="title">
            <WhatsAppIcon />
            <h3>Whatsapp</h3>
          </div>
          <p>
            <strong>Seguimiento: </strong>+54 911 5618-5643
          </p>
          <p>
            <strong>Soporte: </strong>+54 911 5618-5643
          </p>
        </div>
        <div className="info-item">
          <div className="title">
            <AccessTimeIcon />
            <h3>Horarios</h3>
          </div>
          <p>
            <strong>Lunes a viernes: </strong> 8:00 am - 7:00 pm
          </p>
          <p>
            <strong>Sabados: </strong> 8:00 am - 12:00 pm
          </p>
          <p>
            <strong>Domingos y feriados: </strong> 9:00 am - 11:30 pm
          </p>
        </div>
      </aside>
      <section
        data-aos="fade-left"
        data-aos-duration="1000"
        className="map"
      >
        <iframe
          id="map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27237.023393932825!2d-64.1630208!3d-31.424375899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1727387408172!5m2!1ses-419!2sar"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};

export default ContactContent;
