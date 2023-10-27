import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import ItemDetails from "./components/ItemDetails";
import Login from "./pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 800)
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    }
  }, [])

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {isMobile ? <Sidebar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Shop" element={<Shop />}></Route> 
        <Route path="/products/:productId" element={<ItemDetails />}></Route>
        <Route path="/login" element={<Login />}></Route> 
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}
