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
      navigate("/login");
    } else if (
      // !newBooking.dateStart ||
      // !newBooking.endDate ||
      newBooking.total_guests == 0
    ) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Vui lòng nhập đầy đủ thông tin !!",
        })
      );
    } else if (guestLimit < total_guests) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Số lượng khách tối đa là ${guestLimit}. Bao gồm cả trẻ em và ngời lớn`,
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
              snackbarMessage: "Đặt chỗ thành công, vui lòng đợi xác nhận !!",
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
  console.log("+++++++++++++", total_guests == 0);
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
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <Grid container>
            <Grid item xs={12} sm={12} md={7}>
              <Box sx={{ mb: "2rem" }}>
                <Typography
                  variant="h5"
                  component="h2"
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
                  Địa chỉ: {roomDetail.apartNumber} đường {roomDetail.street},{" "}
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
                  Căn hộ dịch vụ: {roomDetail.square} m2
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{ display: "flex", marginBottom: "1rem" }}
                >
                  Phòng riêng · {roomDetail.bathRooms} phòng ·{" "}
                  {roomDetail.bedNums} giường · {roomDetail.bedRooms} phòng ngủ
                  · 2 khách (tối đa {roomDetail.guestNums} khách)
                </Typography>
              </Box>
              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", fontWeight: "600", mb: "1rem" }}
                >
                  Tóm tắt về The Galaxy Home Apartment
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Vị trí rất đẹp và thuận tiện ở quận Cầu Giấy
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Gần công viên Cầu Giấy, Lotteria, trung tâm mua sắm với môi
                  trường ngoài trời yên tĩnh
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex" }}
                >
                  Bạn hoàn toàn có thể trải nghiệm những dịch vụ cao cấp tại đây
                </Typography>
              </Box>

              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ display: "flex", fontWeight: "600", mb: "0.5rem" }}
                >
                  Tiện nghi chỗ ở
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "1.5rem" }}
                >
                  Giới thiệu về tiện nghi
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Tiện nghi
                </Typography>
                <Grid container>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Wifi
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    TV
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Điều hòa
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Máy giặt
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Dầu gội/xả
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    {" "}
                    Giấy vệ sinh
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Khăn tắm
                  </Grid>
                </Grid>

                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Tiện nghi bếp
                </Typography>
                <Grid container>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Bếp điện
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Tủ lạnh
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Lò nướng
                  </Grid>
                  <Grid xs={6} sm={4} md={4} sx={{ mb: "1rem" }}>
                    Bát đũa
                  </Grid>
                </Grid>

                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Tiện nghi phòng
                </Typography>
                <Grid container>
                  <Grid xs={6} sm={6} md={4} sx={{ mb: "1rem" }}>
                    Ban công
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: "3rem" }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ display: "flex", fontWeight: "600", mb: "0.5rem" }}
                >
                  Nội quy chỗ ở
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "1.5rem", fontWeight: "600" }}
                >
                  Chính sách hủy phòng
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Linh hoạt: Miễn phí hủy phòng trong vòng 48h sau khi đặt phòng
                  thành công và trước 1 ngày so với thời gian check-in. Sau đó,
                  hủy phòng trước 1 ngày so với thời gian check-in, được hoàn
                  lại 100% tổng số tiền đã trả (trừ phí dịch vụ)
                </Typography>

                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Lưu ý đặc biệt
                </Typography>

                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Vị trí rất đẹp và thuận tiện ở quận Cầu Giấy
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Gần công viên Cầu Giấy, Lotteria, trung tâm mua sắm với môi
                  trường ngoài trời yên tĩnh
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem" }}
                >
                  Bạn hoàn toàn có thể trải nghiệm những dịch vụ cao cấp tại đây
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  sx={{ display: "flex", mb: "0.5rem", fontWeight: "600" }}
                >
                  Thời gian nhận phòng
                </Typography>
                <Grid container>
                  <Grid xs={6} sm={6} md={4} sx={{ mb: "1rem" }}>
                    Ban công
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={5}>
              <Box
                sx={{
                  height: "17rem",
                  border: "2px solid #dbd3bd",
                  borderRadius: "10px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
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
                    suffix={"₫"}
                  />
                  / đêm
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
                  Số lượng người tham gia: {total_guests}
                </Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                  <DialogTitle>Vui lòng nhập số lượng</DialogTitle>
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
                        label="Người lớn"
                        type="number"
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
                        label="Trẻ em"
                        type="number"
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
                    <Button onClick={handleClose}>Hủy bỏ</Button>
                    <Button onClick={handleClose}>Lưu</Button>
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
                    Người lớn: {adult}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{
                      display: "flex",
                      marginBottom: "1rem",
                    }}
                  >
                    Trẻ em: {children}
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={handleBooking}>
                  Đặt ngay
                </Button>
              </Box>
              <Box
                sx={{
                  height: "15rem",
                  border: "2px solid #dbd3bd",
                  borderRadius: "10px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  mt: "2rem",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    display: "flex",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                >
                  Tư vấn từ Luxstay
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h2"
                  sx={{ display: "flex", marginBottom: "1rem" }}
                >
                  Cùng Luxstay bắt đầu chuyến hành trình chinh phục thế giới của
                  bạn
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Tên khách hàng"
                  variant="outlined"
                />
                <Button variant="contained" sx={{ mt: "1rem" }}>
                  Nhận tư vấn miễn phí
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
                  Vui lòng nhập đầy đủ thông tin
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
