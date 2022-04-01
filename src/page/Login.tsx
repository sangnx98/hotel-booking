import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import SocialLogin from "../components/SocialLogin";
import { signUpSuccess } from "../store/userSlice";
import { useDispatch } from "react-redux";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Rikkeisoft
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
type OneUser = {
  email: string;
  password: string;
  name: string;
};

export default function Login() {
  const dispatch = useDispatch()
  const user = useRef({});
  const navigate = useNavigate();
  const [listUser, setListUser] = useState<any>([]);

  const handleUser = async (email: String, password: String) => {
    const settings = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(
        `http://localhost:4000/users?email=${email}&password=${password}`,
        settings
      );

      const data = await response.json();
      if (data) {
        user.current = data[0];
        return user.current;
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OneUser>({ resolver: yupResolver(validationSchema) });
  const onSubmit = async (data: OneUser) => {
    const loginUser = await handleUser(data.email, data.password);
    console.log('loginUser', loginUser)
    if (loginUser) {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(user.current));
      dispatch(signUpSuccess(user.current))
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LUXSTAY
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                error={!!errors.email}
                helperText={errors?.email ? errors.email.message : null}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                error={!!errors.password}
                helperText={errors?.password ? errors.password.message : null}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button type="submit" fullWidth sx={{ mt: 1, mb: 2 }}>
                <SocialLogin />
              </Button>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Do you have account? Sign up"}
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
