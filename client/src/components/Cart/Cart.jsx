import { useContext, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import CartItem from "../CartItems/CartItem";

export default function Cart({ isCartVisible, onClose }) {
  const { currentUser } = useContext(authContext);
  const { cartItems, subtotal, total, fetchCartItems } = useCart();
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser, fetchCartItems]);

  return (
    <Drawer
      anchor="right"
      open={isCartVisible}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 400 },
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Your Orders
        </Typography>
        <IconButton onClick={onClose}>
          <IoClose size={24} />
        </IconButton>
      </Box>
      <Divider />

      {/* Items */}
      <Box
        flexGrow={1}
        overflow="auto"
        px={2}
        py={1}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.product_id}
              item={item}
              fetchCartItems={fetchCartItems}
            />
          ))
        ) : (
          <Typography variant="body1" textAlign="center" mt={4}>
            Your cart is empty.
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Footer */}
      <Box p={2} boxShadow="0 -2px 4px rgba(0,0,0,0.1)">
        <Stack spacing={1} mb={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={500}>Subtotal</Typography>
            <Typography fontWeight={500}>₹{subtotal}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight={600}>Total</Typography>
            <Typography fontWeight={600}>₹{total}</Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          onClick={navigateToCheckout}
          sx={{
            backgroundColor: "deeppink",
            "&:hover": { backgroundColor: "#c2185b" },
            fontWeight: 700,
          }}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
}
