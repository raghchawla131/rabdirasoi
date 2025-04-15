import axios from "axios";
import { useEffect, useState } from "react";
import HorizontalScrollerItems from "./HorizontalScrollerItems";
import { Box } from "@mui/material";

export default function HorizontalScroller({ data }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (productIds) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/get-products-horizontal-scroller`,
        { ids: productIds }
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(data);
  }, [data]);

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "17.5rem",
        gap: "0.5rem",
        overflowX: "auto",
        padding: "2em 1em",
        "&::-webkit-scrollbar": {
          height: "0.5rem",
        },
        "&::-webkit-scrollbar-track": {
          margin: "0 2rem",
          backgroundColor: "rgba(255, 20, 145, 0.2)",
          borderRadius: "100vw",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 20, 145, 0.8)",
          borderRadius: "100vw",
        },
      }}
    >
      {products.map((product) => (
        <HorizontalScrollerItems key={product.product_id} data={product} />
      ))}
    </Box>
  );
}
