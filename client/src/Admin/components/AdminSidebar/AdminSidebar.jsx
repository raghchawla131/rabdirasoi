import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible);
    }
    setOpenDropdown(null);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(false);
    }
  };

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    if (!mobile) {
      setIsSidebarVisible(true); // Ensure sidebar is always visible on larger screens
    } else {
      setIsSidebarVisible(false); // Hide the sidebar when switching to mobile view
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropdownClick = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div>
      {isMobile && (
        <ion-icon
          name="menu-outline"
          className={`menu-icon ${isSidebarVisible ? "hidden" : ""}`}
          onClick={toggleSidebar}
          style={{ padding: "1rem" }}
        ></ion-icon>
      )}
      <div
        className={`sidebar ${
          isSidebarVisible ? "mobile-visible" : "mobile-hidden"
        }`}
      >
        {isMobile && (
          <ion-icon
            name="close-outline"
            className={`close-icon ${isSidebarVisible ? "" : "hidden"}`}
            onClick={toggleSidebar}
          ></ion-icon>
        )}
        {/* Sidebar content goes here */}
        <ul>
          <li><Link to="/admin" onClick={closeSidebar}>Dashboard</Link></li>
          <li onClick={() => handleDropdownClick('products')}>
            Products
            {openDropdown === 'products' && (
              <ul className="dropdown">
                <li><Link to="/admin/add-product" onClick={closeSidebar}>Add Product</Link></li>
                <li><Link to="/admin/show-products" onClick={closeSidebar}>Show All Products</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/admin/orders" onClick={closeSidebar}>Orders</Link></li>
          <li><Link to="/admin/customers" onClick={closeSidebar}>Customers</Link></li>
          <li><Link to="/admin/settings" onClick={closeSidebar}>Settings</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
