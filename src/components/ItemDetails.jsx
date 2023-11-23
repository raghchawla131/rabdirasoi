import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../products";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../utils/CartStorage";

export default function ItemDetails() {
  const { productId } = useParams();
  const [items, setItems] = useState([]);
  const[itemsQuantity, setItemsQuantity] = useState(1);

  const { productName, price, productImage, about } = PRODUCTS.find(
    (product) => product.key === parseInt(productId)
  );

  function handleIncrement() {
    setItemsQuantity(itemsQuantity + 1);
  }

  function handleDecrement() {
    if(itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    } 
  }

  function handleAddToCartBtnClick() {
    const existingCartItems = getCartItemsFromStorage();
    const isProductInCart = existingCartItems.includes(productId);

    if(!isProductInCart) {
      const newCartItems = [...existingCartItems, productId];
      setCartItemsToStorage(newCartItems);
    }
  }

  return (
    <>
      <div style={{ paddingTop: "81px" }}>
        <div className="selected-item-details">
          <div className="selected-item-img">
            <img src={productImage} alt="" />
          </div>
          <div className="selected-item-desc">
            <h1 id="selected-item-title">{productName}</h1>
            <p>{about}</p>
            <section className="selected-item-price">
                <div>
                  <h4 id="selected-item-size-header">Select size: </h4>
                  <div className="selected-item-size">
                    <div
                      id="1-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <p className="selected-item-choice-pp"><span>1-Pound</span> - 300</p>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="2-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <p className="selected-item-choice-pp"><span>1-Pound</span> - 300</p>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="3-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <p className="selected-item-choice-pp"><span>1-Pound</span> - 300</p>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                    <div
                      id="4-pound-size"
                      className="selected-item-size-choice"
                    >
                      <div>
                        <p className="selected-item-choice-pp"><span>1-Pound</span> - 300</p>
                      </div>
                      <div>
                        <p>Serves group of 2-4</p>
                      </div>
                    </div>
                  </div>
                  <div className="add-selected-item-to-cart">
                    <div className="selected-item-quantity">
                        <button onClick={handleDecrement}><ion-icon name="remove-outline"></ion-icon></button>
                        <div>{itemsQuantity}</div>
                        <button onClick={handleIncrement}><ion-icon name="add-outline"></ion-icon></button>
                    </div>
                    <button onClick={handleAddToCartBtnClick} className="selected-item-to-cart-btn">
                      add to cart
                    </button>
                  </div>
                </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
