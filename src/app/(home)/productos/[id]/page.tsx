'use client'
/* ------------------------------Imports---------------------------- */
//Styles
import '../../../../scss/components/products/productSection.scss';
//Components
import Cart from '@/components/cart/Cart';
import Navbar from '@/components/Navbar';
import ProductView from '@/components/products/ProductView';
//Icons

//React / Next
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer';
//Images
/*---------------------------------------------------------------------- */
const ProductSection = () => {
  const [toggleCart, setToggleCart] = useState(false)
  const params = useParams<{ id: string }>();
  const productId = Number(params.id)

  return (
    <main className='productSection'>
      <Navbar setIsToggle={setToggleCart}/>
      <Cart isToggle={toggleCart} setIsToggle={setToggleCart}/>
      <article className='productSection__container'>
      <ProductView id={productId}/>
      </article>
      <Footer/>
    </main>
  )
}

export default ProductSection;