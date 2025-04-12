import './HorizontalScroller.css';
import axios from "axios";
import { useEffect, useState } from "react";
import HorizontalScrollerItems from './HorizontalScrollerItems';

export default function HorizontalScroller({ data }) {
  const [products, setProducts] = useState([]);   
  
  const fetchProducts = async (productIds) => {
    try {            
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/get-products-horizontal-scroller`,
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