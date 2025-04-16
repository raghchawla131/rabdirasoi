import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import QuantityStepper from "../QuantityStepper/QuantityStepper";

import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ItemDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [itemsQuantity, setItemsQuantity] = useState(1);
  const [poundQuantity, setPoundQuantity] = useState("1");

  const navigate = useNavigate();

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
    if (itemsQuantity < 3) {
      setItemsQuantity(itemsQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  };

  const handleAddToCartBtnClick = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart/add-to-cart`,
        {
          user_id: currentUser,
          product_id: productId,
          pound_quantity: poundQuantity,
          item_quantity: itemsQuantity,
        }
      );
      alert("Item added to cart successfully");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This item is already in your cart");
      } else {
        console.error("Error adding item to cart", error);
        alert("Failed to add item to cart");
      }
    }
  };

  if (!product) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const { name, image_url, description, price } = product;
  const trimmedPrice = parseFloat(price).toFixed(2);

  return (
    <Box sx={{ pt: 10, px: 2 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          image={image_url}
          alt={name}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
            objectFit: "contain",
          }}
        />
        <CardContent sx={{ width: { md: "50%" }, display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography variant="h4" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>

          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel id="pound-select-label">Select Size</InputLabel>
              <Select
                labelId="pound-select-label"
                value={poundQuantity}
                label="Select Size"
                onChange={handleSelectChange}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <QuantityStepper
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            itemsQuantity={itemsQuantity}
          />

          <Box mt={3}>
            <Button
              variant="outlined"
              onClick={handleAddToCartBtnClick}
              sx={{
                height: "3rem",
                color: "deeppink",
                borderColor: "deeppink",
                ":hover": {
                  backgroundColor: "deeppink",
                  color: "white",
                  borderColor: "deeppink",
                },
              }}
            >
              Add to Cart – ₹{trimmedPrice}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemDetails;
