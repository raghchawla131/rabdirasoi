import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Box, Typography } from "@mui/material";
import Product from "../../components/Product/Product";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/products/show-products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const categories = ["Cakes", "Brownies", "Chocolates", "Cupcakes"];

  return (
    <Container sx={{ pt: "81px" }}>
      {/* Collections Container */}
      <Box
        sx={{
          px: "7.5px",
          pb: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          // On larger screens, use a 12-column grid layout.
          gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
        }}
      >
        {categories.map((category) => (
          <Box
            key={category}
            sx={{
              display: "flex",

              mb: "30px",
            }}
          >
            {/* Header */}
            <Box sx={{ px: "15px", pb: "30px" }}>
              <Typography
                variant="h3"
                sx={{
                  pt: "1em",
                  textTransform: "uppercase",
                  fontSize: category === "Chocolates" ? "2.4rem" : "2.5rem", // adjust as needed
                  wordBreak: "break-word", // just in case
                }}
              >
                {category}
              </Typography>

              <Typography sx={{ pt: "1em" }}>
                Layers of frosting, cake crumbs and see-through-sides make these
                easy-to-spot-cakes darn near impossible to resist.
              </Typography>
            </Box>
            {/* Products Grid */}
            <Box
              sx={{
                pt: "3em",
                display: "grid",
                gap: "15px",
                // Two columns by default, three on larger screens:
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
              }}
            >
              {filterProductsByCategory(category).map((product) => (
                <Product key={product.product_id} data={product} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
