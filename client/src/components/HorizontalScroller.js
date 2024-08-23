import axios from "axios";
import HorizontalScrollerItems from "./HorizontalScrollerItems";
import { useEffect, useState } from "react";

export default function HorizontalScroller({ data }) {
  const [products, setProducts] = useState([]);   
  
  const fetchProducts = async (productIds) => {
    try {            
      const res = await axios.post(
        "http://localhost:8000/api/products/get-products-horizontal-scroller",
        { 
          ids: productIds,
        }
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(data); // Pass `data` here
  }, [data])

  return (
    <>
      <div className="horizontal-scroller">
        {products.map((product) => (
          <HorizontalScrollerItems key={product.product_id} data={product} />
        ))}
      </div>
    </>
  );
}