"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "scss/components/about/about.scss";

//Components
import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutContent from "@/components/about/About";
//Icons
//Props
//React
import { useState } from "react";
//Images

/*---------------------------------------------------------------------- */
const About = () => {
  const [toggleCart, setToggleCart] = useState(false);

  return (
    <main className="about">
      <Navbar setIsToggle={setToggleCart} />
      <Cart isToggle={toggleCart} setIsToggle={setToggleCart} />
      <article className="about__container">
        <AboutContent />
      </article>
      <Footer />
    </main>
  );
};

export default About;
