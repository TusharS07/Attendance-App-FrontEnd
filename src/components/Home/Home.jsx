import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import './Home.css';

const Home = () => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString("en-US");

    const[isSignIn, setIsSignIN] = useState();





    useEffect (() => {
        fetchUserAttendanceRecord();
    }, [])

    const fetchUserAttendanceRecord = () => {
        axios.get(`http://localhost:8082/UserPage/Attendence_Report?token=${localStorage.getItem("Token")}`)
        .then((res) => {
            console.log(res)
            setIsSignIN(res.data.obj)
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
        })
        .catch((err) => {
            console.log(err);
          })
    }

console.log(time);

  return (
    <div>
        <div className='center'>
        <h1>{date}</h1>
        <h1>{time}</h1>
        
        

        {isSignIn === null && 
        <button onClick = {signInHandler} className="signInbutton">SignIn</button>}

        {isSignIn != null && 
        <button onClick = {signOutHandler} className="signOutbutton">SignOUT</button>}
        </div>
        <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Home
