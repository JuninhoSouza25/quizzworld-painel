'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid} from 'react-icons/lia'

const UserAdmin = () =>{
  const [ allUsers, setAllUsers ] = useState([])


  useEffect(() => {
    axios.get(`http://localhost:3001/api/users`)
    .then(response => {
      setAllUsers(response.data)

    })
    .catch(error => {
      console.log(error)
    })

  },[])

  

  return(
    <div className="user-admin col bg-white shadow">

      <ul>
        <li className="mb-3 row pt-4 pb-2">
          <div className="col-3 fw-bold">Nome</div>
          <div className="col-2 fw-bold">Username</div>
          <div className="col-3 fw-bold">Email</div>
          <div className="col-2 fw-bold">Função</div>
          <div className="col-2 fw-bold">Ações</div>
        </li>
      {allUsers.map((item) => (
        <li className="mb-3 row pb-1" key={item._id}>
          <div className="col-3 fw-light">{item.name}</div>
          <div className="col-2 fw-light">{item.username}</div>
          <div className="col-3 fw-light">{item.email}</div>
          <div className="col-2 fw-light">{item.role}</div>
          <div className="col-2 fw-light"><LiaUserEditSolid className="fs-2"/></div>
        </li>
      ))}
      </ul>
      
    </div>
  )
}

export default UserAdmin