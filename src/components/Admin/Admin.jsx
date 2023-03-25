import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    fetchUserRecord();
  },[])


  const logOutHandler = () => {
    console.log(localStorage.getItem("Token"));
    axios.post(`http://localhost:8082/AdminPage/LogoutAdmin?token=${localStorage.getItem("Token")}`)
    .then((res) => {
        toast.success(res.data.message);
        localStorage.clear()
        setTimeout(() => { navigate("/AdminLogin"); }, 2000);
    })
    .catch((error) => {
        toast.error(error.response.data);
        console.log(error);
      });
  }

  const fetchUserRecord = () => {
    axios.get(`http://localhost:8082/AdminPage/ALl_Users?token=${localStorage.getItem("Token")}`)
    .then((res) => {
        console.log(res.data.obj)
        setUserData(res.data.obj)
    })
    .catch((err) => {
        console.log(err)
    })
}

  return (
    <div>
      <div>
      <table>
      <tr>
          <th>USER ID</th>
          <th>UserName</th>
          <th>Email ID</th>
          <th>PhoneNo</th>
          <th>Attendance Record</th>
        </tr>
        {userData.length>0 ? userData.map((userAllData) => {
          return (
            <tr key={userAllData.id}>
              <td>{userAllData.id}</td>
              <td>{userAllData.userName}</td>
              <td>{userAllData.emailID}</td>
              <td>{userAllData.phoneNo}</td>
              <td>
                <button onClick = {() => { navigate("/Record")}}></button>
              </td>
            </tr>
          )
        }): "No record Found"
        }
      </table>
    </div>
    <button onClick = {logOutHandler} className="Button">Logout</button>
    </div>
  )
}

export default Admin