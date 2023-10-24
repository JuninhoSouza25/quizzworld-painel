'use client'
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'
import { useSession } from "next-auth/react";
import { LuArrowRight, LuFileEdit, LuFileMinus2, LuFilePlus2 } from "react-icons/lu";
import CreateQuestion from "./CreateQuestion";

export default function CreateQuiz({action}){
  const {register, handleSubmit, formState: { errors }} = useForm()
  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()
  const [quizReturn, setQuizReturn] = useState()
  const [stage, setStage] = useState(1)
  const [ allQuestions, setAllQuestions ] = useState([])
  const [theme, setTheme] = useState([])
  const [level, setLevel] = useState([])
  const { data: session } = useSession();
  const [popup, setPopUp] = useState(false)
  const [question, setQuestion] = useState()


  const URL = process.env.URL_API

  useEffect(() => {
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

  function eraseQuestion(id){
    axios.delete(`${URL}/question/${id}`)
    setAllQuestions(allQuestions.filter(question => question._id !== id))
    setPopUp(false)
  }

  function handlePopUp(data){
    !popup ? setPopUp(true) : setPopUp(false)
    setQuestion(data)

  }


  function handleQuiz(data) {
    axios.post(`${URL}/quizies`, {
      title: data.title,
      description: data.description,
      author: session.user.name,
      questions: data.questions,
      theme: data.theme,
      level: data.level,
      image: imgReturn
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
  })
    .then(response => {
      setQuizReturn(response.data.response)
      console.log(response)
      setStage(2)
  })
  .catch(error => {
    setMsgFail(error.response.data.msg)
    console.log(error.response)
    console.error("Erro ao criar tema:", error);
  });
  }

  function handleUpdateQuiz(){
    axios.put(`${URL}/quiz/${quizReturn._id}`,{
      title: quizReturn.title,
      description: quizReturn.description,
      author: quizReturn.user.name,
      questions: quizReturn.questions,
      theme: quizReturn.theme,
      level: quizReturn.level,
      image: quizReturn.image
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
            <h3 className="h3 text-center fw-normal mt-5">{`Etapa ${stage}`}</h3>
          </div>

          {!msgSuccess ? (
            <>
              {stage === 1 && (
                <Container 
                children={
                  <form className="col-12 col-xl-6 mx-auto my-5" >
  
                    <label className={`mb-0 ms-4 ${errors.title?.type === "required" && "text-danger"}`} htmlFor="title">
                      Título
                    </label>
                    <input 
                    {...register('title', {required: true})}
                    aria-invalid={errors.title ? 'true' : 'false'}
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Escreva o título do Quiz" 
                    className={`rounded-pill w-100 input-bg-white ${errors.title?.type === "required" ? "text-danger" : ""} `}/>
                    {errors.title?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">O título é obrigatório</span> )}
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
  
                    <label className={`col-12 mb-0 ms-4 mt-3 ${errors.theme?.type === "required" && "text-danger"}`} htmlFor="theme">
                      Selecione o tema
                    </label>
                    <select 
                    {...register('theme', {required: true})}
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
                    {...register('level', {required: true})}
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
  
                    {progress.started && <progress max="100" value={progress.pc}></progress>}
                    {uploadMsg && <span>{uploadMsg}</span>}
                    
                    <div className="col-12 mt-5 text-end cursor-pointer" onClick={handleSubmit(handleQuiz)}>
                      Próxima etapa <LuArrowRight />
                    </div>
  
                    {/* <Button type={"submit"} text={"Adicionar perguntas"} classes="bg-primary mt-5 mb-3 w-100"/> */}
  
                </form>
                }/>
              )}

              {stage === 2 && (
                <>
                    <Container 
                    children={
                        <>
                          <CreateQuestion quiz={quizReturn} action={() => (null)} />
                        </>

                    }/>

                    <Container
                      children={
                        <>
                        <div className="row col-12 mb-4 pt-4 pb-2 ps-0 border rounded-pill" style={{height:'60px'}}>
                          <LuFilePlus2 className="col-1 fs-1 text-success cursor-pointer" onClick={() => handleSection(null, 'create-question')}/>
                        </div>
                        <ul>
                          <li className="mb-3 row pb-2">
                            <div className="col-3 fw-bold">Pergunta</div>
                            <div className="col-3 fw-bold">Autor</div>
                            <div className="col-2 fw-bold">Tema</div>
                            <div className="col-2 fw-bold">Nível</div>
                            <div className="col-2 fw-bold">Ações</div>
                          </li>
                          {allQuestions.map((item) => (
                            <li className="mb-3 row pb-1" key={item._id}>
                              <div className="col-3 fw-light">{item.question  > 40 ? item.question.substring(0,40) + '...' : item.question}</div>
                              <div className="col-4 fw-light">{item.author}</div>
                              <div className="col-3 fw-light">{item.theme}</div>
                              <div className="col-3 fw-light">{item.level}</div>
                              <div className="col-2 fw-light row">
                                {/* <LiaUser className="col-2 fs-2 text-success cursor-pointer" onClick={() => handleSection(item, 'details')}/> */}
                                <LuFileEdit className="col-2 fs-2 cursor-pointer" onClick={() => handleSection(item, 'edit-question')}/>
                                <LuFileMinus2 className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
                              </div>

                            </li>
                          ))}
                        </ul>
                        </>
                      }/>
                
                
                
                </>

              )}



            </>

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