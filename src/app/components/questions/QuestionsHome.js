'use client'

import PopUp from "@/app/components/PopUp"
import axios from "axios"
import { useEffect, useState } from "react"

import Container from "@/app/components/Container"

import { LuFileEdit, LuFileMinus2, LuFilePlus2 } from "react-icons/lu"

const QuestionsHome = ({sectionDefault}) =>{
  const [ allQuestions, setAllQuestions ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [question, setQuestion] = useState()
  const [section, setSection] = useState(sectionDefault)

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/questions`,)
    .then(response => {
      setAllQuestions(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[])


  // Delete User
  function eraseQuestion(id){
    axios.delete(`${URL}/question/${id}`)
    setAllQuestions(setQuestion.filter(question => question._id !== id))
    setPopUp(false)
  }

  function handlePopUp(data){
    !popup ? setPopUp(true) : setPopUp(false)
    setQuestion(data)

  }

  function handleSection(data, section){
    setSection(section)
    setQuestion(data)
    setAllQuestions(setQuestion.filter(question => question._id !== "asdf"))
  }

  function handleBack(section){
    setSection(section)
    axios.get(`${URL}/questions`,)
    .then(response => {
      setAllQuestions(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return(
    <Container 
    classes="questions-home"
    children={
      <>

        {popup && <PopUp section={"tema"} user={question.question} function1={() => eraseQuestion(question._id)} function2={handlePopUp}/>}



        {section === 'home' && (
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
                <div className="col-3 fw-light">{item.question  > 40 ? item.question.substring(0,60) + '...' : item.question}</div>
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
        )}

        {/* {section === 'create-questions' && (
          <CreateTheme action={() => handleBack('home')}/>
        )}

        {section === 'edit-question' && (
          <EditTheme theme={theme} action={() => handleBack('home')}/>
        )} */}

      </>
    }/>

 )
}

export default QuestionsHome