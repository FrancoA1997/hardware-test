/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/products/productsList.scss";

//Components
import ProductCard from "./ProductCard";
import SkeletonProduct from "./SkeletonProduct";

import GpsOffIcon from "@mui/icons-material/GpsOff";
//React
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
// import { productsData } from "@/data/products";
/*---------------------------------------------------------------------- */
type ProductProps = {
  categoryId: string;
  discountPercentage: number;
  galleryId: string;
  hasDiscount: boolean;
  id: string;
  labelId: string;
  productDescription: string;
  productName: string;
  productPrice: number;
  thumbnail: Buffer; // Correctly typed as a Buffer
};

interface ProductListProps {
  navigation: boolean;
}

const ProductsList = ({ navigation }: ProductListProps) => {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSkeleton, setIsSkeleton] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [pageCount, setPageCount] = useState(new Array(1));
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedMinPrice = searchParams.get("min") || "";
  const selectedMaxPrice = searchParams.get("max") || "";
  const selectedOrder = searchParams.get("orderBy") || "asc";
  const selectedPage = searchParams.get("page") || "1";
  const params = new URLSearchParams();

  if (selectedBrand) params.append("brand", selectedBrand);
  if (selectedCategory) params.append("category", selectedCategory);
  if (selectedMinPrice) params.append("min", selectedMinPrice);

  if (selectedMaxPrice) params.append("max", selectedMaxPrice);
  if (selectedOrder) params.append("orderBy", selectedOrder);
  if (selectedPage) params.append("page", selectedPage);

  const getAllProducts = async () => {
    const productResponse = await fetch(`/api/product?${params.toString()}`, {
      method: "GET",
    });
    const productData = await productResponse.json();
    console.log(productData);

    setProducts(productData.data);
    setPageCount(new Array(Math.ceil(productData.productsCount / 15)).fill(null));
    if (productData) {
      setIsSkeleton(false);
      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  };

  useEffect(() => {
    getAllProducts();
    setIsFetching(true);
    setIsSkeleton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedPage,
    selectedBrand,
    selectedCategory,
    selectedMaxPrice,
    selectedMinPrice,
    selectedOrder,
  ]);

  const productCards = useMemo(() => {
    // Memoize the list of product cards
    return products.map((item) => (
      <ProductCard
        productId={item.id}
        itemImage={item.thumbnail}
        itemName={item.productName}
        itemPrice={item.productPrice}
        hasDiscount={item.hasDiscount}
        discountPercentage={item.discountPercentage}
        key={item.id}
      />
    ));
  }, [products]);
  return (
    <section className="productsList">
      {!navigation && (
        <div className="title-container">
          <h2>
            Nuestros Productos
            <div className="icon-container">
              <CategoryIcon id="icon" />
            </div>
          </h2>
        </div>
      )}
      <div data-aos="fade-left" className="productsList__container">
        {isFetching ? (
          <>
            {skeletonArray.map((item) => (
              <SkeletonProduct isFetching={isSkeleton} key={item} />
            ))}
          </>
        ) : (
          <>
            {products.length > 0 ? (
              <>{productCards}</>
            ) : (
              <div className="productsList__fallback">
                <GpsOffIcon id="icon" />
                <h3>No se encontraron productos</h3>
              </div>
            )}
          </>
        )}
      </div>
      {navigation ? (
        <div className="pagination">
          {pageCount.map((item, idx) => (
            <Link
              href={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
                ["page"]: (idx + 1).toString(),
                // Dynamically update the current query param
              }).toString()}`}
              key={item}
              className="pagination__item"
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      ) : (
        <div className="go-products">
          <Link href={"/productos"}>Ver todos los productos</Link>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
