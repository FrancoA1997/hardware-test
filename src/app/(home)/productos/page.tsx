'use client'
/* ------------------------------Imports---------------------------- */
//Styles
import '../../../scss/components/products/products.scss'

//Components
import Footer from '@/components/Footer'
import Cart from "@/components/cart/Cart"
import Navbar from "@/components/Navbar"
import ProductsList from '@/components/products/ProductsList'
import ProductsSidebar from '@/components/products/ProductsSidebar'

//Icons

//React
import { useState } from 'react';
import { Suspense } from "react";
//Images
/*---------------------------------------------------------------------- */


const Page = () => {
    const [toggleCart, setToggleCart] = useState(false)
    const [toggleFilter, setToggleFilter] = useState(false)
    return (
      <Suspense>

    <main className="products">
     <Navbar setIsToggle={setToggleCart}/>
     <Cart isToggle={toggleCart} setIsToggle={setToggleCart}/>
        <article className="products__container">
        <ProductsSidebar setIsToggle={setToggleFilter} toggleOpen={toggleFilter}/>
        <ProductsList navigation={true}/>
        </article>
        <Footer/>
    </main>
      </Suspense>
  )
}

export default Page