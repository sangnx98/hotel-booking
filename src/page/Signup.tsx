import * as React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rikkeisoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
type UserSubmitForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [listUser, setListUser] = React.useState<any>([])
  const [values, setValues] = React.useState<UserSubmitForm>(
    {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      role: '1'
    }
  )

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    });
  const {register, handleSubmit, formState:{ errors }} = useForm<UserSubmitForm>({resolver: yupResolver(validationSchema)});
  const onSubmit = (data: UserSubmitForm) => {

    const emailExist = listUser.find((user:any) => user.email === data.email)
    if(emailExist){
      alert('Email is already exist')
    }else{
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((data) => {
      navigate('/login')
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
    });
  }};
  React.useEffect(() => {
    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(setListUser)
  },[])


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                error ={!!errors.email}
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
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                error ={!!errors.password}
                helperText={errors?.password ? errors.password.message : null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('confirmPassword')}
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
                error ={!!errors.confirmPassword}
                helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="User Name"
                type="text"
                id="name"
                autoComplete="name"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                error ={!!errors.name}
                helperText={errors?.name ? errors.name.message : null}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

                <Grid item>
                  <Link href="/login" variant="body2">
                    {"If you have account? Login"}
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