import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Application() {
  return (
    <Container maxWidth="xl">
      <Box>
        <Grid container>
          <Grid xs={12} sm={6} md={6}>
            <Box sx={{ mr: "1rem" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "block", sm: "block" },
                  color: "black",
                  fontWeight: "300",
                  fontSize: "4.5rem",
                }}
              >
                LUXSTAY
              </Typography>
              <Typography
                variant="h4"
                component="h6"
                sx={{ display: "flex", marginBottom: "1rem" }}
              >
                TÌM KIẾM CHỖ Ở GIÁ TỐT NHẤT
              </Typography>
              <Typography
                variant="subtitle2"
                component="h6"
                sx={{ display: "flex", marginBottom: "1rem" }}
              >
                Luxstay hiện là nền tảng đặt phòng trực tuyến #1 Việt Nam. Đồng
                hành cùng chúng tôi, bạn có những chuyến đi mang đầy trải
                nghiệm. Với Luxstay, việc đặt chỗ ở, biệt thự nghỉ dưỡng, khách
                sạn, nhà riêng, chung cư... trở nên nhanh chóng, thuận tiện và
                dễ dàng.
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "40%", height: "auto" }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      border: "1px solid #e3e0d8",
                      padding: "1rem",
                    }}
                    component="div"
                  >
                    <img
                      src="https://www.luxstay.com/qr-code.png"
                      alt=""
                      width="100%"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "60%", display: "flex" }}>
                  <Box
                    sx={{
                      width: "90%",
                      height: "12rem",
                      display: "flex",
                      alignItems: "center",
                      margin: "0 1rem 0 1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{ height: "4rem", margin: "0 1rem 0 0" }}
                      component="div"
                    >
                      <img
                        src="https://www.luxstay.com/icons/apple-store.svg"
                        alt=""
                      />
                    </Box>
                    <Box sx={{ height: "4rem" }} component="div">
                      <img
                        src="https://www.luxstay.com/icons/apple-store.svg"
                        alt=""
                      />
                      <br />
                    </Box>
                    <Box sx={{ height: "4rem" }} component="div">
                      <img
                        src="https://www.luxstay.com/icons/apple-store.svg"
                        alt=""
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <Box>
              <img
                src="https://www.luxstay.com/home/home-02.png"
                alt=""
                width="100%"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
