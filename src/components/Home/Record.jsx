import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Record.css';

const Record = () => {

  let navigate = useNavigate();
  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    fetchUserRecord();
  },[])

  const fetchUserRecord = () => {
    axios.get(`http://localhost:8082/UserPage/Attendence_Report?token=${localStorage.getItem("Token")}`)
    .then((res) => {
        console.log(res.data.obj)
        setRecordData(res.data.obj)
    })
    .catch((err) => {
        console.log(err)
    })
}


  return (
    <div>
      <table>
      <tr>
          <th>UserId</th>
          <th>Date</th>
          <th>Sign Time</th>
          <th>SignOut Time</th>
          <th>Time Duration</th>
        </tr>
        {recordData.length>0 ? recordData.map((record) => {
          return (
            <tr key={record.id}>
              <td>{record.UserID}</td>
              <td>{record.date}</td>
              <td>{record.signINTime}</td>
              <td>{record.signOut}</td>
              <td>{record.timeDuration} min</td>
            </tr>
          )
        }): "No record Found"
        }
      </table>
    </div>
  )
}

export default Record