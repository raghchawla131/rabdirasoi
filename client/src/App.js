import { Routes, Route, Outlet } from "react-router-dom";
import { SignIn, SignUp, SignedOut } from "@clerk/react-router";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shop from "./pages/Shop/Shop";
import ItemDetails from "./components/ItemDetails/ItemDetails.jsx";
import CustomerDetails from "./pages/CustomerDetails/CustomerDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Footer from "./components/layout/Footer/Footer.js";
import NavbarWrapper from "./components/layout/Navbar/NavbarWrapper.jsx";
import "./App.css";

const Layout = () => (
  <div className="layout">
    <NavbarWrapper />
    <Outlet />
    <Footer />
  </div>
);

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shop" element={<Shop />} />
        <Route path="products/:productId" element={<ItemDetails />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route
        path="/sign-in"
        element={
          <SignedOut>
            <SignIn routing="path" path="/sign-in" />
          </SignedOut>
        }
      />
      <Route
        path="/sign-up"
        element={
          <SignedOut>
            <SignUp routing="path" path="/sign-up" />
          </SignedOut>
        }
      />
      <Route path="/customer-details" element={<CustomerDetails />} />

    </Routes>
  );
}

export default App;
