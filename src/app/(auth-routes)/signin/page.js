'use client'
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import Loading from '@/app/components/Loading';
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin(){

  const { data: session } = useSession();

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ erro, setErro ] = useState('')
  const [ msg, setMsg ] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn('credentials',{
      email,
      password,
      redirect: false
    })

    setLoading(false)

    if(result?.ok){
      setMsg(session.msg)
    }

    if(result?.error){
      setErro(result.error)
      return
    }

    if (session.user.role === 'Admin'){
      router.replace('/admin')
    }

    if (session.user.role === 'Creater'){
      router.replace('/creater')
    }


  }

  return(
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center bg-light' style={{height:'100vh', overflow:'hidden'}}>
      <div className="container mt-5 text-center" style={{height:'230px'}}>
        <h1 className='h2 text-primary'>Quizzlies</h1>
        <p className='lh-sm mb-0'>Teste seus conhecimentos, desafie seus amigos e descubra o quão esperto você realmente é.</p> 
        <p className='lh-sm'>Junte-se a nós agora e embarque em uma jornada de aprendizado e entretenimento, onde a diversão nunca termina!</p>
      </div>
     <div className="col-12 col-md-3 d-flex flex-column align-items-center justify-content-around bg-white p-5 rounded-5 shadow-sm">
        <h2 className='mb-3 h4 text-primary fw-bold'>Faça o login</h2>
        <form className='col-12 d-flex flex-column gap-2 mb-5'>
          <Input
          name="Email"
          type='email'
          value={email}
          onchange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          classes='mt-5 bg-light'
          />
          <Input
          name="Password"
          type='password'
          value={password}
          onchange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          classes='mb-3 bg-light'
          />
          {loading || msg ? (
            <Button
            classes='btn-style-1'
            disable={true}
            onclick={handleLogin}
            text="Login"/>
          ) : (
            <Button
            classes='btn-style-1'
            disable={false}
            onclick={handleLogin}
            text="Login"/>
          )}
          
        </form>
        {loading && <Loading />}
        {msg && (
          <>
            <p>{msg}</p>
            <p>Aguarde um momento, estamos te direcionando...</p>
            <Loading />
          </>
        )}
        {erro && (
          <span className='text-danger'>Usuário ou senha inesistente</span>
        )}
      </div>
    </div>
  )
}