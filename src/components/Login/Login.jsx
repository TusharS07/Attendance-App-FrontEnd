import { Avatar, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { Copyright } from '@mui/icons-material';

const Login = () => {
    
    let navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    let user = {
        userName: userName,
        password: password
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        if (user.userName === "" || user.password === "") {
            alert("Please provide login details.")
        }
        else {
            axios.post("http://localhost:8082/UserPage/Login", user)
               .then((responce) => {
                 toast.success(responce.data.message);
                 console.log(responce);
                 localStorage.setItem("Token", responce.data.obj);
                 console.log(localStorage.getItem("Token"));
                 setTimeout(() => { navigate("/Home"); }, 2000);
               })
               .catch((error) => { toast.error(error.response.data); })
        }
    }
  return (
    <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Login 
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                onChange={(event) => {setUserName(event.target.value)}}
                margin="normal"
                required
                fullWidth
                id="userName"
                label="UserName"
                name="UserName"
                autoComplete="off"
                autoFocus
            />
            <TextField
                onChange={(event) => {setPassword(event.target.value)}}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
            />
  
            <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            
            <Grid container>
                <Grid item xs>
                    <Link onClick={() => { navigate("/ForgotPassword") }} variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link onClick={() => { navigate("/") }} variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>    
        </Box>
        <ToastContainer autoClose={2000} />
    </Box>
  )
}

export default Login