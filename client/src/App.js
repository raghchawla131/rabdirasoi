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
import ItemDetails from "./components/ItemDetails/ItemDetails.jsx";
import Admin from "./Admin/Admin";
import AdminLogin from "./Admin/pages/AdminLogin/AdminLogin.jsx";
import AddProducts from "./Admin/pages/AddProducts/AddProducts.jsx";
import ShowProducts from "./Admin/pages/ShowProducts/ShowProducts.jsx";
import AdminSidebar from "./Admin/components/AdminSidebar/AdminSidebar.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import CustomerDetails from "./pages/CustomerDetails/CustomerDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";

const Layout = () => (
  <div className="layout">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

// admin-layout css is in app.css file
const AdminLayout = () => (
  <div className="admin-layout">
    <AdminSidebar />
    <Outlet />
  </div>
);

const ProtectedRoute = ({ element, adminAuthenticated }) => {
  return adminAuthenticated ? element : <Navigate to="/admin/login" />;
};

function App() {
  const [adminAuthenticated, setAdminAuthenticated] = useState(true); // Start with adminAuthenticated as false

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
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/customer-details",
      element: <CustomerDetails />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin setAdminAuthenticated={setAdminAuthenticated} />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute
          element={<AdminLayout />}
          adminAuthenticated={adminAuthenticated}
        />
      ),
      children: [
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/add-product",
          element: <AddProducts />,
        },
        {
          path: "/admin/show-products",
          element: <ShowProducts />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
