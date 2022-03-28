import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Pagination, FreeMode, Navigation } from "swiper";
import Header from "../components/Header/Header";

type Booking = {
    user_id: string,
    host_id: string,
    room_id: string,
    startDate: string,
    endDate: string,
    status: boolean,
    total_guests: string,
    children: string,
    adult: string
}

const getUserData = () =>{
    const storedValues = localStorage.getItem('user');
    if(!storedValues) return {
        name: ''
    }
    return JSON.parse(storedValues)
}

export default function RoomDetail() {
    const [user, setUser] = React.useState(getUserData)
    const [booking, setBooking] = React.useState<Booking>({
        user_id: '',
        host_id: '',
        room_id: '',
        startDate: '',
        endDate: '',
        status: false,
        total_guests: '',
        children: '',
        adult: ''
    })
    const [open, setOpen] = React.useState(false);
    const [children, setChildren] = React.useState<number>(0);
    const [adult, setAdult] = React.useState<number>(0);
    const [roomDetail, setRoomDetail] = React.useState<any>({})
    const total_guests = children + adult;
    let params = useParams();


    const handleBooking = () =>{
        const newBooking = {
            dateStart : value[0],
            endDate : value[1],
            hostId: roomDetail.hostId,
            status: true,
            total_guests: total_guests,
            children: children,
            adult: adult,
            userId: user.id
        }
        fetch('http://localhost:4000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(newBooking),
            })
            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
                const requestOptions = {
                    method: 'PUT',
                    body: JSON.stringify({ status: true })
                };
                fetch(`http://localhost:4000/rooms/${params.id}`, requestOptions)
                    .then(response => response.json())
                    .then(data => setRoomDetail(data.id));
            alert('Đặt chỗ thành công')
            })
            //Then with the error genereted...
            .catch((error) => {
            console.error('Error:', newBooking);
            });

    }

    const handleAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdult(Number(event.target.value));
    };

    const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChildren(Number(event.target.value));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
    ) => {
    if (reason !== "backdropClick") {
        setOpen(false);
    }
    };
    const [value, setValue] = useState<DateRange<Date>>([null, null]);
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" >
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/rooms"
        >
          Rooms
        </Link>,
        <Typography key="3" color="text.primary">
          Room Detail
        </Typography>,
      ];
      React.useEffect(() => {
        fetch(`http://localhost:4000/rooms/${params.id}`)
        .then(res => res.json())
        .then(setRoomDetail)
      },[])

      
  return (
    <>
        <Header/>
        <Box sx={{marginTop: '4rem', backgroundColor:'black'}}>
        <Swiper
            slidesPerView={3}
            spaceBetween={5}
            freeMode={true}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/X2Ht56Nlx5GBsHV4oUmeE1w-.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/gZYx2s7zKDzsfvTSPeAuSy5H.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/W0VeOXy7lNzUTRkl4Zb0CbAr.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/8ERe5M4_IC3hVE9G1vJ0CttR.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/KSia-v90R1NxrICETct8VbcV.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/YF1ngXmAcWh14z4N0J6glyfM.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://cdn.luxstay.com/users/329302/GDMKfBwuqAZYgh5WXG-JSc_z.jpg" alt="" />
            </SwiperSlide>
        </Swiper>
        </Box>
        <Container maxWidth="lg">
            <Box sx={{mt: '2rem'}}>
                <Stack spacing={2} sx={{mb: '2rem'}}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>
                <Grid container>
                    <Grid item xs={12} sm={6} md={8}>
                        <Box sx={{mb:'2rem'}}>
                            <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '600', marginBottom: '2rem' }}>
                                {roomDetail.room_name} - {roomDetail.intro}
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', fontWeight: '600', marginBottom: '1rem' }}>
                                Địa chỉ: {roomDetail.address}
                            </Typography>
                            <Typography variant="subtitle2" component="h5" sx={{display: 'flex', fontWeight: '600', marginBottom: '1rem' }}>
                                Căn hộ dịch vụ: {roomDetail.square}
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', marginBottom: '1rem' }}>
                                Phòng riêng · {roomDetail.bath_rooms} phòng · {roomDetail.beds} giường · {roomDetail.bed_rooms} phòng ngủ · 2 khách (tối đa {roomDetail.guestNums} khách)
                            </Typography>
                        </Box>
                        <Box sx={{mb: '3rem'}}>
                            <Typography variant="subtitle1" component="h2" sx={{display: 'flex', fontWeight: '600' }}>
                                Tóm tắt về The Galaxy Home Apartment
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex'}}>
                                Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách (tối đa 3 khách)
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex'}}>
                                Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách (tối đa 3 khách)
                            </Typography>
                        </Box>
                        
                        <Box sx={{mb: '3rem'}}>
                            <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '600' }}>
                                Tiện nghi
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', mb:'1.5rem'}}>
                                Giới thiệu về tiện nghi
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex'}}>
                                Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách (tối đa 3 khách)
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={4} md={4}>
                        <Box sx={{width: '100%', height: '40%', border:'2px solid #dbd3bd', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '700', marginBottom: '2rem' }}>
                                {roomDetail.price}đ/đêm
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{mb: '2rem'}}>
                                <DateRangePicker
                                    startText="Check-in"
                                    endText="Check-out"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => {
                                     return (
                                        <React.Fragment>
                                        <TextField {...startProps}/>
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps}/>
                                    </React.Fragment>
                                     )
                                    }}
                                    
                                />
                            </LocalizationProvider>
                            <Button onClick={handleClickOpen} sx={{m: '1rem'}}>Số lượng người tham gia</Button>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Vui lòng nhập số lượng</DialogTitle>
                                <DialogContent>
                                <Box
                                    component="form"
                                    sx={{
                                    "& .MuiTextField-root": { m: 1, width: "25ch" }
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                    id="outlined-disabled"
                                    label="Người lớn"
                                    type="number"
                                    onChange={handleAdultChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        inputProps: { min: 0, max: 100 }
                                    }}
                                    />
                                    <TextField
                                    id="outlined-number"
                                    label="Trẻ em"
                                    type="number"
                                    onChange={handleChildrenChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                    />
                                </Box>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                            <Button variant="outlined" onClick={handleBooking}>Đặt ngay</Button>
                        </Box>
                        <Box sx={{width: '100%', height: '35%', border:'2px solid #dbd3bd', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', mt:'2rem'}}>
                            <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '700', marginBottom: '1rem' }}>
                                Tư vấn từ Luxstay
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', marginBottom: '1rem' }}>
                                Cùng Luxstay bắt đầu chuyến hành trình chinh phục thế giới của bạn
                            </Typography>
                            <TextField id="outlined-basic" label="Tên khách hàng" variant="outlined" />
                            <Button variant="contained" sx={{mt: '1rem'}}>Nhận tư vấn miễn phí</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
  );
}
