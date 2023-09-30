import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact"
import Shop from "./pages/Shop";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <>
      {isMobile ? <Sidebar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Shop" element={<Shop />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
