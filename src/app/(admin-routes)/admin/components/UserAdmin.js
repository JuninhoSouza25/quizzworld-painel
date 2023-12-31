'use client'

import PopUp from "@/app/components/PopUp"
import UserDetails from "@/app/components/UserDetails"
import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid, LiaUser, LiaUserTimesSolid, LiaUserPlusSolid} from 'react-icons/lia'
import {RiDeleteBin2Line, RiArrowGoBackFill} from 'react-icons/ri'
import UserHome from "./UserHome"
import CreateUser from "./CreateUser"
import EditUser from "./EditUser"
import Container from "@/app/components/Container"

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

  },[])


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

  function handleBack(section){
    setSection(section)
    axios.get(`${URL}/users`,)
    .then(response => {
      setAllUsers(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return(
    <Container 
    classes="user-admin"
    children={
      <>

        {popup && <PopUp section={"usuário"} user={user.username} function1={() => eraseUser(user._id)} function2={handlePopUp}/>}

        {section === 'home' && (
          <UserHome 
          action1={() => handleSection(null, 'users')}
          action2={() => handleSection(null, 'create-user')}/>
        )}

        {section === 'users' && (
          <>
          <div className="row col-12 mb-4 pt-4 pb-2 ps-0 border rounded-pill" style={{height:'60px'}}>
            <LiaUserPlusSolid className="col-1 fs-1 text-success cursor-pointer" onClick={() => handleSection(null, 'create-user')}/>
          </div>
          <ul>
            <li className="mb-3 row pb-2">
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
                  <LiaUserEditSolid className="col-2 fs-2 cursor-pointer" onClick={() => handleSection(item, 'edit-user')}/>
                  <LiaUserTimesSolid className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
                </div>

              </li>
            ))}
          </ul>
          </>
        )}

        {section === 'details' && (
          <UserDetails user={user} action={() => handleBack('users')} />
        )}

        {section === 'create-user' && (
          <CreateUser action={() => handleBack('users')}/>
        )}

        {section === 'edit-user' && (
          <EditUser user={user} action={() => handleBack('users')}/>
        )}
      </>
    }/>

 )
}

export default UserAdmin