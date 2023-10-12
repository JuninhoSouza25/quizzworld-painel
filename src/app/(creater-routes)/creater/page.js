'use client'
import { useSession } from "next-auth/react"

export default function Creater(){

  const {data: session} = useSession()


  return(
    <>
      <h1>Creater Page</h1>
      <p>Usuário logado: {session?.user.name} </p>
    </>
  )
}