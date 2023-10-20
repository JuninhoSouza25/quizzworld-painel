'use client'
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'

export default function CreateTheme({action}){



  const {register, handleSubmit, formState: { errors }} = useForm()

  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()

  const URL = process.env.URL_API


  function handleTheme(data) {
    axios.post(`${URL}/themes`, {
      theme: data.theme,
      description: data.description,
      image: imgReturn
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(response => {
      setMsgSuccess(response.data.msg)
      console.log(response)
      setMsgFail('')
  })
  .catch(error => {
    setMsgFail(error.response.data.msg)
    console.log(error.response)
    console.error("Erro ao criar tema:", error);
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
              console.log(response)
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
    classes="bg-light"
    children={
      <>
          <div className="col-12 row">
            <h3 className="h3 text-center fw-normal mt-5">Criar novo tema</h3>
          </div>

          {!msgSuccess ? (
            <form className="col-12 col-lg-6 mx-auto my-5" onSubmit={handleSubmit(handleTheme)}>

              <label className={`mb-0 ms-4 ${errors.name?.type === "required" && "text-danger"}`} htmlFor="name">
                Tema
              </label>
              <input 
              {...register('theme', {required: true})}
              aria-invalid={errors.theme ? 'true' : 'false'}
              type="text" 
              name="theme" 
              id="theme" 
              placeholder="Séries" 
              className={`rounded-pill w-100 input-bg-white ${errors.theme?.type === "required" ? "text-danger" : ""} `}/>
              {errors.theme?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Tema é obrigatório</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`col-12 mb-0 ms-4 mt-3 ${errors.description?.type === "required" && "text-danger"}`} htmlFor="username">
                Descrição
              </label>
              <input
              {...register('description', {required: true})}
              type="text" 
              name="description" 
              id="description" 
              placeholder="Perguntas sobre séries..." 
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
              
              <Button type={"submit"} text={"Criar tema"} classes="bg-primary mt-5 mb-3 w-100"/>

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