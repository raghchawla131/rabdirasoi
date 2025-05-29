import './HorizontalScroller.css';
import axios from "axios";
import { useEffect, useState } from "react";
import HorizontalScrollerItems from './HorizontalScrollerItems';

export default function HorizontalScroller({ data }) {
  const [products, setProducts] = useState([]);   
  
  const fetchProducts = async (productIds) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/products/get`,
      {
        ids: productIds,
      }
    );

    // Filter products with tag "Best Seller"
    const bestSellers = res.data.filter(
      (product) => product.tags?.toLowerCase() === "best seller"
    );

    setProducts(bestSellers);
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