import React, { useRef, useState } from "react";
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import { Pagination, FreeMode, Navigation } from "swiper";
import Header from "../components/Header/Header";

export default function RoomDetail() {
    const [open, setOpen] = React.useState(false);
    const [children, setChildren] = React.useState<number | string>("");
    const [aldut, setAdult] = React.useState<number | string>("");

    const handleAdultChange = (event: SelectChangeEvent<typeof aldut>) => {
        setAdult(Number(event.target.value));
    };

    const handleChildrenChange = (event: SelectChangeEvent<typeof children>) => {
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
                                The Galaxy Home - 1 Phòng Ngủ, 60m2, View Thành Phố, Ban Công - Dịch Vọng
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', fontWeight: '600', marginBottom: '1rem' }}>
                                Địa chỉ: Cầu Giấy, Hà Nội
                            </Typography>
                            <Typography variant="subtitle2" component="h5" sx={{display: 'flex', fontWeight: '600', marginBottom: '1rem' }}>
                                Căn hộ dịch vụ: 55m2
                            </Typography>
                            <Typography variant="subtitle2" component="h2" sx={{display: 'flex', marginBottom: '1rem' }}>
                                Phòng riêng · 1 Phòng tắm · 1 giường · 1 phòng ngủ · 2 khách (tối đa 3 khách)
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
                                850.000đ/đêm
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{mb: '2rem'}}>
                                <DateRangePicker
                                    startText="Check-in"
                                    endText="Check-out"
                                    value={value}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                    renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps}/>
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps}/>
                                    </React.Fragment>
                                    )}
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
                                    onChange={()=>handleAdultChange}
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
                                    onChange={()=>handleChildrenChange}
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
                            <Button variant="outlined">Đặt ngay</Button>
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
