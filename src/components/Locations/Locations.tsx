import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom'

import "swiper/css";
import "swiper/css/pagination";

import "./Location.css";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Locations() {
  return (
    <>
        <CssBaseline />
        <Container maxWidth="xl">
            <Box sx={{height: 'auto', marginTop: '1rem', padding: '2rem 0 0 0' }}>    
                <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '600', marginBottom: '1rem' }}>
                Địa điểm nổi bật
                </Typography>
                <Typography variant="subtitle2" component="h2" sx={{display: 'flex', marginBottom: '2rem' }}>
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
                    300:{
                      slidesPerView: 1,
                    },
                    500:{
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
                    <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Hà Nội
                      </Typography>
                      <Link to='/rooms'>
                        <img src="http://hanoimoi.com.vn/Uploads/images/tuandiep/2020/08/20/ho-hoan-kiem.jpg" alt="" />
                      </Link>
                    </SwiperSlide>
                  <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Hạ Long
                      </Typography>
                      <Link to='/rooms'>
                        <img src="https://media.vneconomy.vn/w800/images/upload/2021/06/19/halong.jpg" alt="" />
                      </Link>
                  </SwiperSlide>
                  <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Phú Quốc
                      </Typography>
                    <img src="https://file1.dangcongsan.vn/data/0/images/2021/10/22/havtcd/ve-dep.jpg?dpi=150&quality=100&w=780" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                      Hồ Chí Minh
                    </Typography>
                    <img src="https://photo-cms-baodauthau.zadn.vn/w730/Uploaded/2022/qjmfn/2021_04_29/03-3055.jpg" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Đà Nẵng
                      </Typography>
                    <img src="https://img.cand.com.vn/resize/800x800/NewFiles/Images/2021/10/16/7_du-1634353732500.jpg" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Nha Trang
                      </Typography>
                    <img src="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/12/61/e5.jpg" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                      <Typography sx={{position: 'absolute', bottom: '1rem', left: 'center', fontSize: '25px', color: 'white', fontWeight: '700'}}>
                        Quảng Bình
                      </Typography>
                    <img src="https://vtv1.mediacdn.vn/thumb_w/650/2020/6/8/dulich-15916342537561871046635-crop-1591634265163746853772.jpg" alt="" />
                  </SwiperSlide>
                </Swiper>
            </Box>
        </Container>
        
    </>
  )
}
