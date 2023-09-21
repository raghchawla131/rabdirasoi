import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Footer from "./components/Footer";
import About from "./pages/about";
import Contact from "./pages/contact"
import Shop from "./pages/shop";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
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
