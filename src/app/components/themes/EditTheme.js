'use client'
import Box from "@/app/components/Box";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'

export default function EditTheme({theme, action}){

  
  const {register, handleSubmit, formState: { errors }} = useForm()

  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [updatedTheme, setUpdatedTheme] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()

  const URL = process.env.URL_API

  function handleUpdateTheme(){
    axios.get(`${URL}/theme/${theme._id}`,)
    .then(response => {
      console.log(response.data)
      setUpdatedTheme(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function handleTheme(data) {
    axios.put(`${URL}/theme/${theme._id}`, {
      theme: data.theme ? data.theme : theme.theme,
      description: data.description ? data.description : theme.description,
      image: imgReturn ? imgReturn : theme.image
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(response => {
      setMsgSuccess(response.data.msg)
      setMsgFail('')
      handleUpdateTheme()
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
          setImgReturn(response.data.file.src)
          setUploadMsg(response.data.msg)
          setProgress({started: false, pc: 0})
      })
      .catch(error => {
        console.log(error.response)
        console.error("Erro ao enviar imagem:", error)
        setProgress({started: false, pc: 0})
      })
  }
  

  return(

    <Container
    classes="user-details p-5 bg-light"
    children={
      <>
        {updatedTheme ? (
          <Box
          classes="p-5 ms-3"
          children={
            <>
              <div className="thumbnail-wrapper">
                <img className="thumbnail" src={updatedTheme.image} alt="thumbnail"/>
              </div>
              <h3 className="mt-5 fw-normal">{updatedTheme.theme}</h3>
              <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                <span className="col-2 fw-bold">Descrição:</span>
                <span className="col">{updatedTheme.description}</span>
              </div>
            </>
          }/>

      ) : (
        <Box
          classes="p-5 ms-3"
          children={
            <>
              <div className="thumbnail-wrapper">
                <img className="thumbnail" src={theme.image} alt="thumbnail"/>
              </div>
              <h3 className="mt-5 fw-normal">{theme.theme}</h3>
              <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                <span className="col-2 fw-bold">Descrição:</span>
                <span className="col">{theme.description}</span>
              </div>
            </>
          }/>
      )}

      <Box
      classes="col-xl-5 d-flex flex-column align-items-center justify-content-start"
      children={
        <>
          <div className="col-12 row">
            <h3 className="h3 text-center fw-normal mt-5">Editar tema</h3>
          </div>

          <form className="col-12 mx-auto my-5" onSubmit={handleSubmit(handleTheme)}>

              <label className={`mb-0 ms-4 ${errors.name?.type === "required" && "text-danger"}`} htmlFor="name">
                Tema
              </label>
              <input 
              {...register('theme')}
              aria-invalid={errors.theme ? 'true' : 'false'}
              type="text" 
              name="theme" 
              id="theme" 
              placeholder={theme.theme} 
              className={`rounded-pill w-100 input-bg-white ${errors.theme?.type === "required" ? "text-danger" : ""} `}/>
              {errors.theme?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Tema é obrigatório</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.description?.type === "required" && "text-danger"}`} htmlFor="username">
                Descrição
              </label>
              <input
              {...register('description')}
              type="text" 
              name="description" 
              id="description" 
              placeholder={theme.description} 
              className={`rounded-pill w-100 input-bg-white ${errors.description?.type === "required" ? "text-danger" : ""} `}/>
              {errors.description?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Descrição é obrigatória</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}


              <label className={`col-12 mb-0 ms-4 mt-3`}>
                Imagem
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
              
              <Button type={"submit"} text={"Atualizar tema"} classes="bg-primary mt-5 mb-3 w-100"/>
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