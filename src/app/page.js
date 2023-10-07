'use client'
import { signIn, useSession } from "next-auth/react"
export default function Home() {

  const { data: session } = useSession();
  console.log(session)
  return (
    <section className="container d-flex justify-content-center align-items-center h-100">
      <h1>Quizz World</h1>
      {session ?
        <p>Você está logado</p> :
        <>
          <h2>Faça Login</h2>
          <button 
            type='button'
            className='text-white bg-primary'
            onClick={() => signIn("credentials")}>Login</button>
        </>
        }
    </section>
  )
}
