import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";
import { AuthContextProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { LoadingProvider } from "./context/loadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={`${process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY}`}
        afterSignOutUrl="/"
      >
        <AuthContextProvider>
          <CartProvider>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </CartProvider>
        </AuthContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
