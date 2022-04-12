import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import _ from "lodash";

import { Booking } from "../types";
import { CONFIG } from "../config/config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signUpSuccess } from "../store/userSlice";
import { useForm } from "react-hook-form";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
};

export default function ProfileAccount() {
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
    address: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Address must be at least 6 characters"),
    phoneNumber: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Address must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(validationSchema) });

  const user = JSON.parse(localStorage.getItem("user") || "");
  useEffect(() => {
    if (
      !_.isEmpty(user) &&
      _.isEmpty(userData.id) &&
      _.isEmpty(userData.name) &&
      _.isEmpty(userData.email) &&
      _.isEmpty(userData.password) &&
      _.isEmpty(userData.address) &&
      _.isEmpty(userData.phoneNumber)
    ) {
      setUserData({
        ...userData,
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, userData]);

  useEffect(() => {
    getBooking();
  }, [userData]);

  const getBooking = () => {
    fetch(`${CONFIG.ApiBooking}?userId=${user.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: any) => res.json())
      .then(setBookings);
  };
  const handleSetValue = (key: any, value: any) => {
    setUserData({ ...userData, [key]: value });
  };
  const handleNameChange = (event: any) => {
    handleSetValue("name", event.target.value);
  };

  const handleEmailChange = (event: any) => {
    handleSetValue("email", event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    handleSetValue("password", event.target.value);
  };
  const handleAddressChange = (event: any) => {
    handleSetValue("address", event.target.value);
  };
  const handlePhoneChange = (event: any) => {
    handleSetValue("phoneNumber", event.target.value);
  };

  const handleSubmitUser = async (id: number) => {
    const res = await axios.put(`${CONFIG.ApiUser}/${id}`, userData);
    setUserData(res.data);
    setOpen(false);
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(signUpSuccess(userData));
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
    });
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            height: "25rem",
            bgcolor: "#b0e8cb",
          }}
        >
          <img
            src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/background-banner-dep-doc-dao.jpg"
            alt=""
            width="100%"
          />
        </Box>
        <Box
          sx={{
            width: "80%",
            height: "auto",

            position: "absolute",
            top: "20rem",
            left: "8.5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
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
                    value={user.name}
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
                    value={user.email}
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
                    value={user.password}
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
                    value={user.address}
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
                    value={user.phoneNumber}
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ height: "70%" }}>
              <AccountCircleIcon
                sx={{
                  fontSize: "15rem",
                  right: "1.6rem",
                }}
              />
            </Box>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h5" component="h5">
                {user.name}
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
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleSubmitUser)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={userData?.name}
                  onChange={handleNameChange}
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userData?.email}
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email must be filled",
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors?.email ? errors.email.message : null}
                  onChange={handleEmailChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={userData?.password}
                  onChange={handlePasswordChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  value={userData?.address}
                  onChange={handleAddressChange}
                  id="address"
                  label="Địa chỉ"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  value={userData?.phoneNumber}
                  onChange={handlePhoneChange}
                  id="phoneNumber"
                  label="Số điện thoại"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
          <Button
            type="submit"
            onClick={() => handleSubmitUser(user.id)}
            autoFocus
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
