'use client'
import Header from "@/app/components/Header";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { LuArrowRight, LuFilePieChart, LuFileStack, LuUsers, LuGamepad2 } from "react-icons/lu";
import UserAdmin from "./components/UserAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import Container from "@/app/components/Container";
import ThemesHome from "@/app/components/themes/ThemesHome";
import QuiziesHome from "@/app/components/quiz/QuiziesHome";

export default function Admin(){

  const {data: session} = useSession()

  const [ component, setComponent ] = useState('Dashboard')



  return(
    <Container 
    classes="admin-page container-fluid d-flex justify-content-center bg-white mx-0 px-0"
    children={
      <>
        <Header 
          pageTitle={component}
          userName={session.user.name}
          avatar={session.user.thumbnail}
          userRole={session.user.role}/>

        <div className="aside-menu col-12 col-md-3 col-xl-2 bg-light">
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
              <li onClick={() => setComponent("Quiz")}
                className={`${component === "Quiz" ? 'active' : ''} d-flex justify-content-start align-items-center`}>
                <LuGamepad2 className="fs-2 mx-4" />Quiz
                <div className="col text-end">
                {component === "Quiz" && <LuArrowRight className="fs-2 mx-4"/>}
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

        <Container 
          classes="main-section col"
          children={
          <>

          {component === 'Dashboard' && <DashboardAdmin sectionDefault={"home"} />}

          {component === 'Temas' && <ThemesHome sectionDefault={"home"} />}

          {component === 'Quiz' && <QuiziesHome sectionDefault={"home"} />}
          
          {component === 'Usuários' && <UserAdmin sectionDefault={"home"} />}
          </>
        }
        />
      
      </>
    }
    />
  )
}