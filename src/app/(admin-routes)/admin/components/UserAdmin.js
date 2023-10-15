'use client'

import PopUp from "@/app/components/PopUp"
import UserDetails from "@/app/components/UserDetails"
import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid, LiaUser} from 'react-icons/lia'
import {RiDeleteBin2Line, RiArrowGoBackFill} from 'react-icons/ri'
import UserHome from "./UserHome"
import CreateUser from "./CreateUser"
import EditUser from "./EditUser"

const UserAdmin = ({sectionDefault}) =>{
  const [ allUsers, setAllUsers ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [user, setUser] = useState()
  const [section, setSection] = useState(sectionDefault)

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/users`,)
    .then(response => {
      setAllUsers(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[allUsers])


  // Delete User
  function eraseUser(id){
    axios.delete(`${URL}/user/${id}`)
    setAllUsers(allUsers.filter(user => user._id !== id))
    setPopUp(false)
  }

  function handlePopUp(data){
    !popup ? setPopUp(true) : setPopUp(false)
    setUser(data)
    console.log(user)

  }

  function handleSection(data, section){
    setSection(section)
    setUser(data)
    setAllUsers(allUsers.filter(user => user._id !== "asdf"))

  }
  

  return(
    <div className="user-admin col bg-white shadow">

      {popup && <PopUp user={user.username} function1={() => eraseUser(user._id)} function2={handlePopUp}/>}

      {section === 'home' && (
        <UserHome 
        action1={() => handleSection(null, 'users')}
        action2={() => handleSection(null, 'create-user')}/>
      )}

      {section === 'users' && (
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
                <LiaUser className="col-2 fs-2 text-success cursor-pointer" onClick={() => handleSection(item, 'details')}/>
                <LiaUserEditSolid className="col-2 fs-2 cursor-pointer" onClick={() => handleSection(item, 'edite-user')}/>
                <RiDeleteBin2Line className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
              </div>

            </li>
          ))}
        </ul>
      )}

      {section === 'details' && (
        <UserDetails user={user} action={() => handleSection(null, 'home')} />
      )}

      {section === 'create-user' && (
        <CreateUser action={() => handleSection(null, 'home')}/>
      )}

      {section === 'edite-user' && (
        <EditUser user={user} action={() => handleSection(null, 'home')}/>
      )}

    </div>
  )
}

export default UserAdmin