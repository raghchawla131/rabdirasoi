import React, { useContext, useEffect, useState } from "react";
import "./ItemDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const ItemDetails = () => {
  const {currentUser} = useContext(AuthContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const [poundQuantity, setPoundQuantity] = useState("1");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8001/api/products/get-product/${productId}`
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
  }

  const handleDecrement = () => {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  }

  const handleAddToCartBtnClick = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:8001/api/cart/add-to-cart",
        {
          user_id: currentUser,
          product_id: productId,
          pound_quantity: poundQuantity,
        },
      );
      alert("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart", error);
      alert("Failed to add item to cart");
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
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
            <div>
              <h4 id="selected-item-size-header">Select size: </h4>
              <div className="custom-dropdown">
                <select value={poundQuantity} onChange={handleSelectChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
