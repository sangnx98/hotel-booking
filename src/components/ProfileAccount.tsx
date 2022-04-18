import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import _ from "lodash";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Booking } from "../types";
import { CONFIG } from "../config/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar, signUpSuccess } from "../store/userSlice";
import { useForm } from "react-hook-form";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  avatar: string

};

export default function ProfileAccount() {
  const userAuth = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    avatar: ""
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone is required"),
    avatar: Yup.string().required("Avatar is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (!_.isEmpty(userAuth) && open) {
      reset({
        id: userAuth.id,
        name: userAuth.name,
        password: userAuth.password,
        email: userAuth.email,
        address: userAuth.address,
        phoneNumber: userAuth.phoneNumber,
        avatar: userAuth.avatar,
      });
    }
  }, [userAuth, open]);

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?userId=${userAuth.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };

  const onSubmit = async (data: any) => {
    console.log("data", data);
    const res = await axios.put(`${CONFIG.ApiUser}/${userAuth.id}`, data);
    setUserData(res.data);
    setOpen(false);
    dispatch(signUpSuccess(data));
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Cập nhật thành công !!",
      })
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setUserData({
      id: 0,
      email: "",
      name: "",
      password: "",
      address: "",
      phoneNumber: "",
      avatar: ""
    });
    setOpen(false);
  };
  console.log("errors", errors);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            top: "15rem",
            left: "8.5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "10px",
              display: { md: "flex", xs: "flex" },
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "1rem",
              bgcolor: "aliceblue",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" component="span">
                    Họ và tên
                  </Typography>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    value={userAuth.name}
                    autoFocus
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" component="span">
                    Địa chỉ email
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    value={userAuth.email}
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" component="span">
                    Mật khẩu
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    value={userAuth.password}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" component="span">
                    Địa chỉ
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    value={userAuth.address}
                    name="address"
                    autoComplete="address"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" component="span">
                    Số điện thoại
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    value={userAuth.phoneNumber}
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Box sx={{ width: "100%", textAlign: "center", mt: 2 , display: {md: 'none', sm: 'block', xs: 'block'}}}>
                  <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    sx={{ width: "50%", textAlign: "center" }}
                  >
                    Chỉnh sửa
                  </Button>
                </Box>
              </Grid>
              <Grid container justifyContent="flex-end"></Grid>
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              border: "1px solid white",
              textAlign: "center",
              borderRadius: "10px",
              bgcolor: "aliceblue",
              display: { lg: "flex", xs: "none" },
              flexDirection: "column",
            }}
          >
            <Box sx={{ height: "70%" }}>
              <Box sx={{width: '13rem', height: '13rem', margin: '0 auto', mt: '1rem'}}>
                <img src={userAuth.avatar} alt="" width='100%' height='100%' style={{borderRadius: '50%'}}/>
              </Box>
            </Box>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h5" component="h5">
                {userAuth.name}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
              <Button
                onClick={handleClickOpen}
                variant="contained"
                sx={{ width: "50%", textAlign: "center" }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          component="form"
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  error={!!errors.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
                <Typography variant="subtitle1" component="span"></Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  error={!!errors.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  error={!!errors.password}
                  helperText={errors?.password ? errors.password.message : null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Địa chỉ"
                  autoComplete="address"
                  {...register("address")}
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  error={!!errors.address}
                  helperText={errors?.address ? errors.address.message : null}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Số điện thoại"
                  autoComplete="phoneNumber"
                  {...register("phoneNumber")}
                  className={`form-control ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  error={!!errors.phoneNumber}
                  helperText={
                    errors?.phoneNumber ? errors.phoneNumber.message : null
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  label="URL ảnh đại diện"
                  autoComplete="avatar"
                  {...register("avatar")}
                  className={`form-control ${
                    errors.avatar ? "is-invalid" : ""
                  }`}
                  error={!!errors.avatar}
                  helperText={
                    errors?.avatar ? errors.avatar.message : null
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()}>Hủy bỏ</Button>
          <Button onClick={handleSubmit(onSubmit)} autoFocus>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
