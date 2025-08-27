/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/carousel/productsCarousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Components
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import { Spinner } from "@geist-ui/core";
//Icons
import OnSaleIcon from "@mui/icons-material/Loyalty";
import FeaturedIcon from "@mui/icons-material/Star";
import ClassIcon from "@mui/icons-material/Class";
import ProductCard from "../products/ProductCard";
//Props
//React
//Images
import {productsData} from "../../data/products";
import { useEffect, useState } from "react";
/*---------------------------------------------------------------------- */
interface ProductsCarouselProps {
  type: string;
  title: string;
  category?: string;
}
interface TypeItem {
  icon: JSX.Element;
  url: string;
}
interface ProductItem {
  id: string; // ID único del producto
  discountPercentage: number; // Porcentaje de descuento
  thumbnail: string; // URL de la imagen del producto
  productName: string; // Nombre del producto
  productPrice: number; // Precio del producto
  featured: boolean; // Indica si el producto es destacado
}


interface Types {
  sale: TypeItem;
  featured: TypeItem;
  related: TypeItem;
}
const ProductsCarousel = ({type, title, category}: ProductsCarouselProps) => {
  const [products, setProducts] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const params = new URLSearchParams();
  if(category) params.append('category', category)
  const types: Types =  {
    sale: {
      icon:  <OnSaleIcon id="icon" />,
      url: 'sale'
    },
    featured: {
      icon: <FeaturedIcon id="icon" />,
      url: `featured`
    },

    related:{
      icon:  <ClassIcon id="icon" />,
      url: `related?${params.toString()}`
    }
  };

const getProducts = async() => {
  const response = await fetch(`/api/carousels/${types[type].url}`,
    {
    method: 'GET',
  },
)
  const results = await response.json()
  setProducts(results.data)
  setTimeout(() => {
    setIsFetching(false)
  }, 1500);
}

useEffect(() => {
  getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section data-aos="fade-up" className="carousel-container">
      <div className="title-container">
        <h2>
          {title}
          <div className="icon-container">{types[type].icon}</div>
        </h2>
      </div>
      {isFetching ? (
        <div className="fetching">
          <Spinner id='spinner'/>
        </div>
      ) : (
        <>
        {products.length > 4 && products.length !== 0  ? (
        <Slider {...settings}>
          {products.map((item: ProductItem) => (
            <CarouselItem
            discountPercentage={item.discountPercentage}
            itemImage={item.thumbnail}
            itemName={item.productName}
            itemPrice={item.productPrice}
            productId={item.id}
            featured={item.featured}
            key={item.id}
            />
          ))}
        </Slider>
        ): (
          <div className="noCarousel">
    {products.map((item: ProductItem) => (
            <ProductCard
            discountPercentage={item.discountPercentage}
            itemImage={item.thumbnail}
            itemName={item.productName}
            itemPrice={item.productPrice}
            productId={item.id}
            featured={item.featured}
            key={item.id}
            />
          ))}
          </div>
        )}
        </>
      )}
      {products.length === 0 && isFetching === false &&(
        <div className="no-products">
          <h2>No se encontraron productos</h2>
        </div>
      )}
    </section>
  );
};

export default ProductsCarousel;
