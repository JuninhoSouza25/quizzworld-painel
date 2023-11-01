'use client'
import Box from "@/app/components/Box";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'

export default function EditUser({user, action}){

  
  const {register, handleSubmit, formState: { errors }} = useForm()

  const [roles, setRoles] = useState()
  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [updatedUser, setUpdatedUser] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/roles`,)
    .then(response => {
      setRoles(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  function handleUpdateUser(){
    axios.get(`${URL}/user/${user._id}`,)
    .then(response => {
      setUpdatedUser(response.data.user)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function handleUser(data) {
    axios.put(`${URL}/user/${user._id}`, {
      name: data.name ? data.name : user.name,
      username: data.username ? data.username : user.username,
      email: data.email ? data.email : user.email,
      role: data.role ? data.role : user.role,
      thumbnail: imgReturn ? imgReturn : user.thumbnail
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(response => {
      setMsgSuccess(response.data.msg)
      setMsgFail('')
      handleUpdateUser()
  })
  .catch(error => {
    setMsgFail(error.response.data.msg)
    console.error("Erro ao editar usuário:", error);
  });
  }

  function handleUpload(){

  setUploadMsg("Carregando...");
  setProgress(prevState => {
    return {...prevState, started: true}
  })

  const formData = new FormData()
  formData.append('file', imageUpload)
  formData.append('name', imageUpload.name)

  axios.post(`${URL}/images`, formData,{
    onUploadProgress: (progressEvent) => {setProgress(prevState => {
      return { ...prevState, pc: progressEvent.progress*100}
    })}
  },
    {headers: {
      'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
          setImgReturn(response.data.response.src)
          setUploadMsg(response.data.msg)
          setProgress({started: false, pc: 0})
      })
      .catch(error => {
        setUploadMsg(error.response.data.msg)
        console.error("Erro ao enviar imagem:", error)
        setProgress({started: false, pc: 0})
      })
  }
  

  return(

    <Container
    classes="user-details p-5 bg-light"
    children={
      <>
        {updatedUser ? (
          <Box
          classes="p-5 ms-3"
          children={
            <>
              <div className="thumbnail-wrapper">
                <img className="thumbnail" src={updatedUser.thumbnail ? updatedUser.thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs867oiFI9uKZePrJlp5ccrk_PJOu1ABWO8hnIutySxpbwLIHe2VAHDTV6PFb7yua7UbA&usqp=CAU"} alt="thumbnail"/>
              </div>
              <h3 className="mt-5 fw-normal">{updatedUser.name}</h3>
              <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                <span className="col-2 fw-bold">Nome:</span>
                <span className="col">{updatedUser.email}</span>
              </div>
              <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                <span className="col-2 fw-bold">Função:</span>
                <span className="col">{updatedUser.role}</span>
              </div>
              <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                <span className="col-2 fw-bold">Username:</span>
                <span className="col">{updatedUser.username}</span>
              </div>
            </>
          }/>

      ) : (
        <Box
          classes="p-5 ms-3"
          children={
            <>
              <div className="thumbnail-wrapper">
                <img className="thumbnail" src={user.thumbnail ? user.thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs867oiFI9uKZePrJlp5ccrk_PJOu1ABWO8hnIutySxpbwLIHe2VAHDTV6PFb7yua7UbA&usqp=CAU"} alt="thumbnail"/>
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
                <span className="col-2 fw-bold">Username:</span>
                <span className="col">{user.username}</span>
              </div>
            </>
          }/>
      )}

      <Box
      classes="col-xl-5 d-flex flex-column align-items-center justify-content-start"
      children={
        <>
          <div className="col-12 row">
            <h3 className="h3 text-center fw-normal mt-5">Editar usuário</h3>
          </div>

          <form className="col-12 mb-5" onSubmit={handleSubmit(handleUser)}>

            <label className={`mb-0 ms-4 ${errors.name && "text-danger"}`} htmlFor="name">
              Nome
            </label>
            <input 
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            type="text" 
            name="name"
            id="name" 
            placeholder={user.name}
            className={`rounded-pill w-100 bg-white ${errors.name ? "text-danger" : ""} `}/>
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.username && "text-danger"}`} htmlFor="username">
              Username
            </label>
            <input
            {...register('username')}
            type="text" 
            name="username"
            id="username" 
            placeholder={user.username} 
            className={`rounded-pill w-100 bg-white ${errors.username ? "text-danger" : ""} `}/>
            {errors.username && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Username é obrigatório</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.email && "text-danger"}`} htmlFor="email">
              Email
            </label>
            <input 
            {...register('email')}
            type="email" 
            name="email"
            id="email" 
            placeholder={user.email} 
            className={`rounded-pill w-100 bg-white ${errors.email ? "text-danger" : ""} `}/>
            {errors.email && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Email é obrigatório</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.role && "text-danger"}`} htmlFor="roles">
              Selecione a função
            </label>
            <select 
            {...register('role')}
            name="role" 
            id="role"
            className="bg-white w-100 rounded-pill">
                <option className="bg-white w-100" value={''}>---</option>
              {roles && roles.map((item) => (
                <option className="bg-white w-100" key={item._id} value={item.role}>{item.role}</option>
              ))}
            </select>
            {errors.role && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Por favor, selecione uma função!</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}


            <label className={`col-12 mb-0 ms-4 mt-3`}>
                Avatar
              </label>
              <div className="col-12 row rounded-pill bg-white">
                <input
                type="file" 
                name="file"
                onChange={(e) => {setImageUpload(e.target.files[0])}}
                placeholder="Coloque o link da imagem" 
                className={`ps-5 col rounded-pill bg-white`}/>
                <div className="col-1 my-auto me-2 cursor-pointer" onClick={handleUpload}><BiUpload className="icon" /></div>
              </div>

              {progress.started && <progress max="100" value={progress.pc}></progress>}
              {uploadMsg && <span>{uploadMsg}</span>}

              
            <Button type={"submit"} text={"Atualizar usuário"} classes="bg-primary mt-5 mb-3 w-100"/>
            <div className="col-12 row text-center">
              {msgSuccess && <span className="col-12 text-success text-center mt-0 w-100">{msgSuccess}</span>}
              {msgFail && <span className="col-12 text-danger text-center mt-0 w-100">{msgFail}</span>}
            </div>

          </form>
          <span className="col-12 text-danger text-center mt-0 w-100 cursor-pointer" onClick={action} >
            Voltar <RiArrowGoBackFill className="icon-back fs-1 cursor-pointer text-danger"/>
          </span>

        </>
      }/>
      </>
    }/>
  )
}