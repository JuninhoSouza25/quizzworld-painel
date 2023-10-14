'use client'

import PopUp from "@/app/components/PopUp"
import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid, LiaUser} from 'react-icons/lia'
import {RiDeleteBin2Line, RiArrowGoBackFill} from 'react-icons/ri'

const UserAdmin = () =>{
  const [ allUsers, setAllUsers ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [user, setUser] = useState()
  const [section, setSection] = useState('users')

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

  function handleDetailsSection(data){
    setSection('details')
    setUser(data)
  }

  function handleUsersSection(){
    setSection('users')
  }

  

  return(
    <div className="user-admin col bg-white shadow">

    {popup && <PopUp user={user.username} function1={() => eraseUser(user._id)} function2={handlePopUp}/>}

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
                <LiaUser className="col-2 fs-2 text-success cursor-pointer" onClick={() => handleDetailsSection(item)}/>
                <LiaUserEditSolid className="col-2 fs-2 cursor-pointer"/>
                <RiDeleteBin2Line className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
              </div>

            </li>
          ))}
        </ul>
      )}

      {section === 'details' && (
        <div className="user-details row col-12 p-5">
          <div className="col-6">
            <div className="thumbnail-wrapper">
              <img className="thumbnail" src={user.thumbnail} alt="thumbnail"/>
            </div>
            <h3 className="mt-5 fw-normal">{user.name}</h3>
            <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
              <span className="col-2 fw-bold">Nome:</span>
              <span className="col">{user.email}</span>
            </div>
            <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
              <span className="col-2 fw-bold">Função:</span>
              <span className="col">{user.role}</span>
            </div>
            <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
              <span className="col-2 fw-bold">Aniversário:</span>
              <span className="col">{user.birthday}</span>
            </div>
          </div>
          <div className="user-details-r col d-flex align-items-end justify-content-end">
            <RiArrowGoBackFill className="icon-back fs-1 cursor-pointer text-danger" onClick={() => handleUsersSection()} />
          </div>
        </div>
      )}

    </div>
  )
}

export default UserAdmin