/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/cart/cartItem.scss";

//Components
import Image from "next/image";

//Icons
import DeleteIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { useCartProducts } from "@/lib/cart.context";
/*---------------------------------------------------------------------- */
interface ItemProps {
  productName: string;
  productPrice: string;
  productImage: [];
  productQuantity: string;
  setProducts: () => void;
  productId: string;
}
const CartItem = ({
  productName,
  productImage,
  productPrice,
  productQuantity,
  productId,
  setProducts,
}: ItemProps) => {
  const { products } = useCartProducts();
 
  let thumbnailImage = productImage[0]?.thumbnail !== undefined ? productImage[0]?.thumbnail : [];
  const handleCounter = (type: string) => {
    const existingProduct = products.find((item) => item.id === productId);
    
    if (existingProduct) {
      // Si ya existe, actualizamos su cantidad
      const updatedProducts = products.map((item) => {
        if (type === "add") {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        } else {
          if (item.id === productId && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        }
        return item;
      });
      setProducts(updatedProducts);
    }
  };
  return (
    <div className="cart-item">
      <div className="image-container">
        {productImage.length > 0 ? (
          <Image
            width={0}
            height={0}
            src={URL.createObjectURL(
              new Blob([new Uint8Array(thumbnailImage.data)], {
                type: thumbnailImage.type,
              })
            )}
            alt="product-image"
          />
        ) : null}
      </div>

      <div className="info">
        <h3>{productName}</h3>
        {/* <span>Talle: {productSize}</span> */}
        <div className="quantity">
          <button id="remove" onClick={() => handleCounter("remove")}>
            {" "}
            <RemoveIcon />{" "}
          </button>
          <span className="count">{productQuantity}</span>
          <button id="add" onClick={() => handleCounter("add")}>
            <AddIcon />{" "}
          </button>
        </div>
      </div>
      <div className="delete">
        <p>${productPrice * productQuantity}</p>
        <DeleteIcon
          id="icon"
          onClick={() => {
            const newProductsArray = products.filter(
              (item) => item.id !== productId
            );
            setProducts(newProductsArray);
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
