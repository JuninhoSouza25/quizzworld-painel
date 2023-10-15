'use client'
import CardDashboard from "@/app/components/CardDashboard"
import axios from "axios"
import { useEffect, useState } from "react"
import { LiaUserEditSolid } from "react-icons/lia"
import { LuUsers } from "react-icons/lu"
import { RiAdminLine } from "react-icons/ri"

const DashboardAdmin = ({sectionDefault}) =>{
  const [ allUsers, setAllUsers ] = useState([])
  const [section, setSection] = useState(sectionDefault)
  const URL = process.env.URL_API

  useEffect(() => {
    axios.get(`${URL}/users`,)
    .then(response => {
      setAllUsers(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  },[allUsers])

  function handleSection(data, section){
    setSection(section)
    setUser(data)
    setAllUsers(allUsers.filter(user => user._id !== "asdf"))

  }
  

  return(
    <div className="user-admin col bg-light shadow p-5">

      {section === 'home' && (
        <div className="col-12 d-flex justify-content-around">

          <CardDashboard 
          bg={"bg-light-green"}
          icon={<LuUsers className='icon'/>}
          dataNumber={allUsers.length}
          cardTitle={"Usuários Ativos"}/>

          <CardDashboard 
          bg={"bg-light-blue"}
          icon={<RiAdminLine className='icon'/>}
          dataNumber={5}
          cardTitle={"Admins Ativos"}/>

          <CardDashboard 
          bg={"bg-light-purple"}
          icon={<LiaUserEditSolid className='icon'/>}
          dataNumber={7}
          cardTitle={"Creaters Ativos"}/>
          
        </div>
      )}
     
    </div>
  )
}

export default DashboardAdmin