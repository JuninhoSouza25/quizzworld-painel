'use client'
import { useSession } from "next-auth/react"

export default function Dashboard(){

  const {data: session} = useSession()


  return(
    <>
      <h1>Dashboard Page</h1>
      <p>Usuário logado: {session?.user.name} </p>
    </>
  )
}