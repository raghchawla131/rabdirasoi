import React from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function HorizontalScrollerItems({ data }) {
  const { name, description, product_id, image_url } = data;
  const productPath = `/products/${product_id}`;

  return (
    <Link to={productPath} style={{ textDecoration: "none", color: "inherit" }}>
      <Paper
        sx={{
          boxSizing: "border-box",
          borderRadius: "10px",
          boxShadow: "0 28px 30px -12px #334a6733",
          overflow: "hidden",
          height: "24rem", // Set a fixed height for the Paper
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            height: "18rem",
            position: "relative",
            overflow: "hidden",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            "& img": {
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transformOrigin: "center center",
            },
            "&:hover img": {
              transform: "scale(1.1)",
            },
          }}
        >
          <img src={image_url} alt="productImage" />
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1, // Ensures this section takes remaining space
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis", // Truncate excess text with ellipsis
            }}
          >
            {description}
          </Typography>
        </Box>
      </Paper>
    </Link>
  );
}
