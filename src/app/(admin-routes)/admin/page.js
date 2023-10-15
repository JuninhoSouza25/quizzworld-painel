'use client'
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { LuArrowRight, LuFilePieChart, LuFileBarChart, LuFileStack, LuFileText, LuUsers } from "react-icons/lu";
import UserAdmin from "./components/UserAdmin";

export default function Admin(){

  const {data: session} = useSession()

  const [ component, setComponent ] = useState('Painel Administrativo')



  return(
    <div className="admin-page container-fluid d-flex justify-content-center">

      <div className="aside-menu col-12 col-md-2 bg-white shadow">
        <div className="brand text-center d-flex align-items-center justify-content-center">
          <h1 className="h3 text-primary">Quizzlies</h1>
        </div>
        <nav className="mt-5">
          <ul className="h-100 d-flex flex-column gap-3">
            <li onClick={() => setComponent('Dashboard')}
               className={`${component === "Dashboard" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFilePieChart className="fs-2 mx-4" />Dashboard
              <div className="col text-end">
              {component === "Dashboard" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
            <li onClick={() => setComponent('Temas')}
               className={`${component === "Temas" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileStack className="fs-2 mx-4" />Temas
              <div className="col text-end">
              {component === "Temas" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>

            </li>
            <li onClick={() => setComponent("Níveis")}
              className={`${component === "Níveis" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileBarChart className="fs-2 mx-4" />Níveis
              <div className="col text-end">
              {component === "Níveis" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>

            </li>
            <li onClick={() => setComponent("Perguntas")}
              className={`${component === "Perguntas" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuFileText className="fs-2 mx-4" />Perguntas
              <div className="col text-end">
              {component === "Perguntas" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
            <li onClick={() => setComponent("Usuários")}
              className={`${component === "Usuários" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
              <LuUsers className="fs-2 mx-4" />Usuários
              <div className="col text-end">
              {component === "Usuários" && <LuArrowRight className="fs-2 mx-4"/>}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-section col">
        <Header 
        pageTitle={component}
        userName={session.user.name}
        avatar={session.user.thumbnail}
        userRole={session.user.role}/>

        {component === 'Usuários' && <UserAdmin sectionDefault={"home"} />}

      </div>

      


    </div>
  )
}