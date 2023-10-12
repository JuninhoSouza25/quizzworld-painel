'use client'
import { useSession } from "next-auth/react"
import { LuBarChartBig, LuFilePieChart, LuFileBarChart, LuFileStack, LuFileText, LuUsers } from "react-icons/lu";

export default function Admin(){

  const {data: session} = useSession()


  return(
    <div className="container-fluid h-100 d-flex justify-content-center">

      <div className="aside-menu col-12 col-lg-2 bg-white shadow">
        <div className="branch text-center d-flex align-items-center justify-content-center">
          <h1 className="h3 text-primary">Quizzlies</h1>
        </div>
        <nav>
          <ul className="h-100 d-flex flex-column gap-3">
            <li><LuFilePieChart className="fs-2 mx-4" />Dashboard</li>
            <li><LuFileStack className="fs-2 mx-4" />Temas</li>
            <li><LuFileBarChart className="fs-2 mx-4" />Níveis</li>
            <li><LuFileText className="fs-2 mx-4" />Perguntas</li>
            <li><LuUsers className="fs-2 mx-4" />Usuários</li>
          </ul>
        </nav>
      </div>

      <h1>Admin Page</h1>
      <p>Usuário logado: {session?.user.name} </p>
    </div>
  )
}