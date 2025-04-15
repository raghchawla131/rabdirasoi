import React from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function Product({ data }) {
  const { name, image_url, description, product_id } = data;
  const productPath = `/products/${product_id}`;

  const truncatedName = name.length > 18 ? `${name.slice(0, 18)}...` : name;
  const truncatedDesc =
    description.length > 33 ? `${description.slice(0, 33)}...` : description;

  return (
    <Link to={productPath} style={{ textDecoration: "none", color: "inherit" }}>
      <Paper
        sx={{
          boxSizing: "border-box",
          borderRadius: "10px",
          boxShadow: "0 28px 30px -12px #334a6733",
          overflow: "hidden",
          height: "20rem",
          width: "16rem",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0, // Prevent shrinking
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            height: "14rem", // Reduced image height slightly to make space for text
            position: "relative",
            overflow: "hidden",
            flexShrink: 0, // Prevent shrinking due to content
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
          <img src={image_url} alt={name} />
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            height: "6rem", // Now this is fixed so it doesn’t push/shrink the image
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
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
            {truncatedName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {truncatedDesc}
          </Typography>
        </Box>
      </Paper>
    </Link>
  );
}
