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
              <td>{record.user.id}</td>
              <td>{record.date[2]}-{record.date[1]}-{record.date[0]}</td>
              <td>{record.signINTime[0]}:{record.signINTime[1]}:{record.signINTime[2]}</td>
              <td>{record.signOut[0]}:{record.signOut[1]}:{record.signOut[2]}</td>
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