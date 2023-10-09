'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin(){

  const { data: session } = useSession();

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
      setErro(result.error)
      return
    }

    console.log(result)

    router.replace('/admin')

  }

  return(
    <div className='container-fluid text-center'>
     <h2>Faça Login</h2>
          <form>
            <input
            name="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" />
            <input 
            name="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" />
            <button 
            type='button'
            className='text-white bg-primary'
            onClick={handleLogin}>Login</button>
          </form>

          {erro && (
            <span className='text-danger'>{erro}</span>
          )}
          
    </div>
  )
}