import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../assets/rab di rasoi logo.png";
import Cart from "../../Cart/Cart";
import CartOverlay from "../../Overlay/CartOverlay";
import { useLogoClick } from "../../../hooks/useLogoClick";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/react-router";

export default function MobileNavbar({
  isMenuOpen,
  setIsMenuOpen,
  isCartVisible,
  openCart,
  closeCart,
}) {
  const scrollToTop = useScrollToTop();
  const handleLogoClick = useLogoClick();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/Shop" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact Us", to: "/Contact" },
    { label: "About Us", to: "/About" },
  ];

  return (
    <>
      <CartOverlay isVisible={isCartVisible} onClick={closeCart} />

      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          px: 2,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ccc",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        {/* Left: Menu Icon */}
        <IconButton onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* Center: Logo */}
        <Box
          component="img"
          src={logo}
          alt="logo"
          onClick={handleLogoClick}
          sx={{ height: 40, cursor: "pointer" }}
        />

        {/* Right: Cart + Auth Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingCart
            onClick={() => {
              openCart();
              setIsMenuOpen(false);
            }}
            aria-label="Open Cart"
            style={{ cursor: "pointer" }}
          />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outlined" size="small">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={handleLogoClick}
            />
            <IconButton onClick={() => setIsMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link, idx) => (
              <ListItem
                button
                key={idx}
                component={Link}
                to={link.to}
                onClick={() => {
                  scrollToTop();
                  setIsMenuOpen(false);
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {isCartVisible && (
        <Cart isCartVisible={isCartVisible} onClose={closeCart} />
      )}
    </>
  );
}
