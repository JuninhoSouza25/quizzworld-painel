'use client'
import { useSession } from "next-auth/react"

export default function Admin(){

  const {data: session} = useSession()


  return(
    <>
      <h1>Admin Page</h1>
      <p>Usuário logado: {session?.user.name} </p>
    </>
  )
}