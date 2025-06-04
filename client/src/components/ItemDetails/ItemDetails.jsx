import { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/authContext";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import XContainer from "../Container/XContainer";
import YContainer from "../Container/YContainer";

const MAX_QUANTITY = 3;

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
        const res = await axios.get(
          `${process.env.REACT_APP_TEST_URL}/api/products/get-product/${productId}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
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
    if (itemsQuantity < MAX_QUANTITY) setItemsQuantity(itemsQuantity + 1);
  };

  const handleDecrement = () => {
    if (itemsQuantity > 1) setItemsQuantity(itemsQuantity - 1);
  };

  const handleAddToCartBtnClick = async () => {
    if (!currentUser) {
      setRedirectToSignIn(true);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_TEST_URL}/api/cart/add`, {
        user_id: currentUser.userId,
        product_id: productId,
        pound_quantity: poundQuantity,
        item_quantity: itemsQuantity,
      });
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
    return <Navigate to={`/signin?redirect=/products/${productId}`} replace />;
  }

  if (!product) {
    return (
      <XContainer>
        <YContainer>
          <Typography variant="h6" align="center" mt={4}>
            Loading...
          </Typography>
        </YContainer>
      </XContainer>
    );
  }

  const { name, image_url, description, price } = product;
  const trimmedPrice = parseFloat(price).toFixed(2);

  return (
    <XContainer>
      <YContainer>
        <Box
          sx={{
            paddingY: 8,
            display: "flex",
            gap: { xs: 10 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          {/* Image Section */}
          {/* Image Section */}
<Box
  flex={0.8}
  sx={{
    maxHeight: { xs: 300, md: "70vh" },
    p: { xs: 2, sm: 3, md: 0 }, // padding on small screens
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box
    component="img"
    src={image_url}
    alt={name}
    sx={{
      width: { xs: 350, sm: 350, md: 400 },
      height: { xs: 350, sm: 350, md: 400 },
      borderRadius: 2,
      objectFit: "cover",
      boxShadow: 3, // optional: subtle shadow
    }}
  />
</Box>


          {/* Content Section */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                {name}
              </Typography>
              <Typography variant="body1" mb={3}>
                {description}
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="size-select-label">Select size</InputLabel>
                <Select
                  labelId="size-select-label"
                  value={poundQuantity}
                  label="Select size"
                  onChange={handleSelectChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" alignItems="center" gap={2}>
                <Typography>Quantity:</Typography>
                <IconButton
                  aria-label="decrease quantity"
                  onClick={handleDecrement}
                  disabled={itemsQuantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{itemsQuantity}</Typography>
                <IconButton
                  aria-label="increase quantity"
                  onClick={handleIncrement}
                  disabled={itemsQuantity >= MAX_QUANTITY}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Box mt={4}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleAddToCartBtnClick}
              >
                Add to Cart - &#8377;{trimmedPrice}
              </Button>
            </Box>
          </Box>
        </Box>
      </YContainer>
    </XContainer>
  );
};

export default ItemDetails;
