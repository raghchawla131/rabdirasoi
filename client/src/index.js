import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import { AuthContextProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={
          "pk_test_YWxlcnQtaGFsaWJ1dC01Ni5jbGVyay5hY2NvdW50cy5kZXYk"
        }
        afterSignOutUrl="/"
      >
        <AuthContextProvider>
          <CartProvider>

          <App />
          </CartProvider>
        </AuthContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
