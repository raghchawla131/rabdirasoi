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
      className={`admin-sidebar__menu-icon ${isSidebarVisible ? "admin-sidebar__menu-icon--hidden" : ""}`}
      onClick={toggleSidebar}
      style={{ padding: "1rem" }}
    ></ion-icon>
  )}
  <div
    className={`admin-sidebar ${isSidebarVisible ? "admin-sidebar--mobile-visible" : "admin-sidebar--mobile-hidden"}`}
  >
    {isMobile && (
      <ion-icon
        name="close-outline"
        className={`admin-sidebar__close-icon ${isSidebarVisible ? "" : "admin-sidebar__close-icon--hidden"}`}
        onClick={toggleSidebar}
      ></ion-icon>
    )}
    {/* Sidebar content goes here */}
    <ul className="admin-sidebar__list">
      <li className="admin-sidebar__item"><Link to="/admin" onClick={closeSidebar} className="admin-sidebar__link">Dashboard</Link></li>
      <li className="admin-sidebar__item" onClick={() => handleDropdownClick('products')}>
        <span className="admin-sidebar__link">Products</span>
        {openDropdown === 'products' && (
          <ul className="admin-sidebar__dropdown">
            <li className="admin-sidebar__dropdown-item">
              <Link to="/admin/add-product" onClick={closeSidebar} className="admin-sidebar__link">Add Product</Link>
            </li>
            <li className="admin-sidebar__dropdown-item">
              <Link to="/admin/show-products" onClick={closeSidebar} className="admin-sidebar__link">Show All Products</Link>
            </li>
          </ul>
        )}
      </li>
      <li className="admin-sidebar__item"><Link to="/admin/orders" onClick={closeSidebar} className="admin-sidebar__link">Orders</Link></li>
      <li className="admin-sidebar__item"><Link to="/admin/customers" onClick={closeSidebar} className="admin-sidebar__link">Customers</Link></li>
      <li className="admin-sidebar__item"><Link to="/admin/settings" onClick={closeSidebar} className="admin-sidebar__link">Settings</Link></li>
    </ul>
  </div>
</div>

  );
};

export default AdminSidebar;
