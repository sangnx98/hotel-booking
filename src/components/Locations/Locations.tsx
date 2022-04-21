import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { CONFIG } from "../../config/config";

import "swiper/css";
import "swiper/css/pagination";

import "./Location.css";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Locations() {
  const [locations, setLocations] = useState([]);

  const getLocations = () => {
    fetch(`${CONFIG.ApiLocation}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setLocations);
  };

  useEffect(() => {
    getLocations();
  }, []);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ height: "auto", marginTop: "1rem", padding: "2rem 0 0 0" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ display: "flex", fontWeight: "600", marginBottom: "1rem" }}
          >
            Địa điểm nổi bật
          </Typography>
          <Typography
            variant="subtitle2"
            component="h2"
            sx={{ display: "flex", marginBottom: "2rem" }}
          >
            Cùng Luxstay bắt đầu chuyến hành trình chinh phục thế giới của bạn
          </Typography>
          <Swiper
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={5}
            spaceBetween={30}
            className="mySwiper"
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {locations.map((location: any) => (
                <SwiperSlide>
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "center",
                      fontSize: "25px",
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    {location.address}
                  </Typography>
                  <Link to={`/home/rooms/${location.address}`}>
                    <img
                      src={location.bgUrl}
                      alt=""
                    />
                  </Link>
                </SwiperSlide>

            ))}
          </Swiper>
        </Box>
      </Container>
    </>
  );
}
