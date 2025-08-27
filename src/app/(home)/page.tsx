"use client";

/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/home/home.scss";

//Components
import Navbar from "@/components/Navbar";
import ProductsCarousel from "@/components/carousel/ProductsCarousel";
// import Banner from "@/components/home/Banner";
import HomeHeader from "@/components/home/HomeHeader";
import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";

//React
import { useState } from "react";
import ProductsList from "@/components/products/ProductsList";
import { Suspense } from "react";
/*---------------------------------------------------------------------- */

export default function Home() {
  const [toggleCart, setToggleCart] = useState(false);
 
  return (
    <Suspense>

    <main className="home">
      <HomeHeader />
      <Navbar setIsToggle={setToggleCart} />
      <Cart isToggle={toggleCart} setIsToggle={setToggleCart} />
      <article className="home__container">
        <ProductsList navigation={false} />
        <ProductsCarousel type={"featured"} title={"Productos destacados"} />
        {/* <Banner /> */}
        <ProductsCarousel type={"sale"} title={"Productos en oferta"} />
      </article>
      <Footer />
    </main>
    </Suspense>
  );
}
