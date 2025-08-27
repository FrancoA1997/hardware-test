"use client";
/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/products/productView.scss";
//Components
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
//Icons
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductsCarousel from "../carousel/ProductsCarousel";
import { toast } from "sonner";
//Props
//Images
import Image from "next/image";

//React & Nextjs
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartProducts } from "@/lib/cart.context";
/*---------------------------------------------------------------------- */
interface Image {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  id: string;
  url: string;
}

interface Gallery {
  id: string;
  images: Image[];
}



interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  thumbnail: { type: string; data: number[] }; // Buffer as an object
  discountPercentage?: number;
  categoryId: string;
  labelId: string;
  galleryId: string;
  gallery: Gallery;

  lastEditDate: string;
}
const ProductView = () => {
  const skeletonArray = [1, 2, 3, 4, 5];
  const params = useParams<{ id: string }>();
  const { products, setProducts } = useCartProducts();
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();
  const [counter, setCounter] = useState<number | null>(1);


  const getProductById = async () => {
    const response = await fetch(`/api/product/getProductById/${params.id}`, {
      method: "GET",
    });

    const data: Product = await response.json();
    console.log(data)
    setProduct(data);

  
    setIsSkeleton(false);
    setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };
  useEffect(() => {
    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateDiscountedPrice = (
    productPrice: number,
    discountPercentage?: number
  ): number => {
    const discount = discountPercentage ?? 0;

    if (discount > 0) {
      const discountAmount = productPrice * (discount / 100);
      const priceWithDiscount = productPrice - discountAmount;
      return Math.round(priceWithDiscount);
    }

    return productPrice;
  };

  const handleCounter = (type: string) => {
    setCounter((prevCounter) => {
      if (prevCounter === null) return 1; // Handle the null case, or any other fallback logic

      if (type === "add") {
        return prevCounter + 1;
      } else if (type === "remove" && prevCounter > 1) {
        return prevCounter - 1;
      }
      return prevCounter;
    });
  };

  

  const handleAddToCart = () => {
      // Buscar si el producto ya está en el carrito
      const existingProduct = products.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // Si ya existe, actualizamos su cantidad
        const updatedProducts = products.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + counter, // Actualizamos la cantidad
              }
            : item
        );
        toast.success('Producto agregado al carrito')
        setProducts(updatedProducts);
      } else {
        // Si no existe, agregamos un nuevo producto
        const newProduct = {
          id: product?.id,
          productName: product?.productName,
          productPrice: product?.productPrice,
          quantity: counter,
        };
        toast.success('Producto agregado al carrito')
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
    }
  
  return (
    <section className="productView">
      {isFetching ? (
        <div
          style={{ opacity: "1!important" }}
          className={
            isSkeleton
              ? "productView__container"
              : " productView__container animationOff"
          }
        >
          <div className="row-container">
            <div data-aos="fade-left" className="image-container">
              <div className="images">
                {skeletonArray.map((item) => (
                  <Skeleton
                    key={item}
                    animation="wave"
                    variant="rounded"
                    sx={{ height: "100%", width: "100%" }}
                  />
                ))}
              </div>
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ height: "100%", width: "100%" }}
              />
            </div>
            <div data-aos="fade-right" className="info-container">
              <div className="navigation">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "100%", width: "100px" }}
                />
                <LinearScaleIcon />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "100%", width: "100px" }}
                />
                <LinearScaleIcon />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "100%", width: "100px" }}
                />
              </div>
              <h2>
                {" "}
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "100%", width: "320px" }}
                />
              </h2>
              <p className="payments">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "50px", width: "320px" }}
                />
              </p>
        
              <div className="productActions">
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "50px", width: "100%" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ height: "50px", width: "100%" }}
                />
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            style={{ padding: "1px", marginBottom: "50px" }}
            className="description"
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ height: "500px", width: "100%" }}
            />
          </div>
        </div>
      ) : (
        <div className="productView__container">
          <div className="row-container">
            <div data-aos="fade-left" className="image-container">
              {product?.gallery && (
                <div className="images">
                  {product?.gallery?.images?.map((image, idx) => (
                    <Image
                      width={0}
                      height={0}
                      key={idx}
                      src={URL.createObjectURL(
            new Blob([new Uint8Array(image.data.data)], {
              type: image.data.type,
            })
          )}
                      alt="product_img"
                    />
                  ))}
                </div>
              )}
              <Image
                width={0}
                height={0}
                src={URL.createObjectURL(
            new Blob([new Uint8Array(product?.thumbnail.data)], {
              type: product?.thumbnail.type,
            })
          )}
                alt="product_img"
              />
            </div>
            <div data-aos="fade-right" className="info-container">
              <div className="navigation">
                <Link href={"/"}>inicio</Link>
                <LinearScaleIcon />
                <Link href={"/productos"}>productos</Link>
                <LinearScaleIcon />
                <p>{product?.productName}</p>
              </div>
              <span className="stock">En stock</span>
              <h2>{product?.productName}</h2>
              {product?.discountPercentage > 0 && (
                <div className="discountPrice">
                  <span>$</span>
                  <h3>
                    {calculateDiscountedPrice(
                      product.productPrice,
                      product.discountPercentage
                    )}
                  </h3>
                  <p>{product.discountPercentage}% OFF</p>
                </div>
              )}
              <h3 className={product?.discountPercentage > 0 ? "hasDiscount" : ""}>
                $ {product?.productPrice}
              </h3>
              <p className="payments">
                Hasta <strong>3</strong> cuotas SIN interés<br/> con{" "}
                <strong>tarjeta de Credito</strong>
              </p>
            
              <div className="productActions">
                <div className="quantity">
                  <button id="remove" onClick={() => handleCounter("remove")}>
                    {" "}
                    <RemoveIcon />{" "}
                  </button>
                  <span className="count">{counter}</span>
                  <button id="add" onClick={() => handleCounter("add")}>
                    <AddIcon />{" "}
                  </button>
                </div>
                <button onClick={() => handleAddToCart()}>
                  Agregar al carrito <AddShoppingCartIcon />{" "}
                </button>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="description">
            <h2>Descripcion del producto</h2>
            <p>{product?.productDescription}</p>
            {/* <h3>Detalles del producto</h3>
          <ul>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                soluta.
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Pariatur, enim? Quam quas animi nam veniam?
              </p>
            </li>
            <li>
              <p>Lorem ipsum dolor sit amet.</p>
            </li>
          </ul> */}
            <h4>CAMBIOS Y DEVOLUCIONES</h4>
            <p>
              Los cambios o devoluciones deberán realizarse dentro de los 10
              días siguientes de haber recibido el paquete.
              <br /> Sin excepciones. (Los costos de envios son a cargo del
              cliente, a no ser que sea por falla en el producto).
            </p>
          </div>
          <ProductsCarousel title="Productos relacionados" type="related" category={product?.categoryId} />
        </div>
      )}
    </section>
  );
};

export default ProductView;
