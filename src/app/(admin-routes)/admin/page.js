'use client'
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { LuArrowRight, LuFilePieChart, LuFileBarChart, LuFileStack, LuFileText, LuUsers } from "react-icons/lu";

export default function Admin(){

  const {data: session} = useSession()

  const [ title, setTitle ] = useState('Painel Administrativo')

  const handleDashboard = () => {
    setTitle("Dashboard")
  }

  const handleTemas = () => {
    setTitle("Temas")
  }


  return(
    <div className="container-fluid h-100 d-flex justify-content-center">

      <div className="aside-menu col-12 col-lg-2 bg-white shadow">
        <div className="branch text-center d-flex align-items-center justify-content-center">
          <h1 className="h3 text-primary">Quizzlies</h1>
        </div>
        <nav className="mt-5">
          <ul className="h-100 d-flex flex-column gap-3">
            <li onClick={handleDashboard}
               className={`${title === "Dashboard" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFilePieChart className="fs-2 mx-4" />Dashboard
              <div className="col text-end">
              {title === "Dashboard" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
            <li onClick={handleTemas}
               className={`${title === "Temas" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileStack className="fs-2 mx-4" />Temas
              <div className="col text-end">
              {title === "Temas" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>

            </li>
            <li onClick={() => setTitle("Níveis")}
              className={`${title === "Níveis" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileBarChart className="fs-2 mx-4" />Níveis
              <div className="col text-end">
              {title === "Níveis" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>

            </li>
            <li onClick={() => setTitle("Perguntas")}
              className={`${title === "Perguntas" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileText className="fs-2 mx-4" />Perguntas
              <div className="col text-end">
              {title === "Perguntas" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
            <li onClick={() => setTitle("Usuários")}
              className={`${title === "Usuários" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuUsers className="fs-2 mx-4" />Usuários
              <div className="col text-end">
              {title === "Usuários" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-section col">
      <Header 
      pageTitle={title}
      userName={session.user.name}
      avatar={session.user.thumbnail}
      userRole={session.user.role}/>

      </div>

      


    </div>
  )
}