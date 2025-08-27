/* ------------------------------Imports---------------------------- */
//Styles
import "../scss/components/navbar.scss";
//Components
import Link from "next/link";

//Icons
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useState, useRef } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//React
//Images
import Image from "next/image";
import logo from "../assets/logoOnly.png";
/*---------------------------------------------------------------------- */
//Props
interface CartProps {
  setIsToggle: (value: boolean) => void;
}

const Navbar = ({ setIsToggle }: CartProps) => {
  const [mobileToggle, setMobileToggle] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setMobileToggle(!mobileToggle);
    navRef.current?.classList.toggle("open");
  };
  return (
    <nav className={mobileToggle ? "opened" : " "}>
      <div className="logo-container">
        <Image src={logo} alt="logo" />
        <p>Destiny Hardware</p>
      </div>
      <div className="items">
        <div className="logo-container-mb">
          <Image src={logo} alt="logo" />
          <p>Destiny Hardware</p>
        </div>
        {/* <div className="dropdown" id="products-container">
          <p>
            Categorias <ArrowRightIcon id="arrow" />
          </p>

          <div className="dropdown-menu" id="products-menu">
            <ul>
              <li><NavigateNextIcon style={{scale: '0.8'}} /> Mujeres</li>

              <li><NavigateNextIcon style={{scale: '0.8'}} /> Varones</li>

              <li><NavigateNextIcon style={{scale: '0.8'}} /> Niños</li>
            </ul>
          </div>
        </div> */}
        <div className="hover-item">
        <Link href={"/"}>Inicio</Link>
        </div>
        <div className="hover-item">
        <Link href={"/productos"}>Productos</Link>
        </div>
        <div className="hover-item">
        <Link href={"/nosotros"}>Nosotros</Link>
        </div>
        <div className="hover-item">
        <Link href={"/contacto"}>Contactanos</Link>
        </div>          
      </div>
      {/* <div className="icon-container">
        <QuestionMarkIcon id="icon" />
      </div> */}
      <div className="icon-container" onClick={() => setIsToggle(true)}>
        <ShoppingCartIcon id="icon" />
      </div>
      <div
        ref={navRef}
        onClick={() => handleToggle()}
        className="icon nav-icon-5"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
