import React from "react";
import "./Loader.css"; 
import { useLoading } from "../../context/loadingContext";

export default function Loader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}
