'use client'
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'

export default function CreateUser({action}){

  const {register, handleSubmit, formState: { errors }} = useForm()

  const [roles, setRoles] = useState()
  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
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

  function handleUser(data) {
    axios.post(`${URL}/users`, {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
      role: data.role,
      thumbnail: imgReturn ? imgReturn : null
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(response => {
      setMsgSuccess(response.data.msg)
      setMsgFail('')
  })
  .catch(error => {
    setMsgFail(error.response.data.msg)
    console.error("Erro ao criar usuário:", error);
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
              setImgReturn(response.data.file.firebaseUrl)
              setUploadMsg('')
          })
          .catch(error => {
            setUploadMsg(error.response.data.msg)
            console.error("Erro ao enviar imagem:", error)
          })
  }
  
  

  return(

    <Container
    classes="bg-light"
    children={
      <>
          <div className="col-12 row">
            <h3 className="h3 text-center fw-normal mt-5">Criar novo usuário</h3>
          </div>

          {!msgSuccess ? (
            <form className="col-12 col-lg-6 mx-auto my-5" onSubmit={handleSubmit(handleUser)}>

              <label className={`mb-0 ms-4 ${errors.name?.type === "required" && "text-danger"}`} htmlFor="name">
                Nome
              </label>
              <input 
              {...register('name', {required: true})}
              aria-invalid={errors.name ? 'true' : 'false'}
              type="text" 
              name="name" 
              id="name" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.name?.type === "required" ? "text-danger" : ""} `}/>
              {errors.name?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Nome é obrigatório</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.username?.type === "required" && "text-danger"}`} htmlFor="username">
                Username
              </label>
              <input
              {...register('username', {required: true})}
              type="text" 
              name="username" 
              id="username" 
              placeholder="Ex.: JoaoDasNeves99" 
              className={`rounded-pill w-100 input-bg-white ${errors.username?.type === "required" ? "text-danger" : ""} `}/>
              {errors.username?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Username é obrigatório</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.email?.type === "required" && "text-danger"}`} htmlFor="email">
                Email
              </label>
              <input 
              {...register('email', {required: true})}
              type="email" 
              name="email" 
              id="email" 
              placeholder="Ex.: joaodasneves@starkfamily.com" 
              className={`rounded-pill w-100 input-bg-white ${errors.email?.type === "required" ? "text-danger" : ""} `}/>
              {errors.email?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Email é obrigatório</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.password?.type === "required" && "text-danger"}`} htmlFor="password">
                Senha
              </label>
              <input 
              {...register('password', {required: true})}
              type="password" 
              name="password" 
              id="password" 
              placeholder="XXXXXXXX - mínimo 8 digitos, letras maiúsculas e minúsculas, caracteres especiais" 
              className={`rounded-pill w-100 input-bg-white ${errors.password?.type === "required" ? "text-danger" : ""} `}/>
              {errors.password?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Senha é obrigatória</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.confirmpassword?.type === "required" && "text-danger"}`} htmlFor="confirmpassword">
                Confirme a senha
              </label>
              <input 
              {...register('confirmpassword', {required: true})}
              type="password" 
              name="confirmpassword" 
              id="confirmpassword" 
              placeholder="XXXXXXXX" 
              className={`rounded-pill w-100 input-bg-white ${errors.confirmpassword?.type === "required" ? "text-danger" : ""} `}/>
              {errors.confirmpassword?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Senha é obrigatória</span> )}
              {msgFail && <span className="col-12 text-danger text-center mt-0 w-100 fs-5">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.role?.type === "required" && "text-danger"}`} htmlFor="roles">
                Selecione a função
              </label>
              <select 
              {...register('role', {required: true})}
              name="role" 
              id="role" 
              className="input-bg-white w-100 rounded-pill">
                  <option className="input-bg-white w-100" value={''}>---</option>
                {roles && roles.map((item) => (
                  <option className="input-bg-white w-100" key={item._id} value={item.role}>{item.role}</option>
                ))}
              </select>
              {errors.role?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Por favor, selecione uma função!</span> )}
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
              
              <Button type={"submit"} text={"Criar Usuário"} classes="bg-primary mt-5 mb-3 w-100"/>

          </form>
          ) : (
            <div className="col-12 row text-center">
              {msgSuccess && <span className="col-12 text-danger text-center mt-0 w-100">{msgSuccess}</span>}
              {msgFail && <span className="col-12 text-danger text-center mt-0 w-100">{msgFail}</span>}
            </div>
          )}

          <span className="col-12 text-danger text-center my-3 w-100 cursor-pointer" onClick={action} >
            Voltar <RiArrowGoBackFill className="icon-back fs-1 cursor-pointer text-danger"/>
          </span>
      </>
    }/>
  )
}