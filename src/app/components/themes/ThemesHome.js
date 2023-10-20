'use client'

import PopUp from "@/app/components/PopUp"
import axios from "axios"
import { useEffect, useState } from "react"
import {LiaUserEditSolid, LiaUser, LiaUserTimesSolid, LiaUserPlusSolid} from 'react-icons/lia'

import Container from "@/app/components/Container"
import CreateTheme from "./CreateTheme"
import EditTheme from "./EditTheme"

const ThemesHome = ({sectionDefault}) =>{
  const [ allThemes, setAllThemes ] = useState([])
  const [popup, setPopUp] = useState(false)
  const [theme, setTheme] = useState()
  const [section, setSection] = useState(sectionDefault)

  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/themes`,)
    .then(response => {
      setAllThemes(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[])


  // Delete User
  function eraseTheme(id){
    axios.delete(`${URL}/theme/${id}`)
    setAllThemes(allThemes.filter(theme => theme._id !== id))
    setPopUp(false)
  }

  function handlePopUp(data){
    !popup ? setPopUp(true) : setPopUp(false)
    setTheme(data)

  }

  function handleSection(data, section){
    setSection(section)
    setTheme(data)
    setAllThemes(allThemes.filter(theme => theme._id !== "asdf"))
  }
  

  return(
    <Container 
    classes="themes-home"
    children={
      <>

        {popup && <PopUp section={"tema"} user={theme.theme} function1={() => eraseTheme(theme._id)} function2={handlePopUp}/>}



        {section === 'home' && (
          <>
          <div className="row col-12 mb-4 pt-4 pb-2 ps-0 border rounded-pill" style={{height:'60px'}}>
            <LiaUserPlusSolid className="col-1 fs-1 text-success cursor-pointer" onClick={() => handleSection(null, 'create-theme')}/>
          </div>
          <ul>
            <li className="mb-3 row pb-2">
              <div className="col-3 fw-bold">Tema</div>
              <div className="col-7 fw-bold">Descrição</div>
              <div className="col-2 fw-bold">Ações</div>
            </li>
            {allThemes.map((item) => (
              <li className="mb-3 row pb-1" key={item._id}>
                <div className="col-3 fw-light">{item.theme}</div>
                <div className="col-7 fw-light">{item.description}</div>
                <div className="col-2 fw-light row">
                  <LiaUser className="col-2 fs-2 text-success cursor-pointer" onClick={() => handleSection(item, 'details')}/>
                  <LiaUserEditSolid className="col-2 fs-2 cursor-pointer" onClick={() => handleSection(item, 'edit-theme')}/>
                  <LiaUserTimesSolid className="col-2 fs-2 text-danger cursor-pointer" onClick={() => handlePopUp(item)}/>
                </div>

              </li>
            ))}
          </ul>
          </>
        )}

        {section === 'create-theme' && (
          <CreateTheme action={() => handleSection(null, 'home')}/>
        )}

        {section === 'edit-theme' && (
          <EditTheme theme={theme} action={() => handleSection(null, 'home')}/>
        )}

      </>
    }/>

 )
}

export default ThemesHome