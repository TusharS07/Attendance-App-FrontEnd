import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import './Home.css';

const Home = () => {
    let navigate = useNavigate();
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString("en-US");

    const[signIn, setSignIn] = useState(false);





    useEffect (() => {
        fetchUserAttendanceRecord();
    }, [])

    const fetchUserAttendanceRecord = () => {
        axios.get(`http://localhost:8082/UserPage/Attendence_Report?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
          })
    }

    const signInHandler = () => {
        axios.post(`http://localhost:8082/UserPage/SignIn_Attendence?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res);
            toast.success(res.data.message);
            fetchUserAttendanceRecord();
            setSignIn(true);
        })
        .catch((err) => {
            console.log(err);
          })

    }

    const signOutHandler = () => {
        axios.post(`http://localhost:8082/UserPage/SignOUT_Attendence?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res);
            toast.success(res.data.message);
            fetchUserAttendanceRecord();
            setSignIn(false);
        })
        .catch((err) => {
            console.log(err);
          })
    }


    const logOutHandler = () => {
        console.log(localStorage.getItem("Token"));
        axios.post(`http://localhost:8082/UserPage/Logout?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            toast.success(res.data.message);
            localStorage.clear()
            setTimeout(() => { navigate("/"); }, 2000);
        })
        .catch((error) => {
            toast.error(error.response.data);
            console.log(error);
          });
    }


console.log(time);

  return (
    <div>
        <div className='center'>
        <h1>{date}</h1>
        <h1>{time}</h1>
        
        


        {signIn === true && 
        <button onClick = {signOutHandler} className="signOutbutton">SignOUT</button>}

        {signIn === false && 
        <button onClick = {signInHandler} className="signInbutton">SignIn</button>}

        <div>
        <button onClick = {() => { navigate("/Record")}} className="Button" > Record </button>
        </div>
        
        
        <button onClick = {logOutHandler} className="logoutButton">Logout</button>

        </div>
        <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Home
