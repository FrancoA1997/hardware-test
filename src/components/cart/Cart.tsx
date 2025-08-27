/* ------------------------------Imports---------------------------- */
//Styles
import "../../scss/components/cart/cart.scss";
//Components
import CartItem from "./CartItem";
//Icons
import CloseIcon from "@mui/icons-material/Close";
import RemoveCartIcon from "@mui/icons-material/RemoveShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import EmptyCart from "@mui/icons-material/ProductionQuantityLimits";
// import CheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

//Images
import { useCartProducts } from "@/lib/cart.context";
import { useEffect, useState } from "react";

/*---------------------------------------------------------------------- */

interface CartProps {
  isToggle: boolean;
  setIsToggle: (value: boolean) => void;
}
const Cart = ({ isToggle, setIsToggle }: CartProps) => {
  const { products, setProducts } = useCartProducts();
  const [productsImages, setProductImages] = useState([{}]);
  const [modalType, setModalType] = useState("checkout");
  const [toggleModalOpen, setToggleModalOpen] = useState(false);

  const modalTypes = {
    checkout: {
      text: "¿Esta seguro que desea proceder con el checkout?",
      btnConfirm: "Si, estoy seguro",
      btnCancel: "No, seguir comprando",
    },
    cleanCart: {
      text: "¿Esta seguro que desea limpiar el carrito?",
      btnConfirm: "Si, estoy seguro",
      btnCancel: "Cancelar",
    },
  };
  const idsArray = [];

  products.map((product) => {
    idsArray.push(product.id);
  });

  const getThumbnails = async () => {
    const response = await fetch(`/api/multimedia`, {
      method: "POST",
      body: JSON.stringify(idsArray),
    });
    const results = await response.json();
    console.log("results", results);
    const productsImagesObject = results.formattedThumbnails.map((product) => {
      return(
        {
          id: product.id,
          thumbnail: product.thumbnail
        }
      )
    })
        setProductImages(productsImagesObject);
    
  };

  const generateWhatsAppMessage = () => {
    let message = "🛒 *Carrito de Compras*\n\n";
    message += `*-----------------------------------*\n`;
    let totalPrice = 0;

    products.forEach((product, index) => {
      const subtotal = product.quantity * product.productPrice;
      totalPrice += subtotal;

      message += `${index + 1}. *${product.productName}*\n`;
   
      message += `   - Cantidad: ${product.quantity}\n`;
      message += `   - Precio Unitario: $${product.productPrice.toFixed(2)}\n`;
      message += `   - Subtotal: $${subtotal.toFixed(2)}\n\n`;
    });
    message += `*-----------------------------------*\n`;
    message += `*Total: $${totalPrice.toFixed(2)}*\n`;
    message += `\n¡Gracias por tu compra! 😊`;

    return message;
  };
  const handleCheckout = () => {
    if (products.length > 0) {
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = "1156185643";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };
  const handleModal = (type: string) => {
    setToggleModalOpen(true);
    setModalType(type);
  };

  useEffect(() => {
    if(products.length > 0){
      getThumbnails();
    }
  }, [products]);

  return (
    <aside className={isToggle ? "cart open" : "cart"}>
      <div
        className={
          toggleModalOpen ? "confirmationModal modalOpen" : "confirmationModal"
        }
      >
        <div className="confirmationModal__container">
          <span>{modalTypes[modalType].text}</span>
          <div className="actions">
            <button
              id="confirm"
              onClick={() => {
                if (modalType === "checkout") {
                  handleCheckout();
                  setToggleModalOpen(false);
                } else if (modalType === "cleanCart") {
                  setProducts([]);
                  setToggleModalOpen(false);
                }
              }}
            >
              {modalTypes[modalType].btnConfirm}
            </button>
            <button id="cancel" onClick={() => setToggleModalOpen(false)}>
              {modalTypes[modalType].btnCancel}
            </button>
          </div>
        </div>
      </div>
      <div className="cart__container">
        <div className="close-cart">
          <CloseIcon id="icon" onClick={() => setIsToggle(false)} />
        </div>
        <h2>Mi carrito</h2>
        <h3 className="quantity">
          <LabelImportantIcon style={{ scale: ".9" }} />
          {products.length}
          {products.length > 1
            ? " productos seleccionados"
            : " producto seleccionado"}{" "}
          <LabelImportantIcon style={{ scale: ".9", rotate: "180deg" }} />
        </h3>
        <div className="cart__itemList">
          {products.length > 0 ? (
            <>
              {products.map((item, idx) => (
                <CartItem
                  key={idx}
                  productImage={productsImages.filter(
                    (image) => image.id === item.id
                  )}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productQuantity={item.quantity}
                  productId={item.id}
                  setProducts={setProducts}
                />
              ))}
            </>
          ) : (
            <span>
              El carrito esta vacio <EmptyCart id="icon" />
            </span>
          )}
        </div>
        <div className="cart__summary">
          <div className="total">
            <h3>Total:</h3>

            <p>
              {" "}
              $
              {products.reduce((totalPrice, item) => {
                return totalPrice + item.productPrice * item.quantity;
              }, 0)}
            </p>
          </div>
          <div className="actions">
            <button id="check" onClick={() => handleModal("checkout")}>
              Checkout <WhatsAppIcon id="action-icon" />
            </button>
            <button id="clear" onClick={() => handleModal("cleanCart")}>
              Limpiar <RemoveCartIcon id="action-icon" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Cart;
