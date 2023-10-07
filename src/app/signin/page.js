'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin(){

  const { data: session } = useSession();
  console.log(session)

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ erro, setErro ] = useState('')

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials',{
      email,
      password,
      redirect: false
    })

    if(result?.error){
      setErro(true)
      return
    }

    router.replace('/dashboard')

  }

  return(
    <div className='container-fluid text-center'>
     <h2>Faça Login</h2>
          <form>
            <input
            name="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" />
            <input 
            name="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" />
            <button 
            type='button'
            className='text-white bg-primary'
            onClick={handleLogin}>Login</button>
          </form>

          {erro && (
            <span className='text-danger'>Usuário ou senha incorreto</span>
          )}
          
    </div>
  )
}