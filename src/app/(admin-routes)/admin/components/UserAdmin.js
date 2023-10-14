'use client'

import PopUp from "@/app/components/PopUp"
import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid} from 'react-icons/lia'
import {RiDeleteBin2Line} from 'react-icons/ri'

const UserAdmin = () =>{
  const [ allUsers, setAllUsers ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [user, setUser] = useState()

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/users`,)
    .then(response => {
      setAllUsers(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[])


  // Delete User
  function eraseUser(id){
    axios.delete(`${URL}/user/${id}`)
    setAllUsers(allUsers.filter(user => user._id !== id))
    setPopUp(false)
  }

  function handlePopUp(userPopup){
    !popup ? setPopUp(true) : setPopUp(false)
    setUser(userPopup)
    console.log(user)

  }

  

  return(
    <div className="user-admin col bg-white shadow">

    {popup && <PopUp user={user.username} function1={() => eraseUser(user._id)} function2={handlePopUp}/>}

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
          <div className="col-2 fw-light row">
            <LiaUserEditSolid className="col-2 fs-2 cursor-pointer"/>
            <RiDeleteBin2Line className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
          </div>

        </li>
      ))}
      </ul>      
    </div>
  )
}

export default UserAdmin