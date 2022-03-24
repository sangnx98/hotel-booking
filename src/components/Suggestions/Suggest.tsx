import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './Suggest.css'

export default function Suggest() {
  return (
    <>
        <CssBaseline />
        <Container maxWidth="xl">
            <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '600', margin: '2rem 0 1rem 0' }}>
                Gợi ý từ Luxstay
            </Typography>
            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', marginBottom: '2rem' }}>
                Những địa điểm thường đến mà Luxstay gợi ý dành cho bạn
            </Typography>
            <Box sx={{height: 'auto', marginTop: '1rem', minHeight: '30vh'}}>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    className="mySwiper"
                    breakpoints={{
                        300:{
                            slidesPerView: 1,
                          },
                        500:{
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
                    <SwiperSlide className='swiper-slide'>
                        <Card sx={{ maxWidth: 345, borderRadius: '10px', boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_1_1625465608.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    VI VU NGOẠI THÀNH
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Trải nghiệm không gian thoáng cho chuyến đi ngay gần Hà Nội
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_2_1614588617.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    VŨNG TÀU BIỆT THỰ HỒ BƠI
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Những căn biệt thự có hồ bơi dành cho kỳ nghỉ của bạn tại Vũng Tàu
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_1_1614660728.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Hà Nội nội thành lãng mạn
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Không gian lãng mạn dành cho cặp đôi tại trung tâm Hà Nội
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_2_1615794965.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Sài Gòn cần là có ngay
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Những căn homestay có 01 phòng ngủ tại Sài Gòn có thể đặt nhanh chóng
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_1_1584606781.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Bể bơi và BBQ
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Trải nghiệm đẳng cấp tại những căn homestay có bể bơi đẹp và khu vực BBQ ấm cúng.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="140"
                                image="https://cdn.luxstay.com/home/apartment/apartment_10_1584602562.jpg"
                                alt="green iguana"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Siêu giảm giá!
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Top chỗ ở giảm giá đến 50% từ các chủ nhà thân thiện trên Luxstay.
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </Container>
    </>
    
  );
}
