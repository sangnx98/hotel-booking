import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Contact() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{ mt: "2rem", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "block" },
              color: "black",
              fontWeight: "500",
              fontSize: "2rem",
            }}
          >
            LUXSTAY
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            
            sx={{ display: "flex", marginBottom: "1rem" }}
          >
            TOP HOMESTAY ĐƯỢC HIÊU THÍCH
          </Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Homestay Đà Lạt</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Homestay Hà Nội</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Homestay HCM</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Homestay Sapa</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Homestay Vũng Tàu</Typography>

        </Box>
        <Box>
          <Typography
            variant="h6"
            
            sx={{ display: "flex", marginBottom: "1rem" }}
          >
            KHÔNG GIAN ƯA THÍCH
          </Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Căn hộ dịch vụ</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Dịch vụ</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Nhà riêng</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Studio</Typography>
          <Typography variant="subtitle2">Travel Guide</Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            
            sx={{ display: "flex", marginBottom: "1rem" }}
          >
            VỀ CHÚNG TÔI
          </Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Blog</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>Điều khoản hoạt động</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>1800 6586</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>+84 8898 66666</Typography>
          <Typography variant="subtitle2" sx={{marginBottom: "0.5rem" }}>
            Trang thông tin dành cho chủ nhà
          </Typography>
        </Box>
        <Box sx={{ display: "flex", width: "20rem" }}>
          <Box sx={{ width: "30%", height: "auto" }}>
            <Box sx={{ width: "100%", height: "auto" }} component="div">
              <img
                src="https://www.luxstay.com/qr-code.png"
                alt=""
                width="100%"
              />
            </Box>
          </Box>
          <Box sx={{ width: "20rem", display: "flex" }}>
            <Box
              sx={{
                width: "90%",
                height: "12rem",
                display: "flex",
                alignItems: "center",
                margin: "0 1rem 0 1rem",
                flexDirection: "column",
              }}
            >
              <Box sx={{ height: "2rem", mb: '0.5rem' }} component="div">
                <img
                  src="https://www.luxstay.com/icons/apple-store.svg"
                  alt=""
                  height="100%"
                />
              </Box>
              <Box sx={{ height: "2rem", mb: '0.5rem' }} component="div">
                <img
                  src="https://www.luxstay.com/icons/apple-store.svg"
                  alt=""
                  height="100%"
                />
              </Box>
              <Box sx={{ height: "2rem" }} component="div">
                <img
                  src="https://www.luxstay.com/icons/apple-store.svg"
                  alt=""
                  height="100%"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
