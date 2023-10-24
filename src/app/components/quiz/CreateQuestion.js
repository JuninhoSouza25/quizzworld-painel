'use client'
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiUpload } from 'react-icons/bi'

export default function CreateQuestion({quiz, action}){

  const {register, handleSubmit, formState: { errors }} = useForm()

  const [msgSuccess, setMsgSuccess] = useState()
  const [msgFail, setMsgFail] = useState()
  const [imageUpload, setImageUpload] = useState()
  const [progress, setProgress] = useState({started: false, pc: 0})
  const [uploadMsg, setUploadMsg] = useState(null)
  const [imgReturn, setImgReturn] = useState()
  const [options, setOptions] = useState([])

  const URL = process.env.URL_API

  
  function handleQuestion(data) {
    axios.post(`${URL}/questions`, {
      question: data.question,
      theme: quiz.theme,
      author: quiz.author,
      options: [data.option1, data.option2, data.option3, data.option4, data.option5],
      answer: data.answer,
      level: quiz.level,
      thumbnail: imgReturn ? imgReturn : null,
      countRight: 0,
      countWrong: 0
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
    console.error("Erro ao criar Pergunta:", error);
  });
  }

  function handleOptions(option){
    setOptions(...options, option)
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
            <h3 className="h3 text-center fw-normal mt-5">Criar nova pergunta</h3>
          </div>

          {!msgSuccess ? (
            <form className="col-12 col-lg-6 mx-auto my-5" onSubmit={handleSubmit(handleQuestion)}>

              <label className={`mb-0 ms-4 ${errors.question?.type === "required" && "text-danger"}`} htmlFor="question">
                Pergunta
              </label>
              <input 
              {...register('question', {required: true})}
              aria-invalid={errors.question ? 'true' : 'false'}
              type="text" 
              name="question" 
              id="question" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.question?.type === "required" ? "text-danger" : ""} `}/>
              {errors.question?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Pergunta é obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.option1?.type === "required" && "text-danger"}`} htmlFor="option1">
                Opção 1
              </label>
              <input 
              {...register('option1', {required: true})}
              aria-invalid={errors.option1 ? 'true' : 'false'}
              type="text" 
              name="option1" 
              id="option1" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.option1?.type === "required" ? "text-danger" : ""} `}/>
              {errors.option1?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Opção obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.option2?.type === "required" && "text-danger"}`} htmlFor="option2">
                Opção 2
              </label>
              <input 
              {...register('option2', {required: true})}
              aria-invalid={errors.option1 ? 'true' : 'false'}
              type="text" 
              name="option2" 
              id="option2" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.option2?.type === "required" ? "text-danger" : ""} `}/>
              {errors.option2?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Opção obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.option3?.type === "required" && "text-danger"}`} htmlFor="option3">
                Opção 3
              </label>
              <input 
              {...register('option3', {required: true})}
              aria-invalid={errors.option3 ? 'true' : 'false'}
              type="text" 
              name="option3" 
              id="option3" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.option3?.type === "required" ? "text-danger" : ""} `}/>
              {errors.option3?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Opção obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.option4?.type === "required" && "text-danger"}`} htmlFor="option4">
                Opção 4
              </label>
              <input 
              {...register('option4', {required: true})}
              aria-invalid={errors.option4 ? 'true' : 'false'}
              type="text" 
              name="option4" 
              id="option4" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.option4?.type === "required" ? "text-danger" : ""} `}/>
              {errors.option4?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Opção obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.option5?.type === "required" && "text-danger"}`} htmlFor="option5">
                Opção 5
              </label>
              <input 
              {...register('option5', {required: true})}
              aria-invalid={errors.option5 ? 'true' : 'false'}
              type="text" 
              name="option5" 
              id="option5" 
              placeholder="Ex.: João das Neves" 
              className={`rounded-pill w-100 input-bg-white ${errors.option5?.type === "required" ? "text-danger" : ""} `}/>
              {errors.option5?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Opção obrigatória!</span> )}
              {msgFail && <span className="col-12 text-danger text-center fs-5 mt-0 w-100">{msgFail}</span>}

              <label className={`mb-0 ms-4 ${errors.answer?.type === "required" && "text-danger"}`} htmlFor="answer">
                Digite a resposta certa
              </label>
              <input 
              {...register('answer', {required: true})}
              aria-invalid={errors.answer ? 'true' : 'false'}
              type="text" 
              name="answer" 
              id="answer" 
              placeholder="Copie e cole a opção certa" 
              className={`rounded-pill w-100 input-bg-white ${errors.answer?.type === "required" ? "text-danger" : ""} `}/>
              {errors.answer?.type === "required" && ( <span className="col-12 ms-4 fs-5 text-danger text-center mt-0 w-100">Resposta é obrigatória!</span> )}
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
              
              <Button type={"submit"} text={"Criar pergunta"} classes="bg-primary mt-5 mb-3 w-100"/>

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