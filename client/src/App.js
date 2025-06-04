import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shop from "./pages/Shop/Shop";
import ItemDetails from "./components/ItemDetails/ItemDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Footer from "./components/layout/Footer/Footer.js";
import NavbarWrapper from "./components/layout/Navbar/NavbarWrapper.jsx";
import "./App.css";
import UserProtectedRoute from "./components/Auth/UserProtectedRoute.jsx";
import AdminProtectedRoute from "./components/Auth/AdminProtectedRoute.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import OrderDetails from "./pages/CustomerDetails/OrderDetails.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const Layout = () => (
  <div className="layout">
    <NavbarWrapper />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <Loader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="products/:productId" element={<ItemDetails />} />
          <Route
            path="checkout"
            element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/order-details"
            element={
              <UserProtectedRoute>
                <OrderDetails />
              </UserProtectedRoute>
            }
          />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
