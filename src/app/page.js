'use client'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';

export default function Home() {

  const { data: session } = useSession();
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ erro, setErro ] = useState('')

  const router = useRouter()

  if(session){
    router.replace('/admin')
  }

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

  return (
    <div className='container-fluid d-flex align-items-center bg-light' style={{height:'100vh', overflow:'hidden'}}>

      <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-around">
        <h2 className='mb-3 text-primary fw-bold h3'>Faça o login</h2>
        <form className='col-12 col-md-5 d-flex flex-column gap-2 mb-5'>
          <Input
          name="Email"
          type='email'
          value={email}
          onchange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          classes='mt-5'
          />
          <Input
          name="Password"
          type='password'
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          classes='mb-3'
          />
          <Button
          classes='btn-style-1'
          onclick={handleLogin}
          text="Login"/>
        </form>

        {erro && (
          <span className='text-danger'>Usuário ou senha inesistente</span>
        )}
      </div>
      <div className="col-12 col-md-6 bg-primary" style={{height:'100vh'}}>
        
      </div>
          
    </div>
  )
}
