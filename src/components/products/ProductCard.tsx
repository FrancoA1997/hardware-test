/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/products/productCard.scss";

//Components
import Image from "next/image";
import { useRouter } from "next/navigation";
import FeaturedIcon from "@mui/icons-material/Grade";
/*---------------------------------------------------------------------- */
interface ProductProps {
  itemName: string;
  itemImage: Buffer;
  itemPrice: number;
  discountPercentage: number;
  productId: string;
  featured: boolean;
}

const ProductCard = ({
  itemName,
  itemImage,
  itemPrice,
  productId,
  discountPercentage,
  featured,
}: ProductProps) => {
  const router = useRouter();
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
  return (
    <div
      onClick={() => router.push(`/productos/${productId}`)}
      className="productCard"
    >
      <div className="productCard__image">
        {featured && (
          <div
            style={{
              position: "absolute",
              right: "5px",
              top: "5px",
              color: "rgb(255, 206, 11)",
            }}
          >
            <FeaturedIcon />
          </div>
        )}
        {discountPercentage > 0 && (
          <div className="discount-tag">% {discountPercentage}</div>
        )}
        <Image
          width={0}
          height={0}
          src={URL.createObjectURL(
            new Blob([new Uint8Array(itemImage.data)], {
              type: itemImage.type,
            })
          )}
          alt="item_img"
        />
      </div>
      <div className="productCard__info">
        <div className="info-container">
          <h3>{itemName}</h3>
          <span>
            <strong>3</strong> cuotas sin interes de $
            {discountPercentage === 0 ? (
              <strong>{Math.round(itemPrice / 3)}</strong>
            ) : (
              <strong>
                {Math.round(
                  calculateDiscountedPrice(itemPrice, discountPercentage) / 3
                )}
              </strong>
            )}
          </span>
          <div>
            {discountPercentage > 0 ? (
              <div className="discount">
                <p className="no-discount-price">${itemPrice}</p>
                <p className="with-discount-price">
                  ${calculateDiscountedPrice(itemPrice, discountPercentage)}
                </p>
              </div>
            ) : (
              <p>${itemPrice}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
