import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../utils/CartStorage";
import axios from "axios";

const ItemDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [itemsQuantity, setItemsQuantity] = useState(1);

  useEffect(() => {
    // Function to fetch product details based on productId
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`http://localhost:8001/api/products/get-product/${productId}`);
        setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct(); // Call the fetch function when component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]); // Dependency on productId ensures fetch runs when ID changes

  function handleIncrement() {
    setItemsQuantity(itemsQuantity + 1);
  }

  function handleDecrement() {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  }

  function handleAddToCartBtnClick() {
    const existingCartItems = getCartItemsFromStorage();
    const isProductInCart = existingCartItems.includes(productId);

    if (!isProductInCart) {
      const newCartItems = [...existingCartItems, productId];
      setCartItemsToStorage(newCartItems);
    }
  }

  if (!product) {
    return <div>Loading...</div>; // Placeholder for when product data is being fetched
  }

  const { name, image_url, description } = product;

  return (
    <>
      <div style={{ paddingTop: "81px" }}>
        <div className="selected-item-details">
          <div className="selected-item-img">
            <img src={image_url} alt={name} />
          </div>
          <div className="selected-item-desc">
            <h1 id="selected-item-title">{name}</h1>
            <p>{description}</p>
            <section className="selected-item-price">
              <div>
                <h4 id="selected-item-size-header">Select size: </h4>
                <div className="selected-item-size">
                  {/* Placeholder content for size selection */}
                  <div id="1-pound-size" className="selected-item-size-choice">
                    <div>
                      <p className="selected-item-choice-pp">
                        <span>1-Pound</span> - $300
                      </p>
                    </div>
                    <div>
                      <p>Serves group of 2-4</p>
                    </div>
                  </div>
                  {/* Add other size options similarly */}
                </div>
                <div className="add-selected-item-to-cart">
                  <div className="selected-item-quantity">
                    <button onClick={handleDecrement}>
                      <ion-icon name="remove-outline"></ion-icon>
                    </button>
                    <div>{itemsQuantity}</div>
                    <button onClick={handleIncrement}>
                      <ion-icon name="add-outline"></ion-icon>
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCartBtnClick}
                    className="selected-item-to-cart-btn"
                  >
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
};

export default ItemDetails;
