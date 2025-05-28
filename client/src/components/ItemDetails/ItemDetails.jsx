import React, { useContext, useEffect, useState } from "react";
import "./ItemDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/authContext";
import { RedirectToSignIn } from "@clerk/react-router";

const ItemDetails = () => {
  const { currentUser } = useContext(authContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const [poundQuantity, setPoundQuantity] = useState("1");

  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/products/get-product/${productId}`
        );
        setProduct(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const options = [
    { value: "1", label: "1 Pound" },
    { value: "1.5", label: "1.5 Pounds" },
    { value: "2", label: "2 Pounds" },
    { value: "2.5", label: "2.5 Pounds" },
    { value: "3", label: "3 Pounds" },
    { value: "3.5", label: "3.5 Pounds" },
    { value: "4", label: "4 Pounds" },
    { value: "4.5", label: "4.5 Pounds" },
    { value: "5", label: "5 Pounds" },
  ];

  const handleSelectChange = (event) => {
    setPoundQuantity(event.target.value);
  };

  const handleIncrement = () => {
    if (itemsQuantity >= 3) {
      return;
    }
    setItemsQuantity(itemsQuantity + 1);
  };

  const handleDecrement = () => {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  };

  const handleAddToCartBtnClick = async () => {
    if (!currentUser) {
      setRedirectToSignIn(true);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart/add-to-cart`,
        {
          user_id: currentUser.userId,
          product_id: productId,
          pound_quantity: poundQuantity,
          item_quantity: itemsQuantity,
        }
      );
      alert("Item added to cart successfully");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("This item is already in your cart");
      } else {
        console.error("Error adding item to cart", error);
        alert("Failed to add item to cart");
      }
    }
  };

  if (redirectToSignIn) {
    return <RedirectToSignIn redirectUrl={`/products/${productId}`} />;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, image_url, description, price } = product;

  const trimmedPrice = parseFloat(price).toString();

  return (
    <div className="item-details">
      <div className="item-details__container">
        <div className="item-details__image">
          <img src={image_url} alt={name} />
        </div>
        <div className="item-details__content">
          <h1 className="item-details__title">{name}</h1>
          <p className="item-details__description">{description}</p>
          <div>
            <h4 className="item-details__size-label">Select size: </h4>
            <div className="item-details__dropdown">
              <select value={poundQuantity} onChange={handleSelectChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="item-details__actions">
              <div className="item-details__quantity">
                <button
                  onClick={handleDecrement}
                  className="item-details__quantity-btn"
                >
                  <ion-icon name="remove-outline"></ion-icon>
                </button>
                <div className="item-details__quantity-value">
                  {itemsQuantity}
                </div>
                <button
                  onClick={handleIncrement}
                  className="item-details__quantity-btn"
                >
                  <ion-icon name="add-outline"></ion-icon>
                </button>
              </div>
              <button
                onClick={handleAddToCartBtnClick}
                className="item-details__cart-btn"
              >
                Add to Cart - &#8377;{trimmedPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
