// src/hooks/useLogoClick.js
import { useLocation, useNavigate } from "react-router-dom";

export function useLogoClick() {
  const location = useLocation();
  const navigate = useNavigate();

  return function handleLogoClick() {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };
}
