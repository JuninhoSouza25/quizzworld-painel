'use client'
import React, {useEffect, useState} from "react";
import Container from "../Container";
import axios from "axios";
import Box from "../Box";
import Loading from "../Loading";
import { useForm } from "react-hook-form"
import { BiUpload } from "react-icons/bi";
import Button from "../Button";

export default function EditQuiz({quizId}){
  const URL = process.env.URL_API
  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: async () => fetch(`${URL}/quiz/${quizId._id}`)
  })
  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [currentQuiz, setCurrentQuiz] = useState()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [theme, setTheme] = useState([])
  const [level, setLevel] = useState([])
  const [updatedQuiz, setUpdatedQuiz] = useState()
  

  useEffect(()=>{
    axios.get(`${URL}/quiz/${quizId._id}`)
    .then(response => {
      setCurrentQuiz(response.data)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    })

    axios.get(`${URL}/themes`,)
    .then(response => {
      setTheme(response.data)
    })
    .catch(error => {
      console.log(error)
    })

    axios.get(`${URL}/levels`,)
    .then(response => {
      setLevel(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },[])


  function handleUpdateQuiz(data){
    setLoading(true)
    axios.put(`${URL}/quiz/${currentQuiz._id}`,{
      title: data.title ? data.title : currentQuiz.title,
      description: data.description ? data.description : currentQuiz.description,
      author: data.author ? data.author : currentQuiz.author,
      questions: currentQuiz.questions,
      theme: data.theme ? data.theme : currentQuiz.theme,
      level: level.theme ? level.theme : currentQuiz.level,
      image: imgReturn ? imgReturn : currentQuiz.image
    })
    .then(response => {
      setMsgSuccess(response.data.msg)
      setUpdatedQuiz(response.data.quiz)
      console.log(response)
      setMsgFail('')
      setLoading(false)
    })
    .catch(error => {
      setMsgFail(error.data.msg)
      console.error("Erro ao criar tema:", error);
      setLoading(false)
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
    classes="p-5 bg-light"
    children={
      <>
      <Box 
      children={
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {updatedQuiz ? (
                <>
                  <div className="image-wrapper">
                    <img className="image" src={updatedQuiz.image} alt="image"/>
                  </div>
                  <h3 className="mt-5 fw-normal">{updatedQuiz.title}</h3>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Autor:</span>
                    <span className="col">{updatedQuiz.author}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Tema:</span>
                    <span className="col">{updatedQuiz.theme}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Dificuldade:</span>
                    <span className="col">{updatedQuiz.level}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Descrição:</span>
                    <span className="col">{updatedQuiz.description}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="image-wrapper">
                    <img className="image" src={currentQuiz.image} alt="image"/>
                  </div>
                  <h3 className="mt-5 fw-normal">{currentQuiz.title}</h3>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Autor:</span>
                    <span className="col">{currentQuiz.author}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Tema:</span>
                    <span className="col">{currentQuiz.theme}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Dificuldade:</span>
                    <span className="col">{currentQuiz.level}</span>
                  </div>
                  <div className="row col-12 d-flex align-items-center justify-content-around gap-4">
                    <span className="col-2 fw-bold">Descrição:</span>
                    <span className="col">{currentQuiz.description}</span>
                  </div>
                </>
              )}
            </>
          )}
        </>
      }/>
      <Box
      children={
        <>
          <form className="col-12 col-xl-6 mx-auto my-5" onSubmit={handleSubmit(handleUpdateQuiz)} >
  
            <label className={`mb-0 ms-4`} htmlFor="title">
              Título
            </label>
            <input 
            {...register('title')}
            aria-invalid={errors.title ? 'true' : 'false'}
            type="text" 
            name="title" 
            id="title" 
            placeholder="Escreva o título do Quiz" 
            className={`rounded-pill w-100 input-bg-white `}/>
            {errors.title?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">O título é obrigatório</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.description?.type === "required" && "text-danger"}`} htmlFor="username">
              Descrição
            </label>
            <input
            {...register('description')}
            type="text" 
            name="description" 
            id="description" 
            placeholder="Perguntas sobre séries..." 
            className={`rounded-pill w-100 input-bg-white `}/>
            {errors.description?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Descrição é obrigatória</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.theme?.type === "required" && "text-danger"}`} htmlFor="theme">
              Selecione o tema
            </label>
            <select 
            {...register('theme')}
            name="theme" 
            id="theme" 
            className="input-bg-white w-100 rounded-pill pe-5">
                <option className="input-bg-white w-100" value={''}>---</option>
              {theme && theme.map((item) => (
                <option className="input-bg-white w-100" key={item._id} value={item.theme}>{item.theme}</option>
              ))}
            </select>
            {errors.theme?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Por favor, selecione um tema!</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

            <label className={`col-12 mb-0 ms-4 mt-3 ${errors.level?.type === "required" && "text-danger"}`} htmlFor="level">
              Selecione a dificuldade:
            </label>
            <select 
            {...register('level')}
            name="level" 
            id="level" 
            className="input-bg-white w-100 rounded-pill pe-5">
                <option className="input-bg-white w-100" value={''}>---</option>
              {level && level.map((item) => (
                <option className="input-bg-white w-100" key={item._id} value={item.level}>{item.level}</option>
              ))}
            </select>
            {errors.level?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Por favor, selecione uma dificuldade!</span> )}
            {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}


            <label className={`col-12 mb-0 ms-4 mt-3`}>
              Imagem de capa
            </label>
            <div className="col mx-1 row rounded-pill bg-white">
              <input
              type="file" 
              name="file"
              onChange={(e) => {setImageUpload(e.target.files[0])}}
              placeholder="Coloque o link da imagem" 
              className={`ps-5 col rounded-pill bg-white`}/>
              <div className="col-1 my-auto me-2 cursor-pointer" onClick={handleUpload}><BiUpload className="icon" /></div>
            </div>

            {progress.started && <progress className="col pt-2" max="100" value={progress.pc}></progress>}
            {uploadMsg && <span>{uploadMsg}</span>}
            
            

            <Button type={"submit"} text={"Atualizar Quiz"} classes="bg-primary mt-5 mb-3 w-100"/>
            <div className="col-12 row text-center">
              {msgSuccess && <span className="col-12 text-success text-center mt-0 w-100">{msgSuccess}</span>}
              {msgFail && <span className="col-12 text-danger text-center mt-0 w-100">{msgFail}</span>}
            </div>

          </form>
        </>
      }/>
      </>
    }/>
  )
}