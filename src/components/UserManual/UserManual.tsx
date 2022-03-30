import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Swiper, SwiperSlide } from "swiper/react";

import "./UserManual.css";

export default function UserManual() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          component="h2"
          sx={{ display: "flex", fontWeight: "600", margin: "2rem 0 1rem 0" }}
        >
          Hướng dẫn sử dụng
        </Typography>
        <Typography
          variant="subtitle2"
          component="h2"
          sx={{ display: "flex", marginBottom: "2rem" }}
        >
          Những địa điểm thường đến mà Luxstay gợi ý dành cho bạn
        </Typography>
        <Box sx={{ height: "auto", marginTop: "1rem" }}>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            className="mySwiper"
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide className="swiper-slide">
              <Card
                sx={{ maxWidth: 345, borderRadius: "10px", boxShadow: "none" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.luxstay.com/home/theme/theme_4_1583838088.jpg"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.luxstay.com/home/theme/theme_3_1583838065.jpg"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.luxstay.com/home/theme/theme_10_1583894021.jpg"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.luxstay.com/home/theme/theme_2_1583837926.jpg"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card sx={{ maxWidth: 345, boxShadow: "none" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.luxstay.com/home/theme/theme_1_1584074526.jpg"
                    alt="green iguana"
                  />
                </CardActionArea>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Container>
    </>
  );
}
