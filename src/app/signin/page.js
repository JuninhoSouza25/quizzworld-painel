'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Signin(){
  return(
    <div className='container-fluid text-center'>
      <h1>Login Page</h1>
      <button 
      type='button'
      className='text-white bg-primary'
      onClick={() => signIn("google")}>Login</button>
    </div>
  )
}