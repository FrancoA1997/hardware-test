/* ------------------------------Imports---------------------------- */
//Styles
import 'scss/components/contact/contactHeader.scss'
//Components
//Icons
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
//Props
//React
//Images
import Image from "next/image";
import contactImage from "assets/contact-header.png";
/*---------------------------------------------------------------------- */

const ContactHeader = () => {
  return (
    <header>
        <div className="title">
          <h2 data-aos='fade-up' data-aos-duration='1000'>
            Atencion al cliente <ContactSupportIcon id="icon" />
          </h2>

          <div className="messages">
            <div data-aos='fade-left' data-aos-delay='400' data-aos-duration='1000' className="message-container">
              <p>
                Cliente <PersonIcon />
              </p>
              <span>Hola necesito ayuda con mi pedido!</span>
            </div>
            <div data-aos='fade-in' data-aos-delay='800' data-aos-duration='1000' className="message-container right">
              <p>
                Soporte <SupportAgentIcon />
              </p>
              <span>Contanos tu problema, estamos para ayudarte !</span>
            </div>
            <div data-aos='fade-left' data-aos-delay='1000' data-aos-duration='1000' className="message-container right">
              <p>
                Soporte <SupportAgentIcon />
              </p>
              <span>
                Contamos con soporte al cliente 24 horas los 7 dias de la semana
                !
              </span>
            </div>
          </div>
        </div>
        <div className="image">
          <Image data-aos='fade-in' data-aos-duration='1000' src={contactImage} alt="contact-header-image" />
        </div>
      </header>
  )
}

export default ContactHeader