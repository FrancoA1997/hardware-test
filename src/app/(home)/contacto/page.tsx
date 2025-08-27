"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "scss/components/contact/contact.scss";
//Components
import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactContent from "@/components/contact/ContactContent";
//Icons

//React
import { useState } from "react";
//Images

/*---------------------------------------------------------------------- */
const Contact = () => {
  const [cartToggle, setCartToggle] = useState(false);
  return (
    <main className="contact">
      <Cart isToggle={cartToggle} setIsToggle={setCartToggle} />
      <Navbar setIsToggle={setCartToggle} />
      <ContactHeader />
      <article className="contact__container">
        <ContactContent />
      </article>
      <Footer />
    </main>
  );
};

export default Contact;
