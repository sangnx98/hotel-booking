import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import "./Slider.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slider() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container>
          <Grid xs={12} sm={12} md={12}>
            <Box sx={{ marginTop: "8rem" }}>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    src="https://beta-api.luxstay.net/api/upload/file?storage=admins/12/qF7ukmI--Rwr2H5LwzVZwcXa.jpg"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://beta-api.luxstay.net/api/upload/file?storage=admins/22/y6Sc_lVCy8r5RBV-fj8nFHLP.jpg"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          component="h2"
          sx={{ display: "flex", fontWeight: "600", margin: "2rem 0 1rem 0" }}
        >
          Chào mừng đến với Luxstay
        </Typography>
        <Typography variant="subtitle2" component="h2" sx={{ display: "flex" }}>
          Đặt chỗ ở, homestay, cho thuê xe, trải nghiệm và nhiều hơn nữa trên
          Luxstay
        </Typography>
      </Container>
    </>
  );
}
