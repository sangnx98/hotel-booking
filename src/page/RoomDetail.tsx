import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, FreeMode, Navigation } from "swiper";
import { Snackbar } from "@mui/material";
import NumberFormat from "react-number-format";

import { setSnackbar } from "../store/userSlice";
import { CONFIG } from "../config/config";
import { addNewBooking } from "../services/homestayService";
import { BookingStatus, RoomsStatus } from "../enum/index";
import UserMap from "../components/MapForUser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RoomDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector((state: any) => state.user);
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState<number>(0);
  const [adult, setAdult] = useState<number>(0);
  const [roomDetail, setRoomDetail] = useState<any>({});
  let params = useParams();
  const [openSnack, setOpenSnack] = useState(false);
  const minValue: Date = new Date(new Date());
  const maxValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    90
  );

  const total_guests = children + adult;
  const handleBooking = () => {
    const dayCheckIn = moment(value[0]);
    const dayCheckOut = moment(value[1]);
    const guestLimit = roomDetail.guestNums;
    const duration = dayCheckOut.diff(dayCheckIn, "days");
    const total_price = roomDetail.price * duration;
    const newBooking = {
      dateStart: moment(value[0]).format("DD/MM/YYYY"),
      endDate: moment(value[1]).format("DD/MM/YYYY"),
      hostId: roomDetail.hostId,
      total_guests: total_guests,
      children: children,
      adult: adult,
      userId: userAuth.id,
      roomId: params.id,
      roomImg: roomDetail.bgUrl,
      roomName: roomDetail.homeStayName,
      status: BookingStatus.Processing,
      roomProvince: roomDetail.province,
      roomDistrict: roomDetail.district,
      roomStreet: roomDetail.street,
      roomApartNums: roomDetail.apartNumber,
      totalPrice: total_price,
      userName: userAuth.name,
      duration: duration,
    };
    if (userAuth.name === "") {
      setTimeout(() => {
        navigate("/login");
      }, 500);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Vui l??ng ????ng nh???p tr?????c khi ?????t ph??ng !!",
        })
      );
      
    } else if (
      !newBooking.dateStart ||
      !newBooking.endDate ||
      newBooking.total_guests === 0
    ) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Vui l??ng nh???p ?????y ????? th??ng tin !!",
        })
      );
    } else if (guestLimit < total_guests) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `S??? l?????ng kh??ch t???i ??a l?? ${guestLimit}. Bao g???m c??? tr??? em v?? ng???i l???n`,
        })
      );
    } else {
      addNewBooking(newBooking)
        .then((response) => response.json())
        .then(() =>
          dispatch(
            setSnackbar({
              snackbarOpen: true,
              snackbarType: "success",
              snackbarMessage: "?????t ch??? th??nh c??ng, vui l??ng ?????i x??c nh???n !!",
            })
          )
        )
        .then((data) => {
          fetch(CONFIG.ApiRoom + params.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...roomDetail,
              status: RoomsStatus.Processing,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setRoomDetail({ ...result, status: RoomsStatus.Processing });
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .then(() => navigate("/profile"));
    }
  };
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

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const [value, setValue] = useState<DateRange<Date>>([null, null]);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/home/rooms">
      Rooms
    </Link>,
    <Typography key="3" color="text.primary">
      Room Detail
    </Typography>,
  ];
  useEffect(() => {
    fetch(CONFIG.ApiRoom + params.id, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setRoomDetail);
  }, [params]);

  return (
    <>
      <Box sx={{ mt:'0.5rem'}}>
        <Swiper
          slidesPerView={3}
          spaceBetween={2}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
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
              spaceBetween: 4,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 4,
            },
          }}
        >
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/X2Ht56Nlx5GBsHV4oUmeE1w-.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/gZYx2s7zKDzsfvTSPeAuSy5H.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/W0VeOXy7lNzUTRkl4Zb0CbAr.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/8ERe5M4_IC3hVE9G1vJ0CttR.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/KSia-v90R1NxrICETct8VbcV.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/YF1ngXmAcWh14z4N0J6glyfM.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.luxstay.com/users/329302/GDMKfBwuqAZYgh5WXG-JSc_z.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mt: "2rem" }}>
          <Stack spacing={2} sx={{ mb: "2rem" }}>
            <Breadcrumbs separator="???" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <Grid container>
            <Grid item xs={12} sm={12} md={7}>
              <Box sx={{ mb: "2rem" }}>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    fontWeight: "600",
                    marginBottom: "2rem",
                  }}
                >
                  {roomDetail.homeStayName} - {roomDetail.intro}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{
                    display: "flex",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  ?????a ch???: {roomDetail.apartNumber} ???????ng {roomDetail.street},{" "}
                  {roomDetail.province}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h5"
                  sx={{
                    display: "flex",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  C??n h??? d???ch v???: {roomDetail.square} m2
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{ display: "flex", marginBottom: "1rem" }}
                >
                  Ph??ng ri??ng ?? {roomDetail.bathRooms} ph??ng ??{" "}
                  {roomDetail.bedNums} gi?????ng ?? {roomDetail.bedRooms} ph??ng ng???
                  ?? 2 kh??ch (t???i ??a {roomDetail.guestNums} kh??ch)
                </Typography>
              </Box>
              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", fontWeight: "600", mb: "1rem" }}
                >
                  T??m t???t v??? The Galaxy Home Apartment
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  V??? tr?? r???t ?????p v?? thu???n ti???n ??? qu???n C???u Gi???y
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  G???n c??ng vi??n C???u Gi???y, Lotteria, trung t??m mua s???m v???i m??i
                  tr?????ng ngo??i tr???i y??n t??nh
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ display: "flex" }}
                >
                  B???n ho??n to??n c?? th??? tr???i nghi???m nh???ng d???ch v??? cao c???p t???i ????y
                </Typography>
              </Box>

              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", fontWeight: "600", mb: "0.5rem" }}
                >
                  Ti???n nghi ch??? ???
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", mb: "1.5rem" }}
                >
                  Gi???i thi???u v??? ti???n nghi
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Ti???n nghi
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Wifi
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    TV
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    ??i???u h??a
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    M??y gi???t
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    D???u g???i/x???
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    {" "}
                    Gi???y v??? sinh
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Kh??n t???m
                  </Grid>
                </Grid>

                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Ti???n nghi b???p
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    B???p ??i???n
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    T??? l???nh
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    L?? n?????ng
                  </Grid>
                  <Grid item xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    B??t ????a
                  </Grid>
                </Grid>

                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Ti???n nghi ph??ng
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={6} md={4} sx={{ mb: "1rem" }}>
                    Ban c??ng
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="h5"
                  
                  sx={{ display: "flex", fontWeight: "600", mb: "0.5rem" }}
                >
                  N???i quy ch??? ???
                </Typography>
                <Typography
                  variant="subtitle1"
                  
                  sx={{ display: "flex", mb: "1.5rem", fontWeight: "600" }}
                >
                  Ch??nh s??ch h???y ph??ng
                </Typography>
                <Typography
                  variant="subtitle1"
                  
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Linh ho???t: Mi???n ph?? h???y ph??ng trong v??ng 48h sau khi ?????t ph??ng
                  th??nh c??ng v?? tr?????c 1 ng??y so v???i th???i gian check-in. Sau ????,
                  h???y ph??ng tr?????c 1 ng??y so v???i th???i gian check-in, ???????c ho??n
                  l???i 100% t???ng s??? ti???n ???? tr??? (tr??? ph?? d???ch v???)
                </Typography>

                <Typography
                  variant="subtitle1"
                  
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  L??u ?? ?????c bi???t
                </Typography>

                <Typography
                  variant="subtitle2"
                  
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  V??? tr?? r???t ?????p v?? thu???n ti???n ??? qu???n C???u Gi???y
                </Typography>
                <Typography
                  variant="subtitle2"
                  
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  G???n c??ng vi??n C???u Gi???y, Lotteria, trung t??m mua s???m v???i m??i
                  tr?????ng ngo??i tr???i y??n t??nh
                </Typography>
                <Typography
                  variant="subtitle2"
                  
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  B???n ho??n to??n c?? th??? tr???i nghi???m nh???ng d???ch v??? cao c???p t???i ????y
                </Typography>
                <Typography
                  variant="subtitle1"
                  
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Th???i gian nh???n ph??ng
                </Typography>
                <Grid container>
                  <Grid item xs={6} sm={6} md={4} sx={{ mb: "1rem" }}>
                    Ban c??ng
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={5}>
              <Box
                sx={{
                  height: "17rem",
                  border: "0.5px solid #eeeee4",
                  borderRadius: "10px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  
                  sx={{
                    display: "flex",
                    fontWeight: "700",
                    marginBottom: "2rem",
                  }}
                >
                  <NumberFormat
                    value={roomDetail.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"???"}
                  />
                  / ????m
                </Typography>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  sx={{ mb: "2rem" }}
                >
                  <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    // format = "dd/MM/yyyy"
                    maxDate={maxValue}
                    minDate={minValue}
                    value={value}
                    onChange={(newValue: any) => setValue(newValue)}
                    renderInput={(startProps: any, endProps: any) => {
                      return (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </React.Fragment>
                      );
                    }}
                  />
                </LocalizationProvider>
                <Button onClick={handleClickOpen} sx={{ m: "1rem" }}>
                  S??? l?????ng ng?????i tham gia: {total_guests}
                </Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                  <DialogTitle>Vui l??ng nh???p s??? l?????ng</DialogTitle>
                  <DialogContent>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-disabled"
                        label="Ng?????i l???n"
                        type="number"
                        value={adult}
                        onChange={handleAdultChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: { min: 0, max: 100 },
                        }}
                      />
                      <TextField
                        id="outlined-number"
                        label="Tr??? em"
                        type="number"
                        value={children}
                        onChange={handleChildrenChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: { min: 0 },
                        }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>H???y b???</Button>
                    <Button onClick={handleClose}>L??u</Button>
                  </DialogActions>
                </Dialog>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    color: "#06c7bd",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{
                      display: "flex",
                      marginBottom: "1rem",
                    }}
                  >
                    Ng?????i l???n: {adult}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{
                      display: "flex",
                      marginBottom: "1rem",
                    }}
                  >
                    Tr??? em: {children}
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={handleBooking} sx={{padding:'0.5rem',bgcolor: '#e28743', width: '50%', margin: '0 auto', color: 'black'}}>
                  ?????t ngay
                </Button>
              </Box>
              <Box
                sx={{
                  height: "15rem",
                  border: "0.5px solid #eeeee4",
                  borderRadius: "10px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  mt: "2rem",
                }}
              >
                <Typography
                  variant="h5"
                  
                  sx={{
                    display: "flex",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  T?? v???n t??? Luxstay
                </Typography>
                <Typography
                  variant="subtitle2"
                  
                  sx={{ display: "flex", marginBottom: "1rem" }}
                >
                  C??ng Luxstay b???t ?????u chuy???n h??nh tr??nh chinh ph???c th??? gi???i c???a
                  b???n
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="T??n kh??ch h??ng"
                  variant="outlined"
                />
                <Button variant="contained" sx={{ mt: "1rem" }}>
                  Nh???n t?? v???n mi???n ph??
                </Button>
              </Box>
              <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
              >
                <Alert
                  onClose={handleCloseSnack}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Vui l??ng nh???p ?????y ????? th??ng tin
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Box>
        <UserMap lat={roomDetail.lat} lng={roomDetail.lng}/>
      </Container>
    </>
  );
}
