import React from 'react'
import Header from '../components/Header/Header'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';

import '../App.css'
const theme = createTheme();
type UserSubmitForm = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
type UserEditForm = {
    newUsername: string;
    newEmail: string;
    newPassword: string;
};
const getUserData = () =>{
    const storedValues = localStorage.getItem('user');
    if(!storedValues) return {
        username: ''
    }
    return JSON.parse(storedValues)
}
export default function UserProfile() {
    const [values, setValues] = React.useState<UserSubmitForm>(getUserData)
    const [newValues, setNewValues] = React.useState<UserEditForm>(
        {
            newUsername: '',
            newEmail: '',
            newPassword: ''
        }
    )
    const validationSchema = Yup.object().shape({
        username: Yup.string()
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
        setValues(data);
      };
      React.useEffect(()=>{
        const storedValues = localStorage.getItem('user');
        if(!storedValues) return {
            username: ''
        }
        return JSON.parse(storedValues)
        })
      console.log('abc',values)
  return (
    <>
        <Header/>
        <Container maxWidth='xl'>
            <Box sx={{mt:'4rem', width: '100%', height: '20rem', bgcolor: '#95edad'}}>
                <Typography variant="h5" component="h2" sx={{display: 'flex', fontWeight: '600', position:'absolute', top:'4rem', left: '4rem' }}>
                    Xin chào, Sang Nguyễn
                </Typography>
            </Box>
            <Box sx={{position: 'absolute', top: '8rem', width: '100%', left:'30%'}}>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: 'auto' }}>
                    <CssBaseline />
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
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            value={values.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            autoComplete="email"
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
                            value={values.username}
                            type="text"
                            id="username"
                            autoComplete="username"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            error ={!!errors.username}
                            helperText={errors?.username ? errors.username.message : null}
                        />
                        <Button
                            type="submit"
                            
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cập nhật
                        </Button>
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
                </ThemeProvider>
            </Box>
        </Container>
    </>
  )
}
