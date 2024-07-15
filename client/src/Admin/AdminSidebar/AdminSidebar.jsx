import React, { useState, useEffect } from 'react';
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarVisible(!isSidebarVisible);
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
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <ion-icon 
          name="menu-outline" 
          className={`menu-icon ${isSidebarVisible ? 'hidden' : ''}`} 
          onClick={toggleSidebar} 
          style={{ padding: '1rem' }}
        ></ion-icon>
      )}
      <div className={`sidebar ${isSidebarVisible ? 'mobile-visible' : 'mobile-hidden'}`}>
        {isMobile && (
          <ion-icon 
            name="close-outline" 
            className={`close-icon ${isSidebarVisible ? '' : 'hidden'}`} 
            onClick={toggleSidebar} 
          ></ion-icon>
        )}
        {/* Sidebar content goes here */}
        <ul>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Customers</li>
          <li>Settings</li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
