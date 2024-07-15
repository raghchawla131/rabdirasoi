// src/App.jsx
import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shop from "./pages/Shop/Shop";
import ItemDetails from "./components/ItemDetails";
import Login from "./pages/Login";
import Admin from "./Admin/Admin";
import AdminLogin from "./Admin/AdminLogin/AdminLogin.jsx";

const Layout = () => (
  <div className="layout">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const ProtectedRoute = ({ element, adminAuthenticated }) => {
  return adminAuthenticated ? element : <Navigate to="/admin/login" />;
};

function App() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/products/:productId",
          element: <ItemDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin setAdminAuthenticated={setAdminAuthenticated} />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute
          element={<Admin />}
          adminAuthenticated={adminAuthenticated}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
