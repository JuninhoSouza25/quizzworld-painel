'use client'

import PopUp from "@/app/components/PopUp"
import axios from "axios"
import { useEffect, useState } from "react"

import Container from "@/app/components/Container"

import { LuFileEdit, LuFileMinus2, LuFilePlus2 } from "react-icons/lu"

const QuiziesHome = ({sectionDefault}) =>{
  const [ allQuizies, setAllQuizies ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [quiz, setQuiz] = useState()
  const [section, setSection] = useState(sectionDefault)

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/quizies`,)
    .then(response => {
      setAllQuizies(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[])


  // Delete User
  function eraseQuiz(id){
    axios.delete(`${URL}/quiz/${id}`)
    setAllQuizies(setQuiz.filter(quiz => quiz._id !== id))
    setPopUp(false)
  }

  function handlePopUp(data){
    !popup ? setPopUp(true) : setPopUp(false)
    setQuiz(data)

  }

  function handleSection(data, section){
    setSection(section)
    setQuiz(data)
    setAllQuizies(setQuiz.filter(quiz => quiz._id !== "asdf"))
  }

  function handleBack(section){
    setSection(section)
    axios.get(`${URL}/quizies`,)
    .then(response => {
      setAllQuizies(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  return(
    <Container 
    classes="quiz-home"
    children={
      <>

        {popup && <PopUp section={"quiz"} user={quiz.title} function1={() => eraseQuiz(quiz._id)} function2={handlePopUp}/>}



        {section === 'home' && (
          <>
          <div className="row col-12 mb-4 pt-4 pb-2 ps-0 border rounded-pill" style={{height:'60px'}}>
            <LuFilePlus2 className="col-1 fs-1 text-success cursor-pointer" onClick={() => handleSection(null, 'create-quiz')}/>
          </div>
          <ul>
            <li className="mb-3 row pb-2">
              <div className="col-3 fw-bold">Título</div>
              <div className="col-3 fw-bold">Descrição</div>
              <div className="col-2 fw-bold">Autor</div>
              <div className="col-2 fw-bold">Tema</div>
              <div className="col-2 fw-bold">Ações</div>
            </li>
            {allQuizies.map((item) => (
              <li className="mb-3 row pb-1" key={item._id}>
                <div className="col-4 fw-light">{item.title}</div>
                <div className="col-3 fw-light">{item.description  > 40 ? item.description.substring(0,40) + '...' : item.description}</div>
                <div className="col-3 fw-light">{item.author}</div>
                <div className="col-3 fw-light">{item.theme}</div>
                <div className="col-2 fw-light row">
                  {/* <LiaUser className="col-2 fs-2 text-success cursor-pointer" onClick={() => handleSection(item, 'details')}/> */}
                  <LuFileEdit className="col-2 fs-2 cursor-pointer" onClick={() => handleSection(item, 'edit-quiz')}/>
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

export default QuiziesHome