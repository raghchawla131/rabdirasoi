import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  const scrollToTop = () => window.scrollTo(0, 0);
  const accentColor = "#f48fb1"; // soft pink (not deeppink)

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        mt: 8,
        pt: 6,
        pb: 3,
        px: { xs: 2, sm: 6 },
        color: "white",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={4}
        sx={{ borderBottom: "1px solid #333", pb: 4 }}
      >
        {/* Socials */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: accentColor, fontWeight: "bold" }}
          >
            Stay Connected
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                "&:hover": {
                  color: accentColor,
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://wa.me/91xxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "white",
                "&:hover": {
                  color: accentColor,
                },
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Links */}
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: accentColor, fontWeight: "bold" }}
          >
            Quick Links
          </Typography>
          <Stack spacing={1}>
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/shop" },
              { label: "Gallery", to: "/gallery" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.to}
                component={RouterLink}
                to={link.to}
                onClick={scrollToTop}
                underline="hover"
                sx={{
                  color: "white",
                  fontSize: "0.95rem",
                  "&:hover": {
                    color: accentColor,
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* Footer bottom */}
      <Box textAlign="center" mt={3}>
        <Typography variant="body2" sx={{ color: "white" }}>
          © 2025 <span style={{ color: accentColor }}>Rab Di Rasoi</span>. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
